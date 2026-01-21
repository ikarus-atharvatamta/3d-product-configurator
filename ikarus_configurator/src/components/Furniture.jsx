import { useEffect,forwardRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";

const Furniture = forwardRef((props,ref)=> {
  //loading from store
  const productId = useConfiguratorStore((state) => state.productId);
  const woodFinish = useConfiguratorStore((state) => state.woodFinish);
  const handleNumber = useConfiguratorStore((state) => state.handleNumber);
  const handleFinish = useConfiguratorStore((state)=> state.handleFinish);
  const legsNumber = useConfiguratorStore((state) => state.legsNumber);
  const legsFinish = useConfiguratorStore((state)=> state.legsFinish);
  const modelPath = `/models/${productId}/${productId}.glb`;
  console.log(modelPath);
  const { scene } = useGLTF(modelPath); //scene is the root object containing meshes, materials, hierarchy

  const handlePath = `/models/${productId}/handle/${productId} Hardware ${handleNumber}.glb`;
  const handleGltf = useGLTF(handlePath);

  const legsPath = `/models/${productId}/Leg Options/Leg ${legsNumber}.glb`;
  const legsGltf = useGLTF(legsPath);

  console.log(legsPath);
  console.log(handlePath);

  const textureLoader = new THREE.TextureLoader();

  function applyWoodMaterial(root,colorMap, roughnessMap){
    root.traverse((child)=>{
      if(child.isMesh && child.material)
      {
        child.material.map = colorMap;
        child.material.roughnessMap = roughnessMap;
        child.material.metalness = 0;
        child.material.roughness = 1;
        child.material.needsUpdate = true;
      }
    })

  }

  
//useEffect for loading textures a(basemap and roughnessmap)
  useEffect(() => {
    const baseColorPath = `/models/${productId}/Varients/WOOD LAMINATE FINISHES/${woodFinish}`;
    const roughnessPath = `/models/${productId}/Varients/Default_Roughness.png`;

    const colorMap = textureLoader.load(baseColorPath);
    colorMap.colorSpace = THREE.SRGBColorSpace; //color textures use SRGB
    colorMap.flipY = false;

    const roughnessMap = textureLoader.load(roughnessPath);
    roughnessMap.colorSpace = THREE.NoColorSpace; //roughness Map is data not color, must stay linear
    roughnessMap.flipY = false;

    //apply to main model
    applyWoodMaterial(scene,colorMap, roughnessMap);
    //apply to the legs
    applyWoodMaterial(legsGltf.scene,colorMap,roughnessMap)
    
  }, [woodFinish, productId, scene, legsPath]);


  //useEffect tot handle the handle finishes
  useEffect(()=>{
    const handleFinishPath = `/handle_finishes/${handleFinish}`
 
    const finishmap = textureLoader.load(handleFinishPath);
    finishmap.colorSpace = THREE.SRGBColorSpace;
    finishmap.flipY = false;

    handleGltf.scene.traverse((child)=>{
      if(child.isMesh&& child.material){
        child.material.map = finishmap;
        child.material.needsUpdate = true;
        child.material.metalness = 1.9;
      }
    })
  
  },[handleFinish,handleGltf])

  //   useEffect to handle the handles
  useEffect(() => {
    const handleScene = handleGltf.scene.clone();
    scene.add(handleScene);

    return () => {
      scene.remove(handleScene);
    };
  }, [handleGltf, scene]);
  //use effect to handle legs
  useEffect(() => {
    const legScene = legsGltf.scene.clone();
    scene.add(legScene);
    return () => {
      scene.remove(legScene);
    };
  }, [legsGltf,scene]);
  
  return <primitive ref={ref} object={scene} position={[0, -0.7, 0]} />;
})
 export default Furniture;

