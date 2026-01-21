import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Backdrop } from "@react-three/drei";
import Furniture from "./Furniture";
import Measurements from "./Measurements/Measurements";
import ViewerControls from "./ViewerControls";
import { useRef } from "react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";

export default function Viewer() {
  const modelRef = useRef();
  const showMeasurements = useConfiguratorStore(
    (state) => state.showMeasurements,
  );
  return (
    <div className="absolute inset-0">
      <Canvas
        className="h-full w-full "
        camera={{ position: [0, 0.4, 2.5], fov: 50 }}
      >
        <Stage
          environment={"studio"}
          intensity={0.00005}
          // shadows = {true}
          adjustCamera={false}
        >
          {/* MODEL */}
          <Furniture ref={modelRef} />
        </Stage>
        {showMeasurements && (
          <Measurements key="measurements" targetRef={modelRef} />
        )}

        {/* CONTROLS */}
        <OrbitControls
          enablePan={true}
          enableRotate={true}
          makeDefault={true}
          maxDistance={5}
          minDistance={0.9}
        />
        <ViewerControls />
      </Canvas>
    </div>
  );
}
