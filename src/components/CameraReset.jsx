import { useEffect } from "react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";

const CameraReset = ({ controlsRef, modelRef }) => {
  const productId = useConfiguratorStore((s) => s.productId);

  useEffect(() => {
    if (!controlsRef.current || !modelRef.current) return;

    controlsRef.current.fitToBox(modelRef.current, true, {
      paddingLeft: 0.6,
      paddingRight: 0.6,
      paddingTop: 0.4,
      paddingBottom: 0.4,
    });
    
  }, [productId, modelRef]);

  return null;
};

export default CameraReset;
