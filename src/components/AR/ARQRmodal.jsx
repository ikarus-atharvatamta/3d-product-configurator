import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import logo from "../../../public/ikarus_delta_logo.jpg";
const ARQRmodal = ({ open, onClose, arUrl }) => {
  const [loading, setLoading] = useState(true);

  const qrvalue = `https://nonacutely-incised-catherine.ngrok-free.dev/ar?model=${encodeURIComponent(
    arUrl,
  )}`;

  useEffect(() => {
    if (open && arUrl) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [open, arUrl]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative bg-white rounded-md p-8 w-[360px] flex flex-col items-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          <X size={20} />
        </button>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="mb-6 flex items-center justify-center relative">
            <QRCodeSVG value={qrvalue} size={260} />

            <div className="absolute bg-white p-2 rounded-md shadow">
              <img src={logo} alt="Logo" className="w-10 h-10" />
            </div>
          </div>
        )}
        <p className="text-center text-sm text-gray-700 mt-2">
          Scan QR Code with your smartphone camera to place your{" "}
          <span className="font-semibold">Model </span>configuration in your
          room.
        </p>
      </div>
    </div>
  );
};

export default ARQRmodal;
