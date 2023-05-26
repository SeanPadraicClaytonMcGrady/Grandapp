import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeAddress } from './Geocode';

interface Location {
    lat: number;
    lng: number;
    name: string;
}

interface PopupMapProps {
    initialLocation: Location;
    locations: Location[];
    address: string
}

const PopupMap: React.FC<PopupMapProps> = ({ initialLocation, locations, address }) => {
    const [showMap, setShowMap] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [userLocation, setUserLocation] = useState<Location | null>(null);

    const handleOpenMap = () => {
        setShowMap(true)
    }
    const handleCloseMap = () => {
        setShowMap(false)
        setSelectedLocation(null)
    }

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const coordinates = await geocodeAddress(address);
                setUserLocation({ lat: coordinates.lat, lng: coordinates.lng, name: address });
            } catch (error) {
                console.error('Error al obtener la ubicación del usuario:', error);
            }
        };

        fetchUserLocation();
    }, []);


    return (
        <div>
            <button onClick={handleOpenMap}>Open Map</button>
            {showMap && userLocation && (
                <div>
                    <button onClick={handleCloseMap}>Close Map</button>
                    <MapContainer
                        center={[userLocation.lat, userLocation.lng]}
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <CircleMarker
                            center={[userLocation.lat, userLocation.lng]}
                            radius={35}
                            color="orange"
                        >
                            <Popup>
                                <div>
                                    <h3>{userLocation.name}</h3>
                                    <p>Latitude: {userLocation.lat}</p>
                                    <p>Longitude: {userLocation.lng}</p>
                                </div>
                            </Popup>
                        </CircleMarker>

                    </MapContainer>
                </div>
            )}
        </div>
    );
};

export default PopupMap;