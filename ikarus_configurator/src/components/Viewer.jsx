import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage,Backdrop } from "@react-three/drei";
import Furniture from "./Furniture";

export default function Viewer() {
  return (
    <Canvas className="h-full w-full " 
    camera ={{position :[0,0.4,2.5], fov : 50}}>
      <Stage
        environment={"studio"}
        intensity={0.00005}
        shadows = {true}
        adjustCamera= {false}

      >
        {/* MODEL */}
        <Furniture />
      </Stage>
      

      {/* CONTROLS */}
      <OrbitControls enablePan={true} enableRotate={true} makeDefault = {true} maxDistance={5} minDistance = {0.90}
  />
    </Canvas>
  );
}
