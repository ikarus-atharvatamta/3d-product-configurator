import { Camera, RulerDimensionLine, Smartphone,Plus,Minus } from "lucide-react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";
import { useNavigate } from "react-router-dom";

const ViewerControls = ({controlsRef}) => {
  const triggerExport = useConfiguratorStore((state)=>state.triggerExport);
  const gl = useConfiguratorStore((state) => state.gl);
  const scene = useConfiguratorStore((state) => state.scene);
  const camera = useConfiguratorStore((state) => state.camera);
  //show measurements and toggle measurements store
  const showMeasurements = useConfiguratorStore(
    (state) => state.showMeasurements,
  );
  const toggleMeasurements = useConfiguratorStore(
    (state) => state.toggleMeasurements,
  );
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
  const zoomIn = ()=>
  {
    const controls = controlsRef.current;
    const camera = controls.object;

    const direction = camera.position.clone()
    .sub(controls.target)
    .normalize();

    const distacnce = camera.position.distanceTo(controls.target);
    const newDistance = Math.max(distacnce - 0.3,controls.minDistance);
    
    camera.position.copy(controls.target.clone().add(direction.multiplyScalar(newDistance)))
    controls.update();
  }
  const zoomOut = ()=>
  {
    const controls = controlsRef.current;
    const camera = controls.object;

    const direction = camera.position.clone()
    .sub(controls.target)
    .normalize();

    const distacnce = camera.position.distanceTo(controls.target);
    const newDistance = Math.min(distacnce + 0.3,controls.maxDistance);
    
    camera.position.copy(controls.target.clone().add(direction.multiplyScalar(newDistance)))
    controls.update();
  }

  return (
    <>
      {/* screenshot button */}
      <div className="absolute right-4 top-1/3 translate-y-1/2">
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
        <button
          onClick={triggerExport}
          className="w-10 h-10 rounded-sm bg-white shadow flex items-center justify-center cursor-pointer mt-2"
        >
          <Smartphone />
        </button>
         {/* Zoom In */}
      <button
        onClick={zoomIn}
        className="w-10 h-10 bg-white shadow rounded-sm flex items-center justify-center cursor-pointer mt-2"
      >
        <Plus />
      </button>

      <button
        onClick={zoomOut}
        className="w-10 h-10 bg-white shadow rounded-sm flex items-center justify-center cursor-pointer mt-2"
      >
        <Minus />
      </button>
      </div>
    </>
  );
};

export default ViewerControls;
