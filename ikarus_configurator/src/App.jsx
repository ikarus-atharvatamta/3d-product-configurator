import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import React from "react";
import Viewer from "./components/Viewer";
import { useConfiguratorStore } from "./Store/useConfiguratorStore";
import EditorPanel from "./components/Editor/EditorPanel";
function App() {
  const setProductId = useConfiguratorStore((state) => state.setProductId);
  const setWoodFinish = useConfiguratorStore((state) => state.setWoodFinish);
  const setHandleNumber = useConfiguratorStore((state) => state.setHandleNumber)



  return (
    <>
      <div className="flex h-screen w-screen bg-gray-100">
        {/* 3d viewer */}
        <div className="flex-1">
          <Viewer />
        </div>

        {/* right :editor panel */}

        <EditorPanel/>
         

      </div> 
        {/* </div> */}
    </>
  );
  
}

export default App;
