import { useState } from "react";
import EditorSection from "./EditorSection";
import { useConfiguratorStore } from "../../Store/useConfiguratorStore";

const EditorPanel = () => {
  const [openSection, setOpenSection] = useState(null);

  const productId = useConfiguratorStore((state) => state.productId);
  const setProductId = useConfiguratorStore((state) => state.setProductId);
  const woodFinish = useConfiguratorStore((state) => state.woodFinish);
  const setWoodFinish = useConfiguratorStore((state) => state.setWoodFinish);
  const handleNumber = useConfiguratorStore((state) => state.handleNumber);
  const setHandleNumber = useConfiguratorStore(
    (state) => state.setHandleNumber,
  );

  const handleFinish = useConfiguratorStore((state) => state.handleFinish);
  const setHandleFinish = useConfiguratorStore(
    (state) => state.setHandleFinish,
  );
  const legsNumber = useConfiguratorStore((state) => state.legsNumber);
  const setLegsNumber = useConfiguratorStore((state) => state.setLegsNumber);
  const PRODUCTS = [
    { id: "565-01", name: "One Drawer" },
    { id: "565-02", name: "Three Drawer" },
    { id: "565-04", name: "Chest" },
    { id: "565-05", name: "Single Wardrobe" },
    { id: "565-06", name: "Double Wardrobe" },
  ];
  const LEGS = ["A", "B", "C", "D"];
  const HANDLES = [1, 2, 3, 4, 5];
  const WOOD_FINISHES = [
    "Amber.png",
    "Bitmore.png",
    "Cafelle.png",
    "Cocoballa.png",
    "Columbian.png",
    "Empire.png",
    "Fonthill.png",
    "Macadamia Nut.png",
    "Natural Ash.png",
    "Raya.png",
    "River Cherry.png",
    "Sudio Teak.png",
    "White Cypress.png",
    "Williamsburg.png",
    "Windsor.png",
  ];
  const HANDLE_FINISHES = [
    "Antique English.jpg",
    "Brushed Nickel.jpg",
    "Satin Nickel.jpg",
  ];
  const selectedProduct = PRODUCTS.find((product) => product.id === productId);

  return (
    <div className="w-[320px] bg-white border-l border-gray-200 mr-10 mt-10 mb-5 flex flex-col h-fit">
      {/* Title */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4 mt-3 ml-3">INSPIRATION</h2>
        <p className="px-2 ml-3 text-sm text-gray-600">
          This transitional collection highlights simplicity, melding subdued
          tones and a wistful spirit.
        </p>
      </div>
      {/* Select Size */}
      <div className="max-h-[70dvh] overflow-y-auto thin-scrollbar">

      <EditorSection
        title="Select Size"
        //  img = {size.id}
        valuelabel={selectedProduct.name}
        previewImage={`sizes_images/${productId}.jpg`}
        isOpen={openSection === "size"}
        onToggle={() => setOpenSection(openSection === "size" ? null : "size")}
        >
          
            
        <div className="
         grid grid-cols-4
         ">
          {PRODUCTS.map((size) => {
            const isSelected = productId === size.id;
            
            return (
              <div
              key={size.id}
              onClick={() => {
                setProductId(size.id);
              }}
              className="cursor-pointer m-1 text-center"
              >
                <img
                  src={`/sizes_images/${size.id}.jpg`}
                  alt={` ${size.name}`}
                  className={` w-full h-15 py-2 p-1 mb-1 border border-gray-100 ${
                    isSelected
                    ? "border-gray-600 ring-0.5 ring-black rounded-sm"
                    : "border-gray-100 rounded-sm"
                  }`}
                  />

                <div className="text-xs text-gray-600 ">{size.name}</div>
              </div>
            );
          })}
        </div>
          
      </EditorSection>
      {/* Select Wood Finish */}
      <EditorSection
        title="Select Wood Finish"
        valuelabel={woodFinish?.replace(".png", "")}
        previewImage={`/models/${productId}/Varients/WOOD LAMINATE FINISHES/${woodFinish}`}
        isOpen={openSection === "wood"}
        onToggle={() => setOpenSection(openSection === "wood" ? null : "wood")}
        >
        <div className="grid grid-cols-4 gap-3">
          {WOOD_FINISHES.map((finish) => {
            const isSelected = woodFinish === finish;
            const imgPath = `/models/${productId}/Varients/WOOD LAMINATE FINISHES/${finish}`;
            
            return (
              <div
              key={finish}
                onClick={() => {
                  setWoodFinish(finish);
                }}
                className={`cursor-pointer aspect-square rounded-lg w-[50px] overflow-hidden border
                  ${isSelected ? "border-black ring-2 ring-black" : ""}
                  `}
              >
                <img
                  src={imgPath}
                  alt={finish}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </EditorSection>
      {/* Select Handle */}
      <EditorSection
        title="Select Handle Type"
        valuelabel={handleNumber ? `Handle ${handleNumber}` : ""}
        previewImage={`/handle_images/handle_${handleNumber}.jpg`}
        isOpen={openSection === "handle"}
        onToggle={() =>
          setOpenSection(openSection === "handle" ? null : "handle")
        }
        >
        <div className="grid  grid-cols-4">
          {HANDLES.map((num) => {
            const isSelected = handleNumber === num;
            
            return (
              <div
              key={num}
              onClick={() => setHandleNumber(num)}
              className={`cursor-pointer rounded-lg px-1 py-2 text-center text-xs
                
                `}
              >
                <img
                  src={`/handle_images/handle_${num}.jpg`}
                  alt={`handle ${num}`}
                  className={` w-full h-12 py-2 p-1 mb-1 border border-gray-200 ${
                    isSelected
                      ? "border-gray-600 ring-0.5 ring-black rounded-lg"
                      : "border-gray-300 rounded-lg"
                    }`}
                    />
                <div className="text-xs text-gray-600">Handle {num}</div>
              </div>
            );
          })}
        </div>
      </EditorSection>
      {/* handle finish */}{" "}
      <EditorSection
        title="Select Handle Finish"
        previewImage={`/handle_finishes/${handleFinish}`}
        valuelabel={handleFinish?.replace(".jpg", "")}
        isOpen={openSection === "handleFinish"}
        onToggle={() =>
          setOpenSection(openSection === "handleFinish" ? null : "handleFinish")
        }
        >
        <div className="grid  grid-cols-4 gap-3">
          {HANDLE_FINISHES.map((finish) => {
            const isSelected = handleFinish === finish;
            
            return (
              <div
              key={finish}
              onClick={() => setHandleFinish(finish)}
              className={`cursor-pointer aspect-square rounded-lg w-[50px] overflow-hidden border
                ${isSelected ? "border-black ring-1 rounded-lg ring-black" : ""}
                `}
                >
                <img
                  src={`/handle_finishes/${finish}`}
                  alt={` ${finish}`}
                  className={`w-full h-full object-cover 
                    `}
                    />
                <div className="text-xs text-gray-600">
                  {finish?.replace(".jpg", "")}
                </div>
              </div>
            );
          })}
        </div>
      </EditorSection>
      {/* LegOptions */}
      <EditorSection
        title="Select Leg Option"
        valuelabel={legsNumber ? `${legsNumber}` : ""}
        previewImage={`/legs_images/legs_${legsNumber}.png`}
        isOpen={openSection === "legs"}
        onToggle={() => setOpenSection(openSection === "legs" ? null : "legs")}
        >
        <div className="grid  grid-cols-4">
          {LEGS.map((num) => {
            const isSelected = legsNumber === num;
            
            return (
              <div
              key={num}
              onClick={() => setLegsNumber(num)}
              className={`cursor-pointer  rounded-lg w-[50px]
                `}
                >
                <img
                  src={`/legs_images/legs_${num}.png`}
                  alt={`legs ${num}`}
                  className={`w-12 h-12 rounded-md`}
                  />
                <div className="mt-2 text-xs text-center text-gray-600">
                  Leg {num}
                </div>
              </div>
            );
          })}
        </div>
      </EditorSection>
          </div>
    </div>
  );
};


export default EditorPanel;


