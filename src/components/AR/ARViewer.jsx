import { useSearchParams } from "react-router-dom";
import { useConfiguratorStore } from "../../Store/useConfiguratorStore";

import "@google/model-viewer"
import { div } from "three/src/nodes/TSL.js";
const ARViewer = () => {
      const arModelurl = useConfiguratorStore((s)=>s.arModelurl)
     
      if(!arModelurl){
        return <div>NO AR MODEL FOUND</div>
      }
     
  return (
    <div className="w-screen h-screen">
      <model-viewer
        src={arModelurl}
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="0.7"
        className = "w-full h-full"
      />
    </div>
  );
};
export default ARViewer;