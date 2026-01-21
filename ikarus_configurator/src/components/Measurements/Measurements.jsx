// visual helpers
// not part of product mesh
// toggle them
//access frniturescene
//compute bounding box
//draw lines (later rn we are doing that by dimension line)

import * as THREE from "three";
import { Html } from "@react-three/drei";
const Measurements = ({ targetRef }) => {
  if (!targetRef.current) return null;
  const box = new THREE.Box3().setFromObject(targetRef.current);
  const min = box.min;
  const max = box.max;
    // const helper = new THREE.BoxHelper(targetRef.current, "black");
  
    // targetRef.current.parent.add(helper);
    // return;
// width
const offset = 0.01
  const widthIn = ((max.x - min.x) * 39.3701).toFixed(2);
  const wpoints = [
    new THREE.Vector3(min.x, min.y , max.z+offset),
    new THREE.Vector3(max.x, min.y , max.z+offset),
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(wpoints);
  const wlabelPos = [(min.x + max.x) / 2, min.y , max.z ];
//height
  const heightIn = ((max.y - min.y) * 39.3701).toFixed(2);
  const hpoints = [
    new THREE.Vector3(min.x, min.y, max.z+offset),
    new THREE.Vector3(min.x, max.y, max.z+offset),
  ];
  const hgeometry = new THREE.BufferGeometry().setFromPoints(hpoints);
  const hlabelPos = [min.x, (max.y+min.y)/2,max.z];
//depth
  const depthIn = ((max.z - min.z) * 39.3701).toFixed(2);
  const dpoints = [
    new THREE.Vector3(min.x, min.y, min.z),
    new THREE.Vector3(min.x, min.y, max.z+offset),
  ];
  const dgeometry = new THREE.BufferGeometry().setFromPoints(dpoints);
  const dlabelPos = [min.x, min.y,(min.z + max.z) / 2];
  return (
    <>
      <line geometry={geometry}>
        <lineBasicMaterial color="black" />
      </line>
      <Html position ={wlabelPos} >
        <div className="bg-white rounded text-xs px-2 py-2 shadow text-nowrap">{widthIn} inch</div>
      </Html>
       <line geometry={hgeometry}>
        <lineBasicMaterial color="black" />
      </line>
      <Html position ={hlabelPos} >
        <div className="bg-white rounded text-xs px-2 py-2 shadow text-nowrap">{heightIn} inch</div>
      </Html>

      <line geometry={dgeometry}>
        <lineBasicMaterial color="black" />
      </line>
      <Html position ={dlabelPos} >
        <div className="bg-white rounded text-xs px-2 py-2 shadow text-nowrap">{depthIn} inch</div>
      </Html>
    </>
  );
};
export default Measurements;