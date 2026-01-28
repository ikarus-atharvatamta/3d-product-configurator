import { useConfiguratorStore } from "../../Store/useConfiguratorStore";
import { useSearchParams } from "react-router-dom";
import "@google/model-viewer";

const ARViewer = () => {
const [params] = useSearchParams();
const modelurl = params.get("model")
  if (!modelurl) {
    return <div>no ar model url found</div>;
  }

  return (
    
    <div className="w-screen h-screen">
      <model-viewer
        src={modelurl}
        ar
        ar-modes="webxr quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="0.7"
        className="w-[50vh] h-[90vh]"
      />
    </div>
  );
};
export default ARViewer;
