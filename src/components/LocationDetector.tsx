import { useState, useEffect } from 'react';

const LocationDetector: React.FC = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        // Fetch address using reverse geocoding (OpenStreetMap Nominatim API)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          if (data && data.display_name) {
            setAddress(data.display_name); // Full address
          } else {
            setAddress('Address not found.');
          }
        } catch (err) {
          setAddress('Failed to retrieve address.');
        }

        setError(null); // Clear any errors
      },
      (err: GeolocationPositionError) => {
        setError(err.message || 'Unable to retrieve your location.');
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className='text-center'>
      {address && (
        <p className='mt-1 text-sm'>
          I'm in
          <span className='font-medium'> {address} </span>
          (<span className='text-blue-500 cursor-pointer'>Refresh Location</span>)
        </p>
      )}
      {error && <p className='mt-4 text-red-600' onClick={getLocation}>{error}</p>}
    </div>
  );
};

export default LocationDetector;
