import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";
import { GLTFExporter } from "three/examples/jsm/Addons.js";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
//since we dont want to use the buttons inside the canvas to not make them move with the canvas
// we used a bridge that helps us create

const ThreeBridge = () => {
  const { gl, scene, camera } = useThree();
  const navigate = useNavigate();

  const exportModel = useConfiguratorStore((state) => state.exportModel);
  const resetExport = useConfiguratorStore((state) => state.resetExport);
  const setArModelurl = useConfiguratorStore((state) => state.setArModelurl);
  const setThreeState = useConfiguratorStore((state) => state.setThreeState);
  const arModelurl = useConfiguratorStore((state) => state.arModelurl);
  useEffect(() => {
    if (!exportModel) return;

    const model = scene.children.find(
      (child) => child.type === "Group" || child.type === "Object3D",
    );

    const exporter = new GLTFExporter();

    exporter.parse(
      model,

      async (result) => {
        try {
          const blob = new Blob(
            [result instanceof ArrayBuffer ? result : JSON.stringify(result)],
            { type: "model/gltf-binary" },
          );

          const fileName = `model-${Date.now()}.glb`;

          const { error } = await supabase.storage
            .from("ar-models")
            .upload(fileName, blob, {
              contentType: "model/gltf-binary",
            });

          if (error) {
            console.error("upload error : ", error);
            resetExport();
            return;
          }
          const { data } = supabase.storage
            .from("ar-models")
            .getPublicUrl(fileName);

          setArModelurl(data.publicUrl);
          console.log("AR MODEL URL:", data.publicUrl);
          // navigate(`/ar?model=${encodeURIComponent(data.publicUrl)}`);
          resetExport();
        } catch (err) {
          console.error("export failed", err);
          resetExport();
        }
      },

      { binary: true },
    );
  }, [exportModel]);

  console.log(arModelurl);
  useEffect(() => {
    setThreeState(gl, scene, camera);
  }, [gl, scene, camera]);

  return null;
};

export default ThreeBridge;
