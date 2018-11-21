import React, { Component } from 'react'

import cache from './ApiComponents/ScriptCache';
import GoogleApi from './ApiComponents/GoogleApi';
import GoogleApiComponent from './ApiComponents/GoogleApiComponent';
import Map from './Map';
import { parse } from 'qs';





let lat;
let lng;
class GoogleMapDrawFilter extends React.Component {


constructor(props)
{

	super(props)
	console.log(this.props.area);

}



componentWillMount()
{
 const main = this;
 
 var locationname=parse(location.search.substr(1))
 if(locationname.location!=undefined)
  {
var locationAddress=locationname.location;
  }
	   fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJ7I4HvFK1CZcRloBVLjnO8_JElgTRZ1o&address=${locationAddress}`)
    .then( function(response) {
      return response;
    })
    .then( function(response) {
    return response.json();
	

    }).then( function(data) {

		if(data.results[0].geometry.location.lat!='' && data.results[0].geometry.location.lng!="" )
			{
				
		var latitude=data.results[0].geometry.location.lat;
       var  longitude=data.results[0].geometry.location.lng;
		lat: data.results[0].geometry.location.lat;
		lng:data.results[0].geometry.location.lat;

    
			}
	
		
  })
    	
}




	render () {

		return (
			<div className="mappositiontop">
				<Map
					google={this.props.google}
					heatMap={this.props.heatMap}
					drawMode={this.props.drawMode}
					markers={this.props.markers}
					mapConfig={this.props.mapConfig}
					mapStyle={this.props.mapStyle}
					polygonOptions={this.props.polygonOptions}
					handleReturnedMarkers={this.props.handleReturnedMarkers}
					onMarkerClick={this.props.onMarkerClick}
					insertMarker={this.props.insertMarker}
					apiKey={this.props.apiKey}
					area={this.props.area}
					roofaddress={this.props.roofaddress}

				/>

			</div>
		);
	}
}



GoogleMapDrawFilter.propTypes={
	apiKey:React.PropTypes.string.isRequired,
	drawMode:React.PropTypes.bool,
	heatMap:React.PropTypes.bool,
	markers:React.PropTypes.array,
	mapConfig:React.PropTypes.object,
	polygonOptions:React.PropTypes.object,
	google:React.PropTypes.object, //is provided by wrapper
	mapStyle:React.PropTypes.object,
	handleReturnedMarkers:React.PropTypes.func,
	onMarkerClick:React.PropTypes.func,
	insertMarker:React.PropTypes.bool
};

GoogleMapDrawFilter.defaultProps={
	drawMode:true,
	insertMarker:false,
	mapConfig:{
		zoom:18,
		lat:lat,
		lng:lng,

	},
	mapStyle:{
		height:'600px',
		width: '100%',
	},
	polygonOptions:{
		fillColor: '#58beec',
		fillOpacity: 0.3,
		strokeColor:'#58beec',
		strokeWeight:3,
		clickable: true,
		editable: true,
		zIndex: 1
	},


	
	markers:[],
};



export default GoogleApiComponent(GoogleMapDrawFilter);
