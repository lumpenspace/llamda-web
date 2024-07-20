"use client"
import { useCallback, useEffect, useMemo, useState } from 'react';

type DeviceOrientation = {
  alpha: number | null,
  beta: number | null,
  gamma: number | null,
}

type UseDeviceOrientationData = {
  orientation: DeviceOrientation | null,
  error: Error | null,
  orientationChange: DeviceOrientation | null,
  permission: boolean | null,
};

const useDeviceOrientation = (frequency: number = 100) => {
  const [error, setError] = useState<Error | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [orientation, setOrientation] = useState<DeviceOrientation | null>(null);
  const [initialOrientation, setInitialOrientation] = useState<DeviceOrientation | null>(null);

  const requestAccess = useCallback(async (): Promise<boolean> => {
    console.log('requesting access');
    if (!DeviceOrientationEvent) {
      setError(new Error('Device orientation event is not supported by your browser'));
      return false;
    }

    if (!('requestPermission' in DeviceOrientationEvent)) {
      setError(new Error('Device orientation event does not support requestPermission'));
      return true;
    } else {
      let permissionResponse: PermissionState;
      try {
        permissionResponse = await (DeviceOrientationEvent as any).requestPermission();
        return permissionResponse === 'granted';
      } catch (err) {
        setError(err as Error);
        return false;
      }
    }
  }, []);

  useEffect(() => {
    const getPermission = async () => {
      const granted = await requestAccess();
      setHasPermission(granted);
    };
    getPermission();
  }, [requestAccess]);

  useEffect(() => {
    console.log('permission', hasPermission);
    let lastUpdateTime = 0;
  
    if (hasPermission) {
      const onDeviceOrientation = (event: DeviceOrientationEvent): void => {
        const currentTime = Date.now();
        if (currentTime - lastUpdateTime >= frequency) {
          lastUpdateTime = currentTime;
          if (!initialOrientation) {
            setInitialOrientation({
              alpha: event.alpha,
              beta: event.beta,
              gamma: event.gamma,
            });
          }
          setOrientation({
            alpha: event.alpha,
            beta: event.beta,
            gamma: event.gamma,
          });
        }
      };
  
      window.addEventListener('deviceorientation', onDeviceOrientation);
  
      return () => {
        window.removeEventListener('deviceorientation', onDeviceOrientation);
      };
    }
  }, [hasPermission, initialOrientation, frequency]);

  const orientationChange = useMemo(() => {
    if (initialOrientation && orientation) {
      return {
        alpha: (orientation.alpha ?? 0) - (initialOrientation.alpha ?? 0),
        beta: (orientation.beta ?? 0) - (initialOrientation.beta ?? 0),
        gamma: (orientation.gamma ?? 0) - (initialOrientation.gamma ?? 0),
      };
    }
    return null;
  }, [initialOrientation, orientation]);

  return {
    orientation,
    error,
    orientationChange,
    hasPermission: hasPermission,
  };
};

export default useDeviceOrientation;
export type { DeviceOrientation, UseDeviceOrientationData };