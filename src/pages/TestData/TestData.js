import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react';
import ReactMapGL, { Marker } from '@goongmaps/goong-map-react';
import { GoongGeocoder } from '@goongmaps/goong-sdk';

function TestData() {
    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });

    const [marker, setMarker] = useState(null);
    const [searchText, setSearchText] = useState('');

    // Khởi tạo Geocoder
    // const geocoder = GoongGeocoder({
    //     accessToken: process.env.REACT_APP_GOONG_MAP_KEY,
    // });

    // Xử lý sự kiện tìm kiếm địa chỉ
    // const handleSearch = async () => {
    //     try {
    //         const response = await geocoder
    //             .forwardGeocode({
    //                 query: searchText,
    //                 limit: 1,
    //             })
    //             .send();

    //         const result = response.body;
    //         if (result && result.features && result.features.length) {
    //             const feature = result.features[0];

    //             setMarker({
    //                 latitude: feature.center[1],
    //                 longitude: feature.center[0],
    //                 name: feature.place_name,
    //             });

    //             setViewport({
    //                 ...viewport,
    //                 latitude: feature.center[1],
    //                 longitude: feature.center[0],
    //                 zoom: 14,
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div>
            <div>
                <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                {/* <button onClick={handleSearch}>Search</button> */}
            </div>
            <ReactMapGL
                {...viewport}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                goongApiAccessToken={process.env.REACT_APP_GOONG_MAP_KEY2}
            >
                {marker && (
                    <Marker latitude={marker.latitude} longitude={marker.longitude}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    );
}

export default TestData;
