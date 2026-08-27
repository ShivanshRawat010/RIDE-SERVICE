import React, { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const LiveTracking = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);

    useEffect(() => {
        if (map.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,

            style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`,

            // Temporary initial location
            center: [84.973062, 20.951794],

            zoom: 13
        });

        map.current.addControl(
            new maplibregl.NavigationControl()
        );

        marker.current = new maplibregl.Marker()
            .setLngLat([84.973062, 20.951794])
            .addTo(map.current);

    }, []);


    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(

            (position) => {
                const { latitude, longitude } = position.coords;

                console.log('Position updated:', latitude, longitude);

                const coordinates = [longitude, latitude];

                if (map.current) {
                    map.current.setCenter(coordinates);

                    marker.current
                        .setLngLat(coordinates);
                }
            },

            (error) => {
                console.error('Error getting location:', error);
            },

            {
                enableHighAccuracy: true
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };

    }, []);


    return (
        <div
            ref={mapContainer}
            className="w-full h-full"
        />
    );
};

export default LiveTracking;