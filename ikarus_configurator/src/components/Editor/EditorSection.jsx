import { ChevronDown } from "lucide-react";

const EditorSection = ({ title, valuelabel, previewImage, isOpen, onToggle, children }) => {
  return (
    <>
      <div className="border border-gray-200 px-3 py-2 ">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-white cursor-pointer"
      >
        <div className = "flex items-center text-left">
          {previewImage && 
          <img src={previewImage} alt={valuelabel}
          className="w-12 h-12 rounded-md mr-5" />
          }

        <div className="flex flex-col text-left">
          <div className="text-sm font-medium text-gray-900 mb-2 border-t-blue-500">
            {title}</div>
          {valuelabel && (
            <div className=" text-sm text-gray-400">{valuelabel}</div>
          )}
         { console.log(valuelabel)}
        </div>
          </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-900 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
       {isOpen && (
        <div className="px-4 py-4  border-t border-gray-200">
          {children}
        </div>
      )}
      </div>
    </>
  );
};

export default EditorSection;
