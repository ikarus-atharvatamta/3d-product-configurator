// import { useFrame } from "@react-three/fiber";
// import { useConfiguratorStore } from "../Store/useConfiguratorStore";
// import * as THREE from "three";

// const CameraFocusController = ({ controlsRef }) => {
//   const focusedPoint = useConfiguratorStore((s) => s.focusedPoint);
//   const isResetting = useConfiguratorStore((s) => s.isResetting);

//   const desiredPos = new THREE.Vector3();
//   const desiredTarget = new THREE.Vector3();

//   useFrame(() => {
//     if (!controlsRef.current) return;

//     const controls = controlsRef.current;

    
//     if (focusedPoint) {
//       desiredTarget.copy(focusedPoint);
//       desiredPos.copy(focusedPoint).add(new THREE.Vector3(0, 0, 0.35));
//     }

    
//     else if (isResetting) {
//       desiredPos.copy(controls.position0);
//       desiredTarget.copy(controls.target0);
//     }

//     else {
//       return;
//     }

//     controls.object.position.lerp(desiredPos, 0.05);
//     controls.target.lerp(desiredTarget, 0.05);
//     controls.update();


//     if (
//       isResetting &&
//       controls.object.position.distanceTo(desiredPos) < 0.01
//     ) {
//       useConfiguratorStore.setState({ isResetting: false });
//     }
//   });

//   return null;
// };
// export default CameraFocusController;


import { useEffect } from "react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";

const CameraFocusController = ({ controlsRef }) => {
  const focusedPoint = useConfiguratorStore((s) => s.focusedPoint);
  const isResetting = useConfiguratorStore((s) => s.isResetting);

  useEffect(() => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;

    if (focusedPoint) {
      controls.setLookAt(
        focusedPoint.x,
        focusedPoint.y,
        focusedPoint.z + 0.45, // camera position
        focusedPoint.x,
        focusedPoint.y,
        focusedPoint.z,        // look-at
        true                   // smooth animation
      );
      return;
    }

    if (isResetting) {
      controls.reset(true);
      useConfiguratorStore.setState({ isResetting: false });
    }
  }, [focusedPoint, isResetting]);

  return null;
};

export default CameraFocusController;
