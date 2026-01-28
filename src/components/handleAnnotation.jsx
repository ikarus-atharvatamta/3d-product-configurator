import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";

const HandleAnnotation = ({ handleMesh, controlsRef }) => {
  const setFocusedPoint = useConfiguratorStore(
    (state) => state.setFocusedPoint,
  );
  const clearFocusedPoint = useConfiguratorStore(
    (state) => state.clearFocusedPoint,
  );
  const focusedPoint = useConfiguratorStore((state) => state.focusedPoint);
  const position = new THREE.Vector3();
  handleMesh.getWorldPosition(position);
  console.log(position);
  return (
    <Html position={[position.x + 0.032, position.y - 0.3, position.z]} center>
      <button
        onClick={() => {
          const pos = new THREE.Vector3();
          handleMesh.getWorldPosition(pos);
          const controls = controlsRef?.current;

          if (focusedPoint) {
            controls?.reset();
            clearFocusedPoint();
          } else {
            controls?.saveState();
            setFocusedPoint(pos);
          }
        }}
        className="w-4 h-4 rounded-full opacity-35 bg-white text-black flex items-center justify-center text-sm shadow"
      >
        {" "}
        +
      </button>
    </Html>
  );
};
export default HandleAnnotation;
