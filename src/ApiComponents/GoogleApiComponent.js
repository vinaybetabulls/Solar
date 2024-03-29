import React, { PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import cache from './ScriptCache';
import GoogleApi from './GoogleApi';
const defaultMapConfig = {};

export const wrapper = (WrappedComponent) => {
  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        loaded: false,
        map: null,
        google: null
      };
    }

    componentDidMount() {
      const refs = this.refs;
      this.scriptCache.google.onLoad((err, tag) => {
        const maps = window.google.maps;
        const props = Object.assign({}, this.props, {
          loaded: this.state.loaded
        });
        const mapRef = refs.map;
        const node = ReactDOM.findDOMNode(mapRef);
        let center = new maps.LatLng(this.props.lat, this.props.lng);
        let mapConfig = Object.assign({}, defaultMapConfig, {
          center, zoom: this.props.zoom
        });
        this.map = new maps.Map(node, mapConfig);
        this.setState({
          loaded: true,
          map: this.map,
          google: window.google
        })
      });
    }

    componentWillMount() {
      this.scriptCache = cache({
        google: GoogleApi({
          apiKey: this.props.apiKey,
          libraries: ['drawing', 'visualization', 'places'],
          language: "SE",
          region: "GB",
        })
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        map: this.state.map,
        google: this.state.google,
        mapComponent: this.refs.map
      })
      return (
        <div>
          <WrappedComponent {...props} />
          <div ref='map' />
        </div>
      )
    }
  }
  return Wrapper;
}

export default wrapper;