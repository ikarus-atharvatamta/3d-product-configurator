import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, ContactShadows } from "@react-three/drei";
import Furniture from "./Furniture";
import Measurements from "./Measurements/Measurements";
import ViewerControls from "./ViewerControls";
import { Suspense, useRef } from "react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";
import ThreeBridge from "./ThreeBridge";
import CameraReset from "./CameraReset";

export default function Viewer() {
  const modelRef = useRef();
  const controlsRef = useRef();
  const showMeasurements = useConfiguratorStore(
    (state) => state.showMeasurements,
  );
  console.log(modelRef)

  return (
    <div className="absolute inset-0">
      <Canvas
        className="h-full w-full "
        camera={{ position: [0, 0.4, 2.5], fov: 50 }}
        shadows
      >
        <Stage environment="studio" intensity={0.2} adjustCamera={false} shadows={false} >
          {/* MODEL */}
          <Suspense fallback="laoding">
            <Furniture ref={modelRef} />
            <CameraReset controlsRef={controlsRef} modelRef={modelRef}/>
          </Suspense>
          </Stage>
      
          <ContactShadows position={[0,-0.414,0]} opacity={0.35} scale={1.5} blur={14} far={10} resolution={256} color="#000000" />  
      
        {showMeasurements && (
          <Measurements key="measurements" targetRef={modelRef} />
        )}

        {/* CONTROLS */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableRotate={true}
          makeDefault={true}
          maxDistance={5}
          minDistance={1}
          maxPolarAngle={Math.PI*5/10}
        />
        <ThreeBridge />   
           </Canvas>
      <ViewerControls controlsRef = {controlsRef}/>
    </div>
  );
}
