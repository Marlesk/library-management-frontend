import React from 'react';

type Status = 'all' | 'requested' | 'borrowed' | 'returned';

type StatusFilterProps = {
  activeStatus: Status;
  onChange: (status: Status) => void;
  options?: Status[];
};

const StatusFilter: React.FC<StatusFilterProps> = ({
  activeStatus,
  onChange,
  options = ['all', 'requested', 'borrowed', 'returned'],
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {options.map(status => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-4 py-1 rounded-md font-medium cursor-pointer ${
            activeStatus === status
              ? 'bg-cyan-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 transition'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
