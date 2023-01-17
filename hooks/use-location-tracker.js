import { useState } from "react";

const useLocationTracker = () => {
  const [isFinding, setIsFinding] = useState(false);
  const [latLong, setLangLong] = useState("");
  const [errorLocationMessage, setErrorLocationMessage] = useState("");

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLangLong(`${latitude},${longitude}`);
    setErrorLocationMessage("");
    setIsFinding(false);
  };

  const error = () => {
    setIsFinding(false);
    setErrorLocationMessage("Unable to retrieve your location");
  };
  const handleTrackLocation = () => {
    setIsFinding(true);

    if (!navigator.geolocation) {
      setErrorLocationMessage("Geolocation is not supported by your browser");
      setIsFinding(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    errorLocationMessage,
    handleTrackLocation,
    isFinding,
  };
};
export default useLocationTracker;
