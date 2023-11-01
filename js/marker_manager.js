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
     var drawControl = new L.Control.Draw({
         edit: {
             featureGroup: $this.drawn_items
         },
         draw: {

             marker: {icon:L.divIcon({
                            html: marker_options["default"].svg,
                            className: ''
                        })},
             polygon: false,
             polyline:false,
             rectangle:false,
             circle:false,
             circlemarker:false,
         },
     });
     this.item_to_layer_id=[]
     this.map.addControl(drawControl);

     //see all events here https://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
     this.map.on('draw:created', function (e) {
        console.log("drawn",e)

       marker_manager.prep_data_change(e.layer,"adds")
     });
     this.map.on('draw:deleted', function (e) {
        var deleted_ids=[]
         var points = e.layers._layers
         for(var p in points){

            deleted_ids.push(points[p].properties.OBJECTID)
         }
        // to do make this more dynamic
        var section_id = 0
        var data_to_save = section_manager.json_data[section_id].data[1]
        var url=data_to_save[0].substring(0,data_to_save[0].lastIndexOf("query?"))+"applyEdits"
        $this.save_point(url,deleted_ids,"deletes")
    });

    this.map.on('draw:editmove', function (e) {

        console.log(e.layer._latlng,"edited")
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
   prep_data_change(point,change_type){
        var $this =  this
         // to do make this more dynamic
        var section_id = 0
        console.log(point,"point")
        var poly = layer_manager.point_in_polygon(point._latlng,section_id);
        var data_to_save = section_manager.json_data[section_id].data[1]
        var url=data_to_save[0].substring(0,data_to_save[0].lastIndexOf("query?"))+"applyEdits"
        var left_join_col=data_to_save[2]
        var right_join_col=data_to_save[3]
        // we need to know
        //what property from the polygon to associate with the point
        // what property in the point to store it in
        if(!poly?.points){
            poly.points=[]
         }
         poly.points.push({geometry:{type: 'Point', coordinates:[point._latlng.lng,point._latlng.lat] },type:"Feature"})
         var point_obj={
            "geometry": {
              "x": point._latlng.lng,
              "y" :point._latlng.lat,
              "spatialReference":{"wkid":4326}
            },
            "attributes": {
              "point_type":null,
            }
          }
         point_obj.attributes[right_join_col]=poly.properties[left_join_col]
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
        console.log(url,point_obj)
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
            console.log("type",points[p].properties.type)
            var marker_option=marker_options[points[p].properties.type]
            if(typeof(marker_option)== 'undefined'){
                marker_option=marker_options["default"]
            }
            //marker_options
            geo.setIcon(L.divIcon({
                            html: marker_option.svg,
                            className: ''
                        }));
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