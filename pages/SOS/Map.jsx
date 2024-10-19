import React, { useMemo, useState, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  CircleF,
  DirectionsRenderer,
} from '@react-google-maps/api';

// redux : 
import { useDispatch, useSelector } from 'react-redux';

import { closeOptions, farOptions, middleOptions } from './MapStyles';
import Distance from './Distance';
import { updateDuration, updateInformation } from '../../features/helper';

const containerStyle = {
  width: '100%',
  height: '100%',
};

function Map({ latitude, longitude }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyBHcdLugARVRs3mMDdNMTxvwe-t4IYK5PY', // Replace with your API key
    libraries: ['places'],
  });

  const options = useMemo(
    () => ({
      mapId: 'b181cac70f27f5e6',
      clickableIcons: false,
    }),
    []
  );

  const center = {
    lat: latitude || 19.0760, // Default to Mumbai if no latitude is provided
    lng: longitude || 72.8777, // Default to Mumbai if no longitude is provided
  };

  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]); // Stores nearby police stations
  const [selectedPlace, setSelectedPlace] = useState(null); // Selected police station for InfoWindow
  const [direction, setDirection] = useState(null); // Store the direction

  // Redux:
  const dispatch = useDispatch();
  const updateInfoLocation = useSelector((state) => state.helper.data);



  const fetchNearbyPlaces = useCallback((map) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: '5000', // Search within 5 km radius
      type: ['police'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let limitedResults = results
        setPlaces(limitedResults);
        console.log(limitedResults);

        // Update Redux with new police station count
        dispatch(
          updateInformation({
            policeStation: limitedResults.length,
            locationName: updateInfoLocation.locationName, // Keep current locationName
          })
        );
      } else {
        console.error('Nearby search failed:', status);
      }
    });
  }, [center, dispatch, updateInfoLocation.locationName]);

  const onLoad = (map) => {
    setMap(map);
    fetchNearbyPlaces(map);
  };

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Fetch direction and dispatch duration info
  const fetchDirection = (lat, lng,place) => {
    setDirection(null); // Clear previous directions
    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: { lat, lng },
        destination: center,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          console.log("Fetching directions...");
          setDirection(result); // Set new direction
          map.panTo({ lat, lng }); // Pan the map to the selected location

          let dirResult = result.routes[0].legs[0];
          dispatch(updateDuration(dirResult.distance.text));
          dispatch(
            updateInformation({
              policeStation: updateInfoLocation.policeStation, // Keep current policeStation count
              locationName: place.name, // Update the locationName
            })
          );
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {/* Marker for victim's location */}
        <MarkerF
          position={center}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          onClick={() =>
            setSelectedPlace({
              name: 'Victim Location',
              vicinity: `Latitude: ${center.lat}, Longitude: ${center.lng}`,
              geometry: { location: { lat: () => center.lat, lng: () => center.lng } },
            })
          }
        />

        {/* Markers for police stations */}
        {places.map((place, index) => (
          <MarkerF
            key={index}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }}
            title={place.name}
            onClick={() => setSelectedPlace(place)}
            onRightClick={() => fetchDirection(place.geometry.location.lat(), place.geometry.location.lng(),place)}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}

        {/* InfoWindow for the selected place */}
        {selectedPlace && (
          <InfoWindowF
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng(),
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h3>{selectedPlace.name}</h3>
              <p>{selectedPlace.vicinity}</p>
            </div>
          </InfoWindowF>
        )}

        {/* Circle Radius */}
        <CircleF center={center} radius={1000} options={closeOptions}></CircleF>
        <CircleF center={center} radius={2500} options={middleOptions}></CircleF>
        <CircleF center={center} radius={4000} options={farOptions}></CircleF>

        {/* Directions rendering */}
        {direction && (
          <DirectionsRenderer
            directions={direction}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                zIndex: 50,
                strokeColor: '#1976D2',
                strokeWeight: 5,
              },
            }}
          />
        )}
      </GoogleMap>

      {/* Selected Direction Distance */}
      {direction && <Distance leg={direction.routes[0].legs[0]} />}
    </>
  ) : (
    <></>
  );
}

export { Map };
