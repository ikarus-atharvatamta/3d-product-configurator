
import React from "react";
import { Routes, Route } from "react-router-dom";
import Viewer from "./components/Viewer";
import { useConfiguratorStore } from "./Store/useConfiguratorStore";
import EditorPanel from "./components/Editor/EditorPanel";
import ARViewer from "./components/AR/ARViewer";
function App() {
  const setProductId = useConfiguratorStore((state) => state.setProductId);
  const setWoodFinish = useConfiguratorStore((state) => state.setWoodFinish);
  const setHandleNumber = useConfiguratorStore(
    (state) => state.setHandleNumber,
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex h-screen w-screen overflow-hidden bg-gray-100 ">
            <div className="flex-1 relative bg-gray-100">
              <Viewer />
            </div>
            {/* 3d viewer */}
            <EditorPanel />
          </div>
        }
      />
      <Route path="/ar" element={<ARViewer />} />
    </Routes>
  );
}

export default App;
