import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import isInside from 'point-in-polygon';
import { parse } from 'qs';


let markersArray = [];
let bounds;
let drawingManager;
let center;
let maps;
let resizablePolygon;
let area;
let latitude;
let longitude;
let locationAddress = "Djurgårdsvägen 50, 115 21 Stockholm";
let coordinates = [];

const deleteStyle = {
  marginTop: "-88px",
  position: "absolute",
  textAlign: "center",
  left: "40%"
}
const nextStyle = {
  marginTop: "-88px",
  position: "absolute",
  textAlign: "left",

}

class Map extends React.Component {
  constructor(props) {
    super(props);
    latitude = this.props.mapConfig.lat;
    longitude = this.props.mapConfig.lng;

    var address="Djurgårdsvägen 50, 115 21 Stockholm";

    if(this.props.roofaddress!="")
    {
      locationAddress=this.props.roofaddress
    }
    this.state = {
      drawMode: true,
      loaded: false,
      place: address,
      position: null,
      lat: latitude,
      lng: longitude,
      locaddress: '',
      color: {
        backgroundColor: "#0A539C"
      }

    };



  }

  componentDidMount() {
    const main = this;

    var locationname = parse(location.search.substr(1))
    if (locationname.location != undefined) {
      locationAddress = locationname.location;
    }


    fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJ7I4HvFK1CZcRloBVLjnO8_JElgTRZ1o&address=${locationAddress}`)
      .then(function (response) {
        return response;
      })
      .then(function (response) {
        return response.json();


      }).then(function (data) {

        if (data.results[0].geometry.location.lat != '' && data.results[0].geometry.location.lng) {

          latitude = data.results[0].geometry.location.lat,
            longitude = data.results[0].geometry.location.lng


          main.setState({
            lat: latitude,
            lng: longitude,
            place: locationAddress
          }
          )

          main.loadMap();
          main.drawPolyline();
        }


      })

  }

  componentDidUpdate(prevProps, prevState) {


    if (prevProps.google !== this.props.google) {
      this.loadMap();
      if (this.props.drawMode) {
        this.drawPolyline();
      }
      if (this.props.insertMarker) {
        this.insertMarker();
      }
      /*if (this.props.heatMap) {
        this.heatMap();
      }*/
    }
    /* if (prevProps.markers.length!==this.props.markers.length &&this.markers!=prevProps.markers && this.state.loaded&&!this.props.heatMap){
       this.getMarkers();
     }*/


  }

  area(resizablePolygon) {


    area = google.maps.geometry.spherical.computeArea(resizablePolygon);
    console.log("area" + area);
  }

  componentWillReceiveProps(nextProps) {
    const google = this.props.google;
    if (drawingManager && nextProps.drawMode != this.props.drawMode) {
      drawingManager.setDrawingMode(null);
    }
    if (this.props.drawMode !== nextProps.drawMode && nextProps.drawMode && this.props.google) {
      this.drawPolyline();
    }

  }

  /*
  
    heatMap(){
  
      const {google} = this.props;
      const maps = google.maps;
      const points=this.props.markers.map((point) => (
          new google.maps.LatLng(point.latLng.lat,point.latLng.lng)
      ));
  
      let heatmap = new maps.visualization.HeatmapLayer({
        data:points ,
        map: this.map
      });
    }
  */

  insertMarker() {
    const { google } = this.props;
    const maps = google.maps;

    google.maps.event.addListener(this.map, 'click', function (e) {
      const markerProps = ({
        position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
        map: this.map,
        draggable: true
      })
      const marker = new maps.Marker(markerProps);

      this.props.handleReturnedMarkers({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      marker.addListener('dragend', (e) => {
        this.props.handleReturnedMarkers({ lat: e.latLng.lat(), lng: e.latLng.lng() });

      });

    }.bind(this));




  }

  drawPolyline() {
    const google = this.props.google;

    /*drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      polygonOptions: this.props.polygonOptions
    });*/

    drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      mapTypeControl: false,
      drawingControlOptions: {
        drawingModes: [google.maps.drawing.OverlayType.POLYGON],
        position: google.maps.ControlPosition.LEFT_TOP
      },
      markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1
      },
      polygonOptions: this.props.polygonOptions
    });

    drawingManager.setMap(this.map);
    //======================================================
    // Event listeners after Polygon closed
    //======================================================
    google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polyline) {
      drawingManager.setDrawingMode(null);
      resizablePolygon = polyline.getPath();
      this.area(resizablePolygon);
      let color_data = this.state.color;
      document.getElementById('buttonnew').style.backgroundColor = "#000";




      // Delete Polygon on click
      //======================================================

      /*
            google.maps.event.addListener(polyline, 'click', (e) => {
              polyline.setMap(null);
              resizablePolygon = [];
              // this.getMarkers();
              this.drawPolyline();
            });
      */

      google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', function (e) {

        polyline.setMap(null);
        resizablePolygon = [];
        drawingManager.setDrawingMode(true);
        let color_data = color_data;
        document.getElementById('buttonnew').style.backgroundColor = "#0A539C";
        /*   color_data.backgroundColor="#58beec";
     this.setState({
       color:color_data
     })*/


        //this.delete();


      });


      //======================================================
      // Filtering function
      //======================================================
      /*const filterMarkers = () => {
        let polygon = [];
        let insideMarkers = [];

        resizablePolygon.forEach(coord => {
          polygon.push([coord.lat(), coord.lng()]);
        })
        markersArray.forEach(marker => {
          const x = marker.getPosition().lat();
          const y = marker.getPosition().lng();
          if (!isInside([x, y], polygon)) {
            marker.setMap(null)
          } else {
            insideMarkers.push(marker);
            if (!marker.map) {
              marker.setMap(this.map)
            }
          }
        })
        if (this.props.handleReturnedMarkers) {
          this.props.handleReturnedMarkers(insideMarkers);
        }
      }
      filterMarkers();*/
      //======================================================
      // Resize polygon
      //======================================================
      google.maps.event.addListener(resizablePolygon, 'set_at', function (edge) {
        resizablePolygon = polyline.getPath();
        var area = google.maps.geometry.spherical.computeArea(resizablePolygon);
        console.log("area : " + area);
        // filterMarkers();
      });

      google.maps.event.addListener(drawingManager, 'drawingmode_changed', function (e) {
        polyline.setMap(null);
        resizablePolygon = [];
        var area = google.maps.geometry.spherical.computeArea(resizablePolygon);
        console.log("area : " + area);
      });
      google.maps.event.addListener(resizablePolygon, 'insert_at', function (edge) {
        resizablePolygon = polyline.getPath();
        var area = google.maps.geometry.spherical.computeArea(resizablePolygon);
        console.log("area : " + area);
        // filterMarkers();
      });
    }.bind(this))
  }


  //======================================================
  // DISPLAY MARKERS IN MAP
  //======================================================
  /*getMarkers(){
    console.log('getMarkers');
    const {google} = this.props;
    const maps = google.maps;
    markersArray.forEach(marker=>{
      marker.setMap(null);
    })
    markersArray=[];

    this.props.markers.forEach((flag)=>{
      const markerProps=({
        ...flag,
        position: new google.maps.LatLng(flag.latLng.lat,flag.latLng.lng),
        map: this.map
      })


      const marker = new maps.Marker(markerProps);

      if (this.props.onMarkerClick) {
        google.maps.event.addListener(marker,'click',(event)=>{
          this.props.onMarkerClick(marker);
        });
      }
      //======================================================
      // Render info window if we have an info property
      //======================================================
      if (marker.info) {
        const infowindow = new google.maps.InfoWindow({
          content: marker.info
        });
        google.maps.event.addListener(marker,'click',(event)=>{
          infowindow.open(this.map, marker);
        })
      }
      markersArray.push(marker);
      if (this.props.handleReturnedMarkers) {
        this.props.handleReturnedMarkers(markersArray);
      }
    })
  }
*/


  loadMap() {
    try {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const { mapConfig } = this.props;
      let { zoom } = mapConfig;
      let { lat } = mapConfig;
      let { lng } = mapConfig;
      const center = new maps.LatLng(this.state.lat, this.state.lng);
      const mapConfiguration = Object.assign({}, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        styles: [
          {
            "featureType": "poi",
            "stylers": [
              { "visibility": "off" }
            ]
          }
        ],



        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        streetViewControl: false,
        drawingControlOptions: { drawingModes: [google.maps.drawing.OverlayType.POLYGON] },
        mapTypeId: google.maps.MapTypeId.SATELLITE,



      })
      this.map = new maps.Map(node, mapConfiguration);
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        /*if (!this.props.heatMap) {
         // this.getMarkers();
        }*/
      });
      this.setState({
        loaded: true
      });

    } catch (e) {
      console.log('error in load');
    }

  }



  autocmp() {

    let geocoder = new google.maps.Geocoder();


    const aref = this.refs.autocomplete;


    const node = ReactDOM.findDOMNode(aref);

    var autocomplete = new google.maps.places.Autocomplete(node);


    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }



      this.setState({
        place: place.formatted_address,
        position: place.geometry.location
      })
      this.setState({
        lat: this.state.position.lat(),
        lng: this.state.position.lng()
      })
      this.props.mapConfig.lat = this.state.position.lat()
      this.props.mapConfig.lng = this.state.position.lng()

      this.loadMap();

      if (this.props.drawMode) {
        this.drawPolyline();
      }
      console.log(this.state.position.lat());
      console.log(this.state.position.lng());
      console.log(this.state.place);

    })
  }

  calarea() {
    if (resizablePolygon != undefined) {
      var areaval = google.maps.geometry.spherical.computeArea(resizablePolygon);


      for (var i = 0; i < resizablePolygon.getLength(); i++) {
        coordinates.push(resizablePolygon.getAt(i).toUrlValue(6))
      }
      var stringifycordimates = JSON.stringify(coordinates);
      console.log(stringifycordimates)
      console.log(this.state.place)

      this.props.area(areaval, this.state.place, stringifycordimates);

    } else {
      alert("please draw the map");
    }
  }



  render() {
    return (
      <div className="map-position" >
        <div id="myModal" className="modal fade" role="dialog" >
          <div className="modal-dialog" style={{ width: "75%",top:81 }} >
            <div className="modal-content">
              <div className="modal-header modal-hed">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body row">
                <div className="col-md-8">
                  {/*}  <iframe width="560" height="315" src="https://www.youtube.com/embed/sXr7_2sYLDw?autoplay=1" ></iframe>*/}
                  <img src="./img/ezgif.com-video-to-gif.gif" className="img-responsive" style={{ minHeight: "200px", width: "100%" }} />
                </div><div className="col-md-4">
                  <ul className="stegs_map">
                    <li><span> 1</span>: Hitta Ditt Hus och zooma in med + symbolen längst ner till höger på kartan</li>
                    <li><span>2</span>:Växla till kartläget högst upp till vänster om ditt hus är otydligt på satellitbilden</li>
                    <li><span>3</span>: Markera ut takens alla hörn</li>
                    <li><span> 4</span>: Tryck "Nästa" när linjerna är slutna</li>
                    <li ><button className="btn btn-primary " data-dismiss="modal" >Ok</button></li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
        
          <input
          id="autofill"
            ref='autocomplete'
            type="text"
            className="form-control"
            onChange={this.autocmp.bind(this)}
            
            placeholder="Ange en plats" />
            {/*}
         <input

            type='submit'
            value='Go' />
        
    */}

        <div
          style={this.props.mapStyle}
          ref='map'>
          Loading map...
      </div>


        {<div style={deleteStyle} ><button id="delete-button" className="btn btn-info">Rensa</button>
          <button onClick={this.calarea.bind(this)} className="btn btn-info" id="buttonnew" style={{ ...this.state.color }} >Nästa</button></div>
        }
      </div>)
  }
}


export default Map;
