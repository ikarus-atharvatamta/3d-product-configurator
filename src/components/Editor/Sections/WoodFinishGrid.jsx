import { useConfiguratorStore } from "../../../Store/useConfiguratorStore";

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

const WoodFinishGrid = ({ onSelect }) => {
  const woodFinish = useConfiguratorStore((s) => s.woodFinish);
  const setWoodFinish = useConfiguratorStore((s) => s.setWoodFinish);
  const productId = useConfiguratorStore((s) => s.productId);

  return (
    <div className="grid grid-cols-3 gap-3">
      {WOOD_FINISHES.map((finish) => {
        const isSelected = woodFinish === finish;
        const texturePath = `/models/${productId}/Variants/WOOD LAMINATE FINISHES/${finish}`;

        return (
          <button
            key={finish}
            onClick={() => {
              setWoodFinish(finish);
              onSelect(); // close section
            }}
            className={`aspect-square rounded-md border overflow-hidden ${
              isSelected
                ? "border-gray-900 ring-2 ring-gray-900"
                : "border-gray-300"
            }`}
          >
            <img
              src={texturePath}
              alt={finish}
              className="w-full h-full object-cover"
            />
          </button>
        );
      })}
    </div>
  );
};

export default WoodFinishGrid;
