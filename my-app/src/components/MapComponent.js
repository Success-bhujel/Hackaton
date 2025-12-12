import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '0.75rem', // Match rounded-xl
};

const defaultCenter = {
    lat: 27.7172,
    lng: 85.3240
};

const MapComponent = ({ center = defaultCenter, markers = [] }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    if (loadError) {
        return (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                Error loading map
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                Loading Map...
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >
            <Marker position={center} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />

            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    title={marker.title}
                />
            ))}
        </GoogleMap>
    );
};

export default React.memo(MapComponent);
