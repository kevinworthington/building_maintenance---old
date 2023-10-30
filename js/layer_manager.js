/**
 * Description. A layer object to control what is shown on the map
 *
 * @file   This files defines the Layer_Manager class.
 * @author Kevin Worthington
 *
 * @param {Object} properties     The properties passed as a json object specifying:


*/

class Layer_Manager {
  constructor(properties) {
    //store all the properties passed
    for (var p in properties){
        this[p]=properties[p]
    }
    // manage the
    // keep track of the layers that are added to the map
    this.layers=[]
    this.image_layers=[]

    if(typeof(this.layers_list)=="undefined"){
        this.layers_list=[]
    }
    //keep reference to the basemap
    this.basemap_layer;

    this.side_by_side= L.control.sideBySide().addTo(this.map);
    this.split_left_layers=[];
    this.split_right_layers=[];

    //  only show the table for specific types
    this.table_types=["esriSFS","esriSMS","esriPMS","esriSLS","vector","GeoJSON","mapserver","feature layer"]
    //
    var $this=this
    // make the map layers sortable
    // make the map layers sortable
    $("#sortable_layers").sortable({
        start: function(event, ui) {
             $(ui.item).addClass('highlight');
        },
        stop: function(event, ui) {
            $this.update_layer_order();
        },
        update: function(event, ui) {
           $('#sortable_layers li').removeClass('highlight');
        },
        out: function(event, ui) {
           $('#sortable_layers li').removeClass('highlight');
        }
    });
    // when the map_panel resizes update the map_panel_scroll_content
    $('#sortable_layers').bind('resize', function(){
       $("#map_panel_scroll_content").height($("#map_panel").height())
    });
    $("#map_panel_scroll").scroll( function(e) {
         $("#map_panel").offset({top:-$(this).scrollTop()+$("#map_panel_wrapper").offset().top})
    });
    $("#map_panel_wrapper").bind("mousewheel",function(ev, delta) {
        var scrollTop = $("#map_panel_scroll").scrollTop();
       $("#map_panel_scroll").scrollTop(scrollTop-Math.round(delta));
    });

  }
  update_layer_order(){
    //based on the sortable

    //note that the layer order is reversed
    var ext ="_drag"
    var children =  $("#sortable_layers").children('.drag_li').get().reverse()
    var layers = []
    for (var i =0; i<children.length;i++){
        var id = $(children[i]).attr('id')
        if(typeof(id)!="undefined"){
            var _id = id.substring(0,id.length-ext.length);
            console.log("update_layer_order",_id)
            this.map.getPane(_id).style.zIndex = i+100;
            layers.push(this.get_layer_obj(_id))
        }

    }
    // update the layer order and url
    this.layers=layers;
    this.set_layers_list()

  }
  toggle_layer(_resource_id,type,drawing_info,url,z,item_ids){

    console_log("toggle_layer",_resource_id)
    var $this=layer_manager;

//    if(!disclaimer_manager.check_status(_resource_id,z,$this.toggle_layer)){
//         console_log("Accept disclaimer first")
//         return
//    }
    // either add or hide a layer
    var resource = section_manager.get_match(_resource_id)
    // todo we need to be able to know whether an item is visible or not

    if($this.is_on_map(_resource_id) && !item_ids){
        console.log("all ready on the map...REMOVe")

      $this.remove_feature_layer(_resource_id);
//        $("#"+_resource_id+"_drag").remove();
//        $this.remove_legend(_resource_id);
//        filter_manager.update_parent_toggle_buttons(".content_right");
//
//        analytics_manager.track_event("side_bar","remove_layer","layer_id",_resource_id)
        return
    }

     $this.add_layer(_resource_id,type,drawing_info,url,z,item_ids)
     if(type!="csv_geojson"){
        $this.add_to_map_tab(_resource_id,z);
     }

  }
//  drawing_info_include(data,resource){
//    if(data?.drawingInfo){
//       resource.drawing_info = data.drawingInfo
//        layer_manager.toggle_layer(resource.id)
//    }
//
//  }
// set_usable_links(resource){
//    //find the link in the array of links
//    resource.usable_links=[]
//    for (var l in filter_manager["viz_col"]){
//        //check if it's an acceptable format
//        if(resource[filter_manager["viz_col"][l]]!=""){
//            var link = resource[filter_manager["viz_col"][l]]
//            for (var s in services){
//                 // look through the second slot of each type
//                 if(typeof(link) !="undefined" && services[s]?.pattern){
//                     for (var p in services[s].pattern){
//
//                        if(link.indexOf(services[s].pattern[p])>-1){
//                             resource.usable_links.push([link,services[s]])
//                        }
//                     }
//              }
//            }
//
//
//
//        }
//    }
//  }
    add_to_map_tab(_resource_id,_z){
        var $this = this;
        // use this.layers[] for reference since filter_manager can change with filter response.
        var layer = this.get_layer_obj(_resource_id)
        console.log(layer)
        if (!layer){
            console_log("No layer to show")
            return
        }
        var resource = layer.resource_obj
        console.log("resource",resource)
        var o = layer.layer_obj.options
        var id = resource["id"]

        var title = resource[filter_manager["title_col"]]
        var title_limit=25
        if(title.length>title_limit){
            title = title.substring(0,title_limit)+"..."
        }
        var download_link = false//filter_manager.get_download_link(resource)
        var dcat_bbox = resource.dcat_bbox
        var add_func = "toggle_layer"
        var add_txt=LANG.RESULT.REMOVE
        var html = "<li class='ui-state-default drag_li' id='"+id+"_drag'>"
        html+="<div class='grip'><i class='fas fa-grip-vertical'></i></div>"
        html +="<div class='item_title font-weight-bold'>"+title+"</span></div>"

         html += this.get_slider_html(id)
        //
//        html +="<button type='button' id='"+id+"_toggle' class='btn btn-primary "+id+"_toggle' onclick='layer_manager."+add_func+"(\""+id+"\")'>"+add_txt+"</button>"
//        //
//        html +="<button type='button' class='btn btn-primary' onclick='filter_manager.zoom_layer(\""+resource[filter_manager['bounds_col']]+"\")'>"+LANG.RESULT.ZOOM+"</button>"
//        if(download_link){
//              html +=download_link;
//         }
//        html +="<button type='button' class='btn btn-primary' onclick='layer_manager.show_details(\""+id+"\")'>"+LANG.RESULT.DETAILS+"</button>"
//
//        console_log("the type is ",layer.type)
//        if ($.inArray(layer.type,$this.table_types)>-1){
//            html +="<button type='button' class='btn btn-primary' onclick='layer_manager.show_table_data(\""+id+"\")'><i class='bi bi-table'></i></button>"
//        }

        if (typeof(o.color)!="undefined"){
          html += "<div class='color_box'><input type='text' id='"+id+"_line_color' value='"+o.color+"'/><br/><label for='"+id+"_line_color' >"+LANG.MAP.OUTLINE_COLOR+"</label></div>"
        }
        if (typeof(o.fillColor)!="undefined"){
         html += "<div class='color_box'><input type='text' id='"+id+"_fill_color' value='"+o.fillColor+"'/><br/><label for='"+id+"_fill_color' >"+LANG.MAP.Fill_COLOR+"</label></div>"
        }
        if ($.inArray(layer.type,["esriPMS","esriSMS"])==-1){
            html+=this.get_slit_cell_control(_resource_id)
        }

        html +='</li>'

        // add item to the beginning
        $("#sortable_layers").prepend(html)
        $("#sortable_layers" ).trigger("resize");


        // add interactivity
        this.make_color_palette(id+'_line_color',"color")
        this.make_color_palette(id+'_fill_color',"fillColor")

        this.make_slider(id+'_slider',100)

  }
  show_details(_resource_id){
   filter_manager.select_item(_resource_id)

    analytics_manager.track_event("side_bar","show_details","layer_id",_resource_id)
  }
  get_slit_cell_control(_id){
    return '<table class="split_table"><tr><td class="split_left split_cell" onclick="layer_manager.split_map(this,\''+_id+'\',\'left\')"></td><td class="split_middle"></td><td class="split_right split_cell" onclick="layer_manager.split_map(this,\''+_id+'\',\'right\')"></td></tr></table>'
  }
  split_map(elm,_resource_id, side){
    // only allow one left and one right layer - for now!
    // need to check if _resource_id is currently in use
    if(side=="right" && this.split_left_layers[0]==_resource_id){
        // reset right
        $("#"+_resource_id+"_drag .split_left").removeClass("split_cell_active")
        this.split_left_layers=[]
        this.side_by_side.setLeftLayers([])
    }
    if(side=="left" && this.split_right_layers[0]==_resource_id){
        // reset left
        $("#"+_resource_id+"_drag .split_right").removeClass("split_cell_active")
        this.split_right_layers=[]
        this.side_by_side.setRightLayers([])
    }
    var layer_obj =  this.get_layer_obj(_resource_id).layer_obj
    console.log("split with",layer_obj)
    if (side=="right"){

        if (this.split_right_layers.length>0){
            // remove button active state
            $("#"+this.split_right_layers[0]+"_drag .split_right").removeClass("split_cell_active")
            // reset the clipped area of the right layer
            try{
               this.side_by_side._rightLayer.getContainer().style.clip = ''
            }catch(e){
                this.side_by_side._rightLayer.getPane().style.clip = ''
            }

            this.side_by_side.setRightLayers([])

            if(this.split_right_layers[0]==_resource_id){
              // deselect if current already exists on right
               this.split_right_layers=[]
               this.toggle_split_control()
               return
            }
        }
        this.split_right_layers=[_resource_id]
        this.side_by_side.setRightLayers([ layer_obj])
    }else{

        if (this.split_left_layers.length>0){
            $("#"+this.split_left_layers[0]+"_drag .split_left").removeClass("split_cell_active")
            // reset the clipped area of the right layer
           try{
               this.side_by_side._leftLayer.getContainer().style.clip = ''
            }catch(e){
                this.side_by_side._leftLayer.getPane().style.clip = ''
            }
            this.side_by_side.setLeftLayers([])

            if(this.split_left_layers[0]==_resource_id){
               // deselect if current already exists on left
               this.split_left_layers=[]
               this.toggle_split_control()
               return
            }
        }
        this.split_left_layers=[_resource_id]
        this.side_by_side.setLeftLayers([ layer_obj])
    }
    $(elm).addClass("split_cell_active");
    //and show/hide the control
    this.toggle_split_control()

    analytics_manager.track_event("map_tab","split_view","layer_id",_resource_id)
  }
  toggle_split_control(){
    if (this.split_right_layers.length>0 || this.split_left_layers.length>0 ){
        $(".leaflet-sbs").show();
    }else{
        $(".leaflet-sbs").hide();
    }
  }

  make_color_palette(elm_id,_attr){
    var $this = this;
     $("#"+elm_id).drawrpalette()
        $("#"+elm_id).on("choose.drawrpalette",function(event,hexcolor){
            // make exception for basemap
            if (!_attr){
                $(".leaflet-container").css("background",hexcolor)
                return
            }
            var ext ="_line_color";// just needed for character count
            var id = $(this).attr('id')
            var _id = id.substring(0,id.length-ext.length)
            var layer =  $this.get_layer_obj(_id)
            var temp_obj = {}
            temp_obj[_attr]=hexcolor
            layer.layer_obj.setStyle(temp_obj)

            //make exception for markers
            if($.inArray(layer.type,["esriPMS","esriSMS"])>-1){
                //update existing and new markers
                if(_attr=="fillColor"){
                    $("._marker_class"+_id).css({"background-color":hexcolor})
                    $("<style type='text/css'> ._marker_class"+_id+"{ background-color:"+hexcolor+";} </style>").appendTo("head");
                }else{
                    $("._marker_class"+_id).css({"border-color":hexcolor})
                     $("<style type='text/css'> ._marker_class"+_id+"{border-color:"+hexcolor+";} </style>").appendTo("head");
                }

            }
            analytics_manager.track_event("map_tab","change_"+_attr,"layer_id",_id)

        })
        // make sure the panel shows-up on top
        $("#"+elm_id).next().next().css({"z-index": 10001});

  }


  get_slider_html(elm_id){
    return "<div class='slider_box'> <label class='lil' for='"+elm_id+"_slider' >"+LANG.MAP.TRANSPARENCY+"</label><div id='"+elm_id+"_slider'></div></div>"
  }
  make_slider(elm_id,value){
    var $this = this
    $("#"+elm_id).slider({
            min: 0,
            max: 100,
            value:value,
            range: "min",
            change: function( event, ui ) {
                 var ext ="_slider"
                 var id = $(this).attr('id')
                 var _id= id.substring(0,id.length-ext.length)


                 var layer =  $this.get_layer_obj(_id)
                 var val =ui.value/100
                 var set_opacity=["basemap","Map Service","Raster Layer","tms","","mapserver","mapservice"]
                 if($.inArray( layer.type,set_opacity)>-1){
                    layer.layer_obj.setOpacity(val)
                 }else if($.inArray(layer.type,["esriPMS","esriSMS"])>-1){
                       $("._marker_class"+_id).css({"opacity":val})
                 }else if($.inArray(layer.type,["GeoJSON"])>-1){
                    layer.layer_obj.eachLayer(function (layer) {
                        layer.setStyle({
                            opacity: val,
                            fillOpacity: val
                          })
                    });

                 }else{
                    layer.layer_obj.setStyle({
                    opacity: val,
                    fillOpacity: val
                  })

                 }
                 analytics_manager.track_event("map_tab","transparency_slider","layer_id",_id,3)
              }

         })
  }

  get_layer_obj(_resource_id){
      for(var i =0;i<this.layers.length;i++){
            var temp_layer = this.layers[i]
            if (temp_layer.id==_resource_id){
                return temp_layer

            }
      }
      // if no layer was returned - maybe we are controls
     if(_resource_id =="basemap"){
        return {"layer_obj":this.basemap_layer,"type":"basemap"}

     }
        return false
  }
  is_on_map(_resource_id){
    var layer = this.get_layer_obj(_resource_id)
    if (layer){
        return true;
    }else{
        return false;
    }
  }
    get_service_method(r){
        for (var i=0;i<this.service_method.length;i++){
               if (r==this.service_method[i].ref){
                    return this.service_method[i]
               }
        }
    }

  add_layer(_resource_id,_type,_drawing_info,url,_z,item_ids){

    console_log("Adding",_resource_id,url,_z,_drawing_info,_type)
    var $this=this
    var update_url=false
    // create layer at pane

    var resource = section_manager.get_match(_resource_id)
    console_log("The url is",url)

    var layer_options = this.get_layer_options(_resource_id,url,_drawing_info)

    //create a pane for the resource
    console_log(_resource_id,"_resource_id")
    var pane = this.map.createPane(_resource_id);
    // set the z if not already
    if(typeof(_z)=="undefined"){
          _z= this.layers.length
          update_url=true
    }
    console_log("created pane",this.map.getPane(_resource_id).style)
    this.map.getPane(_resource_id).style.zIndex = _z+100;

    var service_method = this.get_service_method(_type)

    //todo attempt overcoming cors
//     layer_options.url='http://localhost:8000/sr/'+encodeURIComponent(layer_options.url)
     //check for a legend
    if(service_method._method=="tiledMapLayer" || service_method._method=="dynamicMapLayer" ){

        // todo test tms
        layer_options.tms = false
        // if the last character is a 0
        if (layer_options.url.substring(layer_options.url.length-1) =='0'){
            layer_options.url=layer_options.url.substring(0,layer_options.url.length-1)
        }
        // might need a forward slash
        if (layer_options.url.substring(layer_options.url.length-1) !='/'){
            layer_options.url+="/"
        }
        //filter_manager.load_json(layer_options.url+'legend?f=json',layer_manager.create_legend,_resource_id)
    }
    console_log(service_method,"service_method")
     console_log(layer_options.url)
    console_log(layer_options,"layer_options")

    if (service_method._class=="distortableImageOverlay"){
        // get the corners from the solr field
        var corners = filter_manager.get_poly_array(resource["locn_geometry"])
        var cs=[]
        if (corners){
            for(var i =0;i<4;i++){
                var c = corners[i].split(" ")
                // not values come in as lng lat
                cs.push(L.latLng(c[1],c[0]))
            }
            //shift the last value into the second position to conform with distortableImageOverlay
            cs.splice(1, 0, cs.splice(3, 1)[0]);

             // zoom in first for images as they are often quite small
             filter_manager.zoom_layer(resource.dcat_bbox)


            var layer_obj =  L[service_method._class](url,{
                    actions:[L.LockAction],mode:"lock",editable:false,
                    corners: cs,
                   }).addTo(this.map);

        }else{
            //we have no coordinates, just show the image in a separate leaflet
             this.show_image_viewer_layer(L[service_method._class](url,{ actions:[L.LockAction],mode:"lock",editable:false}))
              map_manager.image_map.attributionControl._attributions = {};
              map_manager.image_map.attributionControl.addAttribution(this.get_attribution(resource));
             return
        }


    }else if(service_method._method=="iiif"){
        this.show_image_viewer_layer(L[service_method._class][service_method._method](url))
         map_manager.image_map.attributionControl._attributions = {};
         map_manager.image_map.attributionControl.addAttribution(this.get_attribution(resource));
        return
    }else if(service_method._method=="" || service_method._method==null){
        //todo - get this from the service
        layer_options.maxZoom= 21
        console_log(service_method,service_method._class,service_method._method)
        var layer_obj =  L[service_method._class](layer_options.url,layer_options).addTo(this.map);

    }else if(service_method?._method && service_method._method.indexOf(".")>-1){
        var method_parts=service_method._method.split(".")
        var layer_obj =  L[service_method._class][method_parts[0]][method_parts[1]](layer_options.url,layer_options).addTo(this.map);


    }else{
      if (service_method._method=="ajax"){

            var layer_obj = L.layerGroup();
            this.load_ajax(url,layer_obj,_resource_id)

      }else if (service_method._method=="csv"){
           var layer_obj = L.layerGroup();
           this.load_tabular_data(url,layer_obj,_resource_id);

      }else if (service_method._method=="csv_geojson"){
             // check if we have a layer obj already
          var layer_obj=$this.get_layer_obj(_resource_id);
         if(layer_obj){
              //notice layer_ob.layer_obj
             this.show_csv_geojson_data(layer_obj.layer_obj,_resource_id,item_ids);
             return
          }else{
             // only create this layer if it doesn't yet exist
              layer_obj = L.featureGroup();
              layer_obj.item_to_layer_id=[];//store an id associating the item with the layer id
              layer_obj.layer_options=layer_options
              this.show_csv_geojson_data(layer_obj,_resource_id,item_ids);
          }

      }else{
        console.log("Passed in",layer_options)/*filter_manager.get_bounds(resource.locn_geometry),*/ // pass in the bounds
       var layer_obj =  L[service_method._class][service_method._method](layer_options).addTo(this.map);
        console.log(layer_obj)
      }

    }

    try{
       //layer_obj.setBounds(filter_manager.get_bounds(resource.locn_geometry))
        console_log("Success",resource)
    }catch(e){
        console_log(e)
    }

    try{
        layer_obj.on('click', function (e) {
            $this.layer_click(e,_resource_id);

        });
    }catch(e){
        console_log(e)
    }

    //todo keep reference, update button on load
    // store the resource_obj as a copy for future use
    var type=_type;
     if (_drawing_info){
        if(_drawing_info.renderer?.symbol){
            type=_drawing_info.renderer.symbol.type
        }else{
            console_log("We don't know what this is!!!")
            console_log(_drawing_info)
        }

     }

     var layer = { type:type,"id":_resource_id,"url":url,"layer_obj":layer_obj,"resource_obj":Object.assign({}, resource)}


     if(typeof(_z)=="undefined"){
          this.layers.push(layer);
     }else{
        this.layers.splice(_z, 0, layer);
     }
      // update a slim list for sharing only if no programmatically setting a z-index
     if (update_url){
           this.set_layers_list()
     }
     // for ease of access store a layer_id
     layer_obj.layer_id=_resource_id
     $("."+_resource_id+"_toggle").addClass("progress-bar-striped active progress-bar-animated")
     // update the parent record to show loaded
     //todo only required if we have a parent

     if (typeof(resource.parent)!="undefined"){
          filter_manager.update_parent_but(resource.parent)
     }

     layer_obj.on('load', function (e) {

        console.log("LOAD complete.............######",this)
        console.log(this.layer_id,$this.get_layer_obj(this.layer_id))
        $this.layer_load_complete(this);

        //$this.show_bounds($this.get_layer_obj(this.layer_id).layer_obj.getBounds())

    });

    this.layer_list_change();
  }
  load_tabular_data(url,layer_obj,_resource_id){
   var $this = this;
     $.ajax({
            type: "GET",
            url: url,
            dataType: "text",
            success: function(data) {

                layer_obj.data =  $.csv.toObjects(data.replaceAll('\t', ''))


                console.log(layer_obj)

                $this.layer_load_complete({layer_id:_resource_id})
                layer_manager.show_table_data(_resource_id)
            }
         });

  }
  load_ajax(url,layer_obj,_resource_id){
    var $this = this

    $this.create_style_class(_resource_id)
    console_log("AJAX",url)
    $.ajax({
            dataType: "json",
            url: url,
            success: function(data) {

                 console_log("AJAX","Loaded")
                 var markers = L.markerClusterGroup();
                 var unique_id=0;
                L["geoJSON"](data,{

                    onEachFeature: function(feature, layer){
                         markers.addLayer($this.create_geo_feature(feature,_resource_id,layer_obj, layer,url,unique_id++));

                    }
                })
                layer_obj.addLayer(markers)
                layer_obj.data = data
                layer_obj.addTo($this.map);
                //
                console_log(layer_obj)

                $this.show_bounds(markers.getBounds())

                $this.layer_load_complete({layer_id:_resource_id})
            }
        }).error(function(e) {
             console_log("Error",e)
//             var prefix="/sr/"
//             if(url.indexOf(prefix)==-1){
//                $this.load_ajax(prefix+url,layer_obj,_resource_id)
//
//             }else{
//                // show load error
//             }
        });
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
  create_geo_feature(feature,_resource_id,layer_obj, layer,url,unique_id){
    var $this = this

    var style = {}

    if(layer_obj.layer_options){
        style=layer_obj.layer_options
    }

    if(feature.properties?.color){
        style.fillColor= feature.properties.color
        style.color= feature.properties.color
         style.opacity= 0
    }

    feature.id= feature.features[0].id
    var geo =L.geoJSON(feature, {pane: _resource_id, style: style,
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: map_manager.get_marker_icon(resource_marker_class)
              });
        },
    })

     //temp add service options
     layer_obj.service= {options:{url:url}}
     geo.on('click', function(e) { $this.layer_click(e,_resource_id) });
     return geo
  }
  show_bounds(b){
    map_manager.show_copy_link(b.getWest(),b.getSouth(),b.getEast(),b.getNorth())
  }
  get_attribution(resource){
    return "<a href='javascript:void(0);' onclick=\"filter_manager.show_details('"+resource["id"]+"')\" >"+resource["dct_title_s"]+"</a>"
  }
  layer_click(e,_resource_id){
        map_manager.layer_clicked=true
        map_manager.selected_layer_id=_resource_id

        map_manager.click_lat_lng = e.latlng
        map_manager.click_x_y=e.containerPoint

        map_manager.popup_show();
         console_log(e)
        try{
              map_manager.selected_feature_id=layer_manager.get_object_id(e.layer.feature);
              map_manager.show_popup_details([e.layer.feature])
        }catch(error){
            // could be an artificial click
             console_log(e)
        }
         //map_manager.layer_clicked=false
  }
    get_object_id(_feature){
        // as the objectid might not be consistent between layers, we'll to no consistently determine what it is
        if(!_feature?.id ){
            if( _feature?.properties && _feature.properties?.id){
                 return  _feature.properties.id
            }else{
                return  _feature.properties._id
            }
        }
        return _feature["id"]
  }
  layer_load_complete(elm){

    console.log("layer_load_complete",elm.layer_id,  $("."+elm.layer_id+"_toggle"))
    $("."+elm.layer_id+"_toggle").removeClass("progress-bar-striped progress-bar-animated")
    $("."+elm.layer_id+"_toggle").text(LANG.RESULT.REMOVE)
    // update the maps ta
    this.update_layer_count();
    console_log("Add download link")
    //download_manager.add_downloadable_layers()
  }


  show_image_viewer_layer(_layer){
        var  $this = this
        $("#image_map").width("75%")
        $("#image_map").show();
        map_manager.update_map_size()

        // remove existing layers
        for (var i in $this.image_layers){
            map_manager.image_map.removeLayer($this.image_layers[i]);
        }

         $(".leaflet-spinner").show();
         setTimeout(function(){
             _layer.addTo(map_manager.image_map);
             _layer.on("load",function() {  $(".leaflet-spinner").hide(); });
            $this.image_layers.push(_layer)
         },500);

  }
  get_layer_options(_resource_id,url,_drawing_info){

      var layer_options ={
        url: url,
        pane:_resource_id,
        // to enable cursor and click events on raster images
        interactive:true,
        bubblingMouseEvents: false,
        maxZoom: 20,
        useCors:false
      }
      var type;
      var symbol;
      var renderer_type
      if (_drawing_info){
          if(_drawing_info.renderer?.symbol){
             symbol = _drawing_info.renderer.symbol
             type = symbol.type
             renderer_type = _drawing_info.renderer.type
          }else{
            if(_drawing_info.renderer?.uniqueValueInfos){
                symbol = _drawing_info.renderer.uniqueValueInfos[0].symbol
                type = symbol.type
                renderer_type ="simple"
            }

          }
          if (_drawing_info && symbol){
            if(renderer_type=="simple"){
              if(symbol.outline || (type == "esriSLS" && symbol.color)){
                var color_arr;
                if (type == "esriSLS"){
                  color_arr= symbol.color
                }else{
                  color_arr= symbol.outline.color
                }

                 layer_options.color = rgbToHex(color_arr[0], color_arr[1], color_arr[2])
                 layer_options.opacity = Number(color_arr[3])/255
                 if (symbol.outline){
                    layer_options.weight = Number(symbol.outline.width)
                 }

                 if(layer_options.opacity==0){
                    layer_options.stroke=false
                 }
             }

             // in the case of polygons the renderer.symbol.color refers to fill
             if(symbol.color && type != "esriSLS"){
                     var color_arr=symbol.color
                     layer_options.fillColor = rgbToHex(color_arr[0], color_arr[1], color_arr[2])
                     layer_options.fillOpacity = Number(color_arr[3])/255

                     if( layer_options.fillOpacity==0){
                        layer_options.fill=false
                     }
                }
                // we are dealing with markers
                var resource_marker_class = "_marker_class"+_resource_id
                if(typeof(layer_options.color)=="undefined"){
                    layer_options.color="#ffffff"
                }
                 if(typeof(layer_options.fillColor)=="undefined"){
                    layer_options.fillColor="#0290ce"
                }

                $("<style type='text/css'> ."+resource_marker_class+"{ border: "+layer_options.weight+"px solid "+layer_options.color+"; background-color:"+layer_options.fillColor+";} </style>").appendTo("head");

                layer_options.pointToLayer = function (geojson, latlng) {
                  return L.marker(latlng, {
                    icon: map_manager.get_marker_icon(resource_marker_class)
                  });
                }

             }

          }
       }
       return layer_options
  }


  remove_feature_layer(_layer_id){
    var layer = this.get_layer_obj(_layer_id)
    $("."+_layer_id+"_toggle").removeClass("active")
    $("."+_layer_id+"_toggle").text(LANG.RESULT.ADD) // revert to Add button text
    this.map.removeLayer(layer.layer_obj);
    for(var i =0;i<this.layers.length;i++){

            if (this.layers[i].id==_layer_id){
               this.layers.splice(i,1)
               break

            }
      }
    this.update_layer_count();
    this.set_layers_list();
    this.layer_list_change();
    // check if the split control needs updating
    if (this.split_right_layers[0]==_layer_id){
        this.split_right_layers=[]
    }
    if (this.split_left_layers[0]==_layer_id){
        this.split_left_layers=[]
    }
    this.toggle_split_control();
  }
   get_selected_layer_count(_resource_id){
        var count = 0
        for(var i =0;i<this.layers.length;i++){
            if (this.layers[i].resource_obj?.path){
                var path = this.layers[i].resource_obj.path
                var parent=path.substring(0, path.indexOf(".layer"));
                if (parent==_resource_id){
                   count++
                }
            }
        }
        return count;
   }
   update_layer_count(){
    //add the the layer count to the maps tab
    $("#map_tab .value").text( this.layers.length+1)

   }


  show_table_data(_layer_id){
    //todo check if we already have a table object
    table_manager.get_layer_data(_layer_id)
    analytics_manager.track_event("map_tab","show_table","layer_id",_layer_id)

  }
  show_csv_geojson_data(layer_obj,_resource_id,item_ids){
    var $this=this
    if(!$this.map.hasLayer(layer_obj)){
        // only add the layer once
        layer_obj.addTo($this.map);
    }
  // the following creates a csv file which includes geojson features
  // only rows with features can be mapped
  // each item added should only be done so once and an array will track the visible items
  // the showing/hiding of items can happen in several ways
  // showing
  // 1. selecting the checkbox for the entire section will show all the features
  // 2. Selecting a group checkbox will show all the features in the group.
  // 3. selecting an individual item (with/checkbox) will show individual item
  // hiding
  // Unchecking any checkbox will take all the ids associated with it and remove them from the map

    var items_showing=section_manager.json_data[_resource_id.replaceAll('section_id_', '')].items_showing
    $this.create_style_class(_resource_id)
    var data = section_manager.get_match(_resource_id)
    //     var markers = L.markerClusterGroup();

     for (var i=0;i<item_ids.length;i++){
        var item_id=item_ids[i]
        var index =$.inArray( item_id, items_showing)
        if (index==-1){
            if(data[item_id]?.feature){


                try{

                 var geo = $this.create_geo_feature(data[item_id].feature,_resource_id,layer_obj, false, false)

                 layer_obj.addLayer(geo
                 .bindTooltip(data[item_id].feature.features[0].properties[Object.keys(data[item_id].feature.features[0].properties)[0]]));

                  // rather than force an id - lets associate the item_id, with the internal leaflet id
                 layer_obj.item_to_layer_id[item_id]=layer_obj.getLayerId(geo)

                 items_showing.push(item_id)
                 if(data[item_id]?.points){
                    marker_manager.draw_points(data[item_id].points)
                 }

                 }catch(error){
                      console.log(error,"Error trying to create",data[item_id].feature)//JSON.stringify(
                 }
             }

        }else{
            try{
                // it's possible a shape Path errors-out when trying to remove, just try to remove it
                layer_obj.removeLayer(layer_obj.item_to_layer_id[item_id]);// note: we need to use the internal id number
            }catch(error){

            }

            items_showing.splice(index,1)
        }

     }

    //layer_obj.addLayer(markers)
    //map_manager.map_zoom_event(layer_obj.getBounds())
//    if(items_showing.length>0){
//        $this.map.fitBounds(layer_obj.getBounds());
//    }
    // associate data for access during map click selection
    layer_obj.data = data

  }
     point_in_polygon(p,section_id){
        //param p for leaflet point
        //return polygon
        var item
        var pt = turf.point([ p.lng,p.lat]);
        //loop over all the polygons on the map

        var items = section_manager.json_data[section_id].items_showing
        for(var i =0; i<items.length;i++){


           var poly = turf.polygon(section_manager.json_data[section_id].all_data[items[i]].feature.features[0].geometry.coordinates)
           var hit = turf.booleanPointInPolygon(pt, poly);

           if(hit){
                item=section_manager.json_data[section_id].all_data[items[i]]

                break
           }
        }
        return item
    }
    //
    get_layer_select_html(_layer_id,_change_event,is_table,omit_selected){
        console.log("todo get_layer_select_html")
        return
        var html=""
        if(_change_event){
            html+="<span>"+LANG.IDENTIFY.IDENTIFY_SELECT_LAYER+"</span>"
        }
        html+="<select "
        if(_change_event){
            html+="onchange='"+_change_event+"(this)'"
        }
        html+=">"

        for(var i =0;i<this.layers.length;i++){
            var skip =false

            var selected =""
            if (this.layers[i].id==_layer_id){
                selected = "selected"
                if (omit_selected){
                    skip=true
                }
            }
            var title = this.layers[i].resource_obj[filter_manager["title_col"]];
            title = title.clip_text(30)
            if ($.inArray(this.layers[i].type,this.table_types)>-1 || !is_table){
                // omit the selected value if flag set
                if(!skip){
                    html += "<option "+selected+" value='"+this.layers[i].id+"'>"+title+"</option>"
                }

            }
        }
        html+="<select>"

        return html
    }


    add_basemap_control(){

        var $this = this
        var html = "<li class=''>"
         html += this.get_base_map_dropdown_html()
         html+= this.get_slider_html("basemap");
         var id = "basemap"
         var fill_color =  rgbStrToHex($(".leaflet-container").css("backgroundColor"))
         //html += "<div class='color_box'><input type='text' id='"+id+"_base_color' value='"+fill_color+"'/><br/><label for='"+id+"_base_color' >"+LANG.BASEMAP.BACKGROUND+"</label></div>"


         $("#basemap_layer").html(html)
         html += "</li>"
         this.make_slider("basemap_slider",100)
         this.make_color_palette(id+'_base_color')

          this.map.createPane("basemap");
          this.map.getPane("basemap").style.zIndex = 1;



         $('#basemap_layer_dropdown li').on('click', function () {
            if($this.basemap_layer){
                $this.map.removeLayer($this.basemap_layer);
            }
            var val = $(this).attr('value');
            $this.basemap_layer= L.tileLayer(LANG.BASEMAP.BASEMAP_OPTIONS[val].url, {
                maxZoom: 20,
                attribution: LANG.BASEMAP.BASEMAP_OPTIONS[val].attribution,
                pane:"basemap"
            }).addTo($this.map);
           // update the icon
           $("#basemap_layer_img").attr("src", LANG.BASEMAP.BASEMAP_OPTIONS[val].image)
        });
        //todo - allow setting via url params
        // add default layer
        $('#basemap_layer_dropdown li:first-child').trigger("click")
    }
    get_base_map_dropdown_html(){

        var basemaps=LANG.BASEMAP.BASEMAP_OPTIONS
        // get all the basemaps and show the images in a dropdown
        var first_item = basemaps[Object.keys(basemaps)[0]];
        var html= "<div class='item_title font-weight-bold'>"+LANG.BASEMAP.TITLE+"</div> "
        html+= '<div class="btn-group dropup"><button id="basemap_layer_but" style="float:left;max-height:none;" class="btn btn-primary dropdown-toggle " type="button" data-toggle="dropdown" title="'+LANG.BASEMAP.TIP+'" data-bs-toggle="dropdown" aria-expanded="false">'
        html+='<img id="basemap_layer_img" class="thumbnail_small" src="'+first_item.image+'"/>'
        html+='</button>'
        html+= '<ul id="basemap_layer_dropdown" class="dropdown-menu" style="max-height:250px;overflow:scroll;" aria-labelledby="basemap_layer_but">'
        for(var b in basemaps){

            html+= '<li value="'+b+'"><div><a class="dropdown-item"><img alt="'+basemaps[b].title+'" class="thumbnail" src="'+basemaps[b].image+'"/></a><span>'+basemaps[b].title+'</span></div></li>'
        }
        html+='</ul></div>'
        return html

    }
    convert_text_to_json(text){
        //solr stores the json structure of nested elements as a smi usable string
        // convert the string to json for use!
        // returns a usable json object
        var reg = new RegExp(/(\w+)=([^\s|\[|,|\{|\}]+)/, 'gi');// get words between { and =
        text=text.replace(reg,'"$1"="$2"')

        // find all the {att: instances
        text=text.replace(/({)([^"|{]*)(=)/g,'{"$2"=')

        // and wrap the last attributes that equal something - adding back '='
        text=text.replace(/\s([^=|"|,]*)=/g,'"$1"=')

        // replace any empty strings =,
         text=text.replaceAll(/=,/g,'="",')
         // and empty slots
          text=text.replaceAll(/, ,/g,',')

        // lastly replace the '=' with ':'
        text=text.replaceAll('=',':')

        try {
            return JSON.parse(text)
        } catch(e) {
           console_log("error",e)
           console_log(text)
        }


    }
    set_layers_list(){
       // returns an object with the layer_id and any extra settings for each
       //todo - also keep track of the basemap
        this.layers_list=[]
        for(var i =0;i<this.layers.length;i++){
           var obj = this.layers[i]
           this.layers_list.push({
               id:obj["id"],
               });
           }
        save_params()
    }
    layer_list_change(){
        //update the table manager dropdown
        table_manager.show_layer_select()
        map_manager.show_layer_select()

    }
    create_legend(data,_resource_id){
        var html = '<div id="legend_'+_resource_id+'">'
        if(data?.['layers']){
            for (var i=0;i<data['layers'].length;i++){
                var l = data['layers'][i]
                var layer_name=l.layerName
                layer_name = layer_name.clip_text(15)
                html += '<span class="legend_title">'+layer_name+'</span>'

                for (var j=0;j<l['legend'].length;j++){

                    var label =  l['legend'][j].label
                     var id =  l['legend'][j].url
                   html+='<label>'
                   html+='<img alt="'+label+'" src="data:image/png;base64,'+l['legend'][j].imageData+'" border="0" width="20" height="20" class="legend_symbol">'
                   html+='<span class="legend_label">'+label+'</span></label><br/>'

                }
            }
        }
       html += "</div>"
       $("#legend").append(html)
       $('.legend').show()
    }
    remove_legend(_resource_id){
        $("#legend_"+_resource_id).remove()
        console_log($('#legend').children().length)
        if ( $('#legend').children().length > 0 ) {
            $('.legend').show()
        }else{
            $('.legend').hide()
        }

    }
}

