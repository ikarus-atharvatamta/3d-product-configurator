import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";
import { GLTFExporter } from "three/examples/jsm/Addons.js";
import { useNavigate } from "react-router-dom";
//since we dont want to use the buttons inside the canvas to not make them move with the canvas
// we used a bridge that helps us create

const ThreeBridge = () => {
  const { gl, scene, camera } = useThree();
  const navigate = useNavigate();

  const exportModel = useConfiguratorStore((state) => state.exportModel);
  const resetExport = useConfiguratorStore((state) => state.resetExport);
  const setArModelurl = useConfiguratorStore((state) => state.setArModelurl);
  const setThreeState = useConfiguratorStore((state) => state.setThreeState);
  useEffect(() => {
    if (!exportModel) return;

    const model = scene.children.find(
      (child) => child.type === "Group" || child.type === "Object3D",
    );

    const exporter = new GLTFExporter();

    exporter.parse(
      model,
      (result) => {
        const blob = new Blob(  [result instanceof ArrayBuffer ? result : JSON.stringify(result)]
        , { type: "model/gltf-binary" });

        const url = URL.createObjectURL(blob);
        setArModelurl(url);
        navigate("/ar");
        resetExport();
      },
      { binary: true },
    );
  }, [exportModel]);

  useEffect(() => {
    setThreeState(gl, scene, camera);
  }, [gl, scene, camera]);

  return null;
};

export default ThreeBridge;
