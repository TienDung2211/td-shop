import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh',
};

function TestData() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBUj7H9TqHMFdVyAHdRFtiImlQMon25XMo',
    });

    const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

    return isLoaded ? (
        <GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle}>
            <Marker position={center} />
        </GoogleMap>
    ) : (
        <h1>Loading</h1>
    );
}

export default TestData;
