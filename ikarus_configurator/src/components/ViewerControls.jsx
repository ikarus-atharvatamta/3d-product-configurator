import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Camera, RulerDimensionLine } from "lucide-react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";
const ViewerControls = () => {
  const { gl, scene, camera } = useThree();
  //function to take a screenshot
  //canvas uses webgl renderer
  //renderer draws everything on canvas now just convert cnavas to image using .toDtataUrl
  const takeScreenshot = () => {
    gl.render(scene, camera); //latest frame rendered
    const image = gl.domElement.toDataURL("image/png"); //image data as PNG data URL

    const link = document.createElement("a"); //triggering a download
    link.href = image;
    link.download = "screenshot.png";
    link.click();
  };
  //show measurements and toggle measurements store
  const showMeasurements = useConfiguratorStore(
    (state) => state.showMeasurements,
  );
  const toggleMeasurements = useConfiguratorStore(
    (state) => state.toggleMeasurements,
  );

  return (
    <>
      <Html position={[0, 0, 0]} fullscreen>
        {/* screenshot button */}
        <div className="absolute right-4 top-1/2 translate-y-1/2">
          <button
            onClick={takeScreenshot}
            className="w-10 h-10 rounded-sm bg-white shadow flex items-center justify-center cursor-pointer "
          >
            <Camera />
          </button>
        
   
        <button
          onClick={toggleMeasurements}
          className="w-10 h-10 rounded-sm bg-white shadow flex items-center justify-center cursor-pointer mt-2"
          >
          <RulerDimensionLine />
        </button>
            </div>
      </Html>
    </>
  );
};

export default ViewerControls;
