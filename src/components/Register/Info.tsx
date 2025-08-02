import { useState } from "react"
import { InfoIcon } from "lucide-react";

const Info = ({ title }: { title: string }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
        aria-label="Password rules info"
      >
        <InfoIcon size={16} />
      </button>
      {show && (
        <div className="absolute bottom-full mb-2 w-64 p-2 text-sm text-white bg-gray-700 rounded shadow-lg z-50">
          {title}
        </div>
      )}
    </div>
  );
};

export default Info