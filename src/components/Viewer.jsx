import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, ContactShadows } from "@react-three/drei";
import Furniture from "./Furniture";
import Measurements from "./Measurements/Measurements";
import ViewerControls from "./ViewerControls";
import { Suspense, useRef } from "react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";
import ThreeBridge from "./ThreeBridge";
import CameraReset from "./CameraReset";
import ARQRmodal from "./AR/ARQRmodal";
import {useThree} from '@react-three/fiber'
import CameraFocusController from "./CameraFocusController";
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
        <Stage environment="warehouse" intensity={0.16} adjustCamera={false} shadows={false} >
          {/* MODEL */}
          <Suspense fallback="loading">
            <Furniture ref={modelRef} controlsRef={controlsRef}/>
            <CameraReset controlsRef={controlsRef} modelRef={modelRef}/>
          </Suspense>
          </Stage>
      
          <ContactShadows position={[0,-0.414,0]} opacity={0.35} scale={1.5} blur={10} far={10} color="#000000" />  
      
        {showMeasurements && (
          <Measurements key="measurements" targetRef={modelRef} />
        )}

        {/* CONTROLS */}
        <OrbitControls
          ref={controlsRef} 
          enableDamping = {true}
          enablePan={true}
          enableRotate={true}
          makeDefault
          maxDistance={5}
          minDistance={1}
          maxPolarAngle={Math.PI*5/10}
        />
        <ThreeBridge />   
        <CameraFocusController controlsRef={controlsRef}/>
           </Canvas>
      <ViewerControls controlsRef = {controlsRef}/>
      
    </div>
  );
}
