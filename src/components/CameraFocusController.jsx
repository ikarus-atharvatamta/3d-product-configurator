import { useFrame } from "@react-three/fiber";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";
import * as THREE from "three";

const CameraFocusController = ({ controlsRef }) => {
  const focusedPoint = useConfiguratorStore((s) => s.focusedPoint);
  const  clearFocusedPoint = useConfiguratorStore ((s)=>s.clearFocusedPoint)
  const desiredPos = new THREE.Vector3();
  const desiredTarget = new THREE.Vector3();

 useFrame(() => {
  if (!focusedPoint || !controlsRef.current) return;

  desiredTarget.copy(focusedPoint);
  desiredPos.copy(focusedPoint).add(new THREE.Vector3(0, 0, 0.35));

  controlsRef.current.object.position.lerp(desiredPos, 0.05); //camera position
  controlsRef.current.target.lerp(desiredTarget, 0.05); //camera look-at point
  controlsRef.current.update();

});


  return null;
};

export default CameraFocusController;
