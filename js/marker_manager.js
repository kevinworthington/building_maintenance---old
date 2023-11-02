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
      console.log("disable edit",this)
      //this._activeMode.handler.revertLayers();
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

    this.map.on('draw:editstop', function (e) {
        console.log(e)
           if(!e?.layer){
            return
           }
          var point_obj= {"geometry": {
              "x": e.layer._latlng.lng,
              "y": e.layer._latlng.lat,
              "spatialReference":{"wkid":4326},
               "attributes": {
                  "attributes":e.layer.properties}
                }
            }
            //marker_manager.save_point(url,point_obj,"updates")
           marker_manager.prep_data_change(e.layer,"updates")

    });
   }
   get_marker_types(){
    var marker_types=[]
    var count =0
    for(var m in marker_options){
        console.log(m)
        marker_types.push({
            enabled: true,
            handler: marker_manager.create_drawn_marker(m),
            title: m,
          })
          // create a css class with svg background-image:
          var resource_marker_class='leaflet-draw-draw-'+m
         count++
          $("<style type='text/css'>.leaflet-retina .leaflet-draw-toolbar ."+resource_marker_class+":nth-child("+count+")  {  background-image: url('data:image/svg+xml,"+escape(marker_options[m].svg)+"');} </style>").appendTo("head");
          //$("<style type='text/css'>.leaflet-retina .leaflet-draw-toolbar ."+resource_marker_class+":nth-child(2)  {  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"/></svg>');} </style>").appendTo("head");

           console.log(".leaflet-retina .leaflet-draw-toolbar .leaflet-draw-draw-default:first-child")
           console.log(".leaflet-retina .leaflet-draw-toolbar ."+resource_marker_class+":first-child")

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
        console.log(point,"created point")
        var poly = layer_manager.point_in_polygon(point._latlng,section_id);
        var data_to_save = section_manager.json_data[section_id].data[1]
        var url=$this.get_save_url()
        var left_join_col=data_to_save[2]
        var right_join_col=data_to_save[3]



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
           poly.points.push({geometry:{type: 'Point', coordinates:[point._latlng.lng,point._latlng.lat] },type:"Feature"})
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
//       console.log("Draw",points);
       for(var p=0;p<points.length;p++){
            var feature=points[p]
            var c = points[p].geometry.coordinates
            var geo=L.marker([c[1],c[0]])
            geo.properties=points[p].properties

            geo.addTo(this.drawn_items)
            //we'll usre the OBJECTID to easily associate with the leaflet layer id
            this.item_to_layer_id[points[p].properties.OBJECTID]=this.drawn_items.getLayerId(geo)
            console.log("type",points[p].properties)

            //marker_options
            geo.setIcon(this.get_marker_icon(points[p].properties.point_type));
       }
//        console.log( this.item_to_layer_id)
  }
   //remove points
   remove_points(points){
       for(var p=0;p<points.length;p++){
             this.drawn_items.removeLayer(this.item_to_layer_id[points[p].properties.OBJECTID]);
       }
  }
}