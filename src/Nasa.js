import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import GoogleMap from 'google-map-react';

class Marker extends React.PureComponent {
    render() {
        return (
            <div className='marker'>
            </div>
        )
    }
}

class Nasa extends React.PureComponent {
    static defaultProps = {
        center: {lat: 40, lng: -20},
        zoom: 3
    };

    constructor(props) {
        super(props);

        this.state = {
            groundStations: []
        }
    }

    componentDidMount() {
        axios.get("http://sscweb.gsfc.nasa.gov/WS/sscr/2/groundStations")
        .then(res => {
            const groundStations = res.data.GroundStation[1];
            
            this.setState({
                groundStations
            });
        })
    }
    
    render() {
        return (
            <div style={{'width': '99vw', 'height': '99vh'}}>
                <GoogleMap
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                 >
                 {this.state.groundStations.map(gs => 
                    <Marker key={Math.random()} lat={gs.Location.Latitude} lng={gs.Location.Longitude} />
                    )}
                 </GoogleMap>
            </div>
        );
    }
}

export default Nasa;