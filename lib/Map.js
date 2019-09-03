'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pointInPolygon = require('point-in-polygon');

var _pointInPolygon2 = _interopRequireDefault(_pointInPolygon);

var _qs = require('qs');

var markersArray = [];
var bounds = undefined;
var drawingManager = undefined;
var center = undefined;
var maps = undefined;
var resizablePolygon = undefined;
var _area = undefined;
var latitude = undefined;
var longitude = undefined;
var locationAddress = "Djurgårdsvägen 50, 115 21 Stockholm";
var coordinates = [];

var deleteStyle = {
  marginTop: "-88px",
  position: "absolute",
  textAlign: "center",
  left: "40%"
};
var nextStyle = {
  marginTop: "-88px",
  position: "absolute",
  textAlign: "left"
};

var Map = (function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map(props) {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, props);
    latitude = this.props.mapConfig.lat;
    longitude = this.props.mapConfig.lng;
    var address = "Djurgårdsvägen 50, 115 21 Stockholm";
    if (this.props.roofaddress != "") {
      locationAddress = this.props.roofaddress;
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

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var main = this;
      var locationname = (0, _qs.parse)(location.search.substr(1));
      if (locationname.location != undefined) {
        locationAddress = locationname.location;
      }
      //AIzaSyCJ7I4HvFK1CZcRloBVLjnO8_JElgTRZ1o ---old apikey
      //AIzaSyB4prJzCvsqdW0YOKo3idjakgvZUXRR_TI
      fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJ7I4HvFK1CZcRloBVLjnO8_JElgTRZ1o&address=' + locationAddress).then(function (response) {
        return response;
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.results[0].geometry.location.lat != '' && data.results[0].geometry.location.lng) {
          latitude = data.results[0].geometry.location.lat, longitude = data.results[0].geometry.location.lng;
          main.setState({
            lat: latitude,
            lng: longitude,
            place: locationAddress
          });
          main.loadMap();
          main.drawPolyline();
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
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
  }, {
    key: 'area',
    value: function area(resizablePolygon) {
      _area = google.maps.geometry.spherical.computeArea(resizablePolygon);
      console.log("area" + _area);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var google = this.props.google;
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

  }, {
    key: 'insertMarker',
    value: function insertMarker() {
      var google = this.props.google;

      var maps = google.maps;
      google.maps.event.addListener(this.map, 'click', (function (e) {
        var _this = this;

        var markerProps = {
          position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
          map: this.map,
          draggable: true
        };
        var marker = new maps.Marker(markerProps);
        this.props.handleReturnedMarkers({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        marker.addListener('dragend', function (e) {
          _this.props.handleReturnedMarkers({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        });
      }).bind(this));
    }
  }, {
    key: 'drawPolyline',
    value: function drawPolyline() {
      var google = this.props.google;
      /*drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        polygonOptions: this.props.polygonOptions
      });*/
      drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
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
      google.maps.event.addListener(drawingManager, 'polygoncomplete', (function (polyline) {
        drawingManager.setDrawingMode(null);
        resizablePolygon = polyline.getPath();
        this.area(resizablePolygon);
        var color_data = this.state.color;
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
          drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
          var color_data = color_data;
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
      }).bind(this));
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

  }, {
    key: 'loadMap',
    value: function loadMap() {
      try {
        var _google = this.props.google;

        var _maps = _google.maps;
        var mapRef = this.refs.map;
        var node = _reactDom2['default'].findDOMNode(mapRef);
        var mapConfig = this.props.mapConfig;
        var zoom = mapConfig.zoom;
        var lat = mapConfig.lat;
        var lng = mapConfig.lng;

        var _center = new _maps.LatLng(this.state.lat, this.state.lng);
        var mapConfiguration = _extends({}, {
          center: _center,
          zoom: zoom,
          zoomControl: true,
          drawingMode: _google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          streetViewControl: false,
          drawingControlOptions: { drawingModes: [_google.maps.drawing.OverlayType.POLYGON] },
          mapTypeId: _google.maps.MapTypeId.SATELLITE
        });

        this.map = new _maps.Map(node, mapConfiguration);
        this.map.setTilt(0);
        _google.maps.event.addListenerOnce(this.map, 'idle', function () {
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
  }, {
    key: 'autocmp',
    value: function autocmp() {
      var _this2 = this;

      var geocoder = new google.maps.Geocoder();
      var aref = this.refs.autocomplete;
      var node = _reactDom2['default'].findDOMNode(aref);
      var autocomplete = new google.maps.places.Autocomplete(node);
      autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }
        _this2.setState({
          place: place.formatted_address,
          position: place.geometry.location
        });
        _this2.setState({
          lat: _this2.state.position.lat(),
          lng: _this2.state.position.lng()
        });
        _this2.props.mapConfig.lat = _this2.state.position.lat();
        _this2.props.mapConfig.lng = _this2.state.position.lng();
        _this2.loadMap();
        if (_this2.props.drawMode) {
          _this2.drawPolyline();
        }
        console.log(_this2.state.position.lat());
        console.log(_this2.state.position.lng());
        console.log(_this2.state.place);
      });
    }
  }, {
    key: 'calarea',
    value: function calarea() {
      if (resizablePolygon != undefined) {
        var areaval = google.maps.geometry.spherical.computeArea(resizablePolygon);
        for (var i = 0; i < resizablePolygon.getLength(); i++) {
          coordinates.push(resizablePolygon.getAt(i).toUrlValue(6));
        }
        var stringifycordimates = JSON.stringify(coordinates);
        console.log(this.state.place);
        this.props.area(areaval, this.state.place, stringifycordimates);
      } else {
        alert("please draw the map");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'map-position' },
        _react2['default'].createElement(
          'div',
          { id: 'myModal', className: 'modal fade', role: 'dialog' },
          _react2['default'].createElement(
            'div',
            { className: 'modal-dialog map-dialog', style: { width: "75%", top: 81 } },
            _react2['default'].createElement(
              'div',
              { className: 'modal-content' },
              _react2['default'].createElement(
                'div',
                { className: 'modal-header modal-hed' },
                _react2['default'].createElement(
                  'button',
                  { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                  '×'
                )
              ),
              _react2['default'].createElement(
                'div',
                { className: 'modal-body row' },
                _react2['default'].createElement(
                  'div',
                  { className: 'col-md-7' },
                  _react2['default'].createElement('img', { src: './img/ezgif.com-video-to-gif.gif', className: 'img-responsive', style: { minHeight: "200px", width: "100%" }, alt: 'image' })
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'col-md-4' },
                  _react2['default'].createElement(
                    'ul',
                    { className: 'stegs_map' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'span',
                        null,
                        ' 1'
                      ),
                      ': Hitta Ditt Hus och zooma in med + symbolen längst ner till höger på kartan'
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'span',
                        null,
                        '2'
                      ),
                      ':Växla till kartläget högst upp till vänster om ditt hus är otydligt på satellitbilden'
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'span',
                        null,
                        '3'
                      ),
                      ': Markera ut takens alla hörn'
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'span',
                        null,
                        ' 4'
                      ),
                      ': Tryck "Nästa" när linjerna är slutna'
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'button',
                        { className: 'btn btn-primary ', 'data-dismiss': 'modal' },
                        'Ok'
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        _react2['default'].createElement('input', {
          id: 'autofill',
          ref: 'autocomplete',
          type: 'text',
          className: 'form-control',
          onChange: this.autocmp.bind(this),
          placeholder: 'Ange en plats' }),
        _react2['default'].createElement(
          'div',
          {
            style: this.props.mapStyle,
            ref: 'map' },
          'Loading map...'
        ),
        _react2['default'].createElement(
          'div',
          { style: deleteStyle, className: 'map-buttons' },
          _react2['default'].createElement(
            'button',
            { id: 'delete-button', className: 'btn btn-info' },
            'Rensa'
          ),
          _react2['default'].createElement(
            'button',
            { onClick: this.calarea.bind(this), className: 'btn btn-info ', id: 'buttonnew', style: _extends({}, this.state.color) },
            'Nästa'
          )
        )
      );
    }
  }]);

  return Map;
})(_react2['default'].Component);

exports['default'] = Map;
module.exports = exports['default'];
/*}  <iframe width="560" height="315" src="https://www.youtube.com/embed/sXr7_2sYLDw?autoplay=1" ></iframe>*/