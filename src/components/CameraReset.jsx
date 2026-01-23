import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useConfiguratorStore } from "../Store/useConfiguratorStore";
import * as THREE from "three";
const CameraReset =({controlsRef,modelRef})=>{
    const {camera}= useThree();
    const productId = useConfiguratorStore((state)=> state.productId)
    
    useEffect(()=>{
          console.log("modelRef",modelRef)

        if(!modelRef.current || !controlsRef.current) return;

        const box = new THREE.Box3().setFromObject(modelRef.current);
        const center = new THREE.Vector3();
        box.getCenter(center);

      camera.position.set(center.x,center.y+0.2,center.z+2.5);
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    //   camera.lookAt(0,0,0);
      
    //   if(controlsRef.current){
    //   }
    },[productId,modelRef])
    return null;
}
export default CameraReset;