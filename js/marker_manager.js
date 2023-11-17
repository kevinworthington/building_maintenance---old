/**
 * Description. A marker map layer that allows creating, editing, and viewing of markers
 *
 * @file   This files defines the Marker_Manager class.
 * @author Kevin Worthington
 *
 * @param {Object} properties     The properties passed as a json object specifying:


 */


class Marker_Manager {
  constructor(properties) {
    //store all the properties passed
    for (var p in properties){
        this[p]=properties[p]
    }


   }
   init(){
     var $this= this;
    this.add_draw_control()
//    //draw control ref: https://github.com/Leaflet/Leaflet.draw , https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
     this.drawn_items = new L.FeatureGroup();
     this.map.addLayer(this.drawn_items);
     //
     var drawPluginOptions ={
         edit: {
             featureGroup: $this.drawn_items,
             // change edit tool tip https://stackoverflow.com/questions/48661724/leaflet-draw-edit-control-custom-text
             // todo fix this
             handlers: {
              edit: {
                tooltip: {
                  text: 'Drag markers to new locations',
                  subtext: ''
                }
              },
              }
         },
         draw: {
             marker: false,
             polygon: false,
             polyline:false,
             rectangle:false,
             circle:false,
             circlemarker:false,
         },

     }

     L.DrawToolbar.include({
          getModeHandlers: function (map) {
            return marker_manager.get_marker_types();
          }
        });
     var drawControl = new L.Control.Draw(drawPluginOptions);
     // capture cancel https://stackoverflow.com/questions/45839502/identify-when-leaflet-draw-cancel-button-is-clicked
    drawControl._toolbars.edit.disable =  function () {
      if (!this.enabled()) {
        /* If you need to do something right as the
           edit tool is enabled, do it here right
           before the return */
        return;
      }
      console.log("disable edit fired both on cancel delete and move ",this.getActions())
      this._activeMode.handler.revertLayers();
      /* If you need to do something when the
         cancel button is pressed and the edits
         are reverted, do it here. */
      L.Toolbar.prototype.disable.call(this);

    };
     //
     this.item_to_layer_id=[]
     this.map.addControl(drawControl);

     //see all events here https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
     this.map.on('draw:created', function (e) {
        console.log("drawn",e)
        //inject type
        e.layer.type=e.layerType
       marker_manager.prep_data_change(e.layer,"adds")
     });
     this.map.on('draw:deleted', function (e) {
        var deleted_ids=[]
         var points = e.layers._layers
         for(var p in points){

            deleted_ids.push(points[p].properties.OBJECTID)
         }
        // to do make this more dynamic

        $this.save_point( $this.get_save_url(),deleted_ids,"deletes")
    });

    this.map.on('draw:edited', function (e) {
        console.log(e)
           if(!e?.layers){
            return
           }
           var points = e.layers._layers
            for(var p in points){
                 marker_manager.prep_data_change(points[p],"updates")
            }
    });
   }
   get_marker_types(){
    var marker_types=[]
    var count =0
    for(var m in marker_options){
        marker_types.push({
            enabled: true,
            handler: marker_manager.create_drawn_marker(m),
            title: m,
          })
          // create a css class with svg background-image:
          var resource_marker_class='leaflet-draw-draw-'+m
         count++
         $("<style type='text/css'>.leaflet-retina .leaflet-draw-toolbar ."+resource_marker_class+":nth-child("+count+")  {  background-size: contain;background-image: url('data:image/svg+xml,"+escape(marker_options[m].svg)+"');} </style>").appendTo("head");
    }


    return marker_types

   }
   create_drawn_marker(id) {
      var marker = new L.Draw.Marker(this.map, {icon: marker_manager.get_marker_icon(id)});
      marker.properties={type: id}
      marker.type = id;
      return marker ;
    }
    get_marker_icon(id){
        var marker_option=marker_options[id]
        if(typeof(marker_option)== 'undefined'){
            marker_option=marker_options["default"]
        }
     return   L.divIcon({
                html: marker_option.svg,
                className: '',
                 iconSize: [16, 16],
                 iconAnchor: [8, 16],
                 type:id
            })
    }
   get_save_url(){
        var section_id = 0
        var data_to_save = section_manager.json_data[section_id].data[1]
        return data_to_save[0].substring(0,data_to_save[0].lastIndexOf("query?"))+"applyEdits"

   }
   prep_data_change(point,change_type){
        var $this =  this
         // to do make this more dynamic
        var section_id = 0
         // remove any associate with a the former polygon
         if(point?.properties){
            layer_manager.remove_point_in_polygon(point.properties.OBJECTID,section_id)
        }
        // find polygon
        var poly = layer_manager.point_in_polygon(point._latlng,section_id);
        var data_to_save = section_manager.json_data[section_id].data[1]
        var url=$this.get_save_url()
        var left_join_col=data_to_save[2]
        var right_join_col=data_to_save[3]


        // create an object for saving
         var point_obj={
            "geometry": {
              "x": point._latlng.lng,
              "y" :point._latlng.lat,
              "spatialReference":{"wkid":4326}
            },
            "attributes": {
              "point_type":point.type,
            }
          }
          if(poly){
            // allow the polygon to store points
             if(!poly?.points){
                poly.points=[]
             }
            //associate the point with the polygon
            // use the leaflet id for for reference
            var leaflet_id=this.drawn_items.getLayerId(point)
           poly.points.push({geometry:{type: 'Point', coordinates:[point._latlng.lng,point._latlng.lat] },type:"Feature",properties:{OBJECTID:leaflet_id}});

           this.item_to_layer_id[leaflet_id]=leaflet_id
           //transfer the location into the point
            point_obj.attributes[right_join_col]=poly.properties[left_join_col]
         }


         if(change_type=="updates"){
            point_obj.attributes=point.properties
         }else{
         // add the point to the map
           $this.drawn_items.addLayer(point);
         }

        // (save to db, add to map etc)
        $this.save_point(url,[point_obj],change_type)


   }
   //updates - [{"attributes":{"OBJECTID":6,"point_type":"light","location_id":null,"GlobalID":"b4d3651b-9d95-44ba-81e1-bc7d35a48834","CreationDate":1698269739213,"Creator":"kaworth_CSUrams","EditDate":1698269739213,"Editor":"kaworth_CSUrams"}}]
  save_point(url,point_obj,change_type){
        console.log("SVAE the",point_obj)
        // SEE ALSO https://developers.arcgis.com/rest/services-reference/enterprise/apply-edits-feature-service-.htm
       var changes= point_obj

        var data ={f:"json",token:token}
        data[change_type]=JSON.stringify(changes)

        $.ajax({
          type: "POST",
          url:  url,
          data: data,
          success: function(_data) {

                console.log(_data)
            }
        });
    }

   add_draw_control(){
   // make the draw control fancy
    L.Control.draw_toggle = L.Control.extend({
        onAdd: function(map) {
          this._container = L.DomUtil.create('div', 'leaflet-bar');
          this._container.classList.add('leaflet-draw-but');
          L.DomEvent.disableClickPropagation(this._container);
          L.DomEvent.on(this._container, 'click', function(){

            if($(".leaflet-draw-toolbar").is(":visible")){
             $(".leaflet-draw-toolbar").hide()
               $(".leaflet-draw-but").removeClass("leaflet-draw-but-active leaflet-draw-clicked")

            }else{
              $(".leaflet-draw-toolbar").show()
              $(".leaflet-draw-but").addClass("leaflet-draw-but-active leaflet-draw-clicked")
            }

          }, this);
          this._choice = false;
          this._defaultCursor = this._map._container.style.cursor;

          return  this._container;
        }
    });

    L.control.draw_toggle = function(opts) {
        return new L.Control.draw_toggle(opts);
    }

    L.control.draw_toggle({ position: 'topleft' }).addTo(this.map);


  }
  create_style_class(_resource_id){
    // custom points
    var layer_options ={}
    layer_options.color="#ffffff";
    layer_options.fillColor="#0290ce";
    layer_options.weight=1;
    var resource_marker_class = "_marker_class"+_resource_id

    $("<style type='text/css'> ."+resource_marker_class+"{ border: "+layer_options.weight+"px solid "+layer_options.color+"; background-color:"+layer_options.fillColor+";} </style>").appendTo("head");

  }
  draw_points(points){
      var $this=this
    //       console.log("Draw",points);
       for(var p=0;p<points.length;p++){
            var feature=points[p]
            var c = points[p].geometry.coordinates
            var geo=L.marker([c[1],c[0]])
            geo.properties=points[p].properties

            geo.addTo(this.drawn_items)
            //we'll usre the OBJECTID to easily associate with the leaflet layer id
            this.item_to_layer_id[points[p].properties.OBJECTID]=this.drawn_items.getLayerId(geo)
            console_log("type",points[p].properties)

            //marker_options
            geo.setIcon(this.get_marker_icon(points[p].properties.point_type));
            geo.on('click', function(e) { layer_manager.layer_click(e,1) });

       }
//        console.log( this.item_to_layer_id)
  }

   //remove points
   remove_points(points){
       for(var p=0;p<points.length;p++){
             this.drawn_items.removeLayer(this.item_to_layer_id[points[p].properties.OBJECTID]);
       }
  }
  save_details(){
    //get all te values from the form
    //create a json structure to save to the item
    var ext ="_input"
    var point_obj={}
    var reserved_prop=["GlobalID","CreationDate","Creator"]
    $("#props_table input").each(function(){
        var id=$(this).attr('id')

        var _id = id.substring(0,id.length-ext.length);
        if($.inArray(_id,reserved_prop)==-1){
            var val=$(this).val()
            if($.isNumeric(val)){
                val =Number(val)
            }
            point_obj[_id]=val
        }


    });
    var url=this.get_save_url()
    this.save_point(url,[{"attributes":point_obj}],"updates")
  }
}