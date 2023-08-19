import { useEffect, useState } from 'react';

function useDeviceCameraAndMicrophone() {
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [hasMicrophone, setHasMicrophone] = useState<boolean>(false);

  useEffect(() => {
    const hasCameraDevice =
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    const hasMicrophoneDevice =
      navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

    setHasCamera(!!hasCameraDevice);
    setHasMicrophone(!!hasMicrophoneDevice);
  }, []);

  return {
    hasCamera,
    hasMicrophone,
  };
}

export default useDeviceCameraAndMicrophone;
