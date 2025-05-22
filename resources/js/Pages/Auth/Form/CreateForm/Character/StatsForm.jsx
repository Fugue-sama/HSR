import React from 'react';

const STATS_FIELDS = [
  { name: 'Máu', type: 'hp' },
  { name: 'Tấn công', type: 'attack' },
  { name: 'Phòng thủ', type: 'defend' },
  { name: 'Tốc độ', type: 'speed' },
  { name: 'Khiêu khích', type: 'taunt' },
];

const StatsForm = ({ stats, setStats, errors }) => {
  const handleChange = (type, value) => {
    setStats(prevStats => ({
      ...prevStats,
      [type]: value,
    }));
  };

  return (
    <div className="col-span-full md:col-span-1 space-y-4 border border-gray-700 rounded-md p-10">
      <h3 className="text-lg font-semibold text-[#bda377]">Thông số</h3>
      <div className="grid grid-cols-1 gap-4">
        {STATS_FIELDS.map(field => (
          <div key={field.type} className="space-y-2">
            <label className="text-sm font-medium text-[#d4b990]">{field.name}</label>
            <input
              type="number"
              value={stats[field.type] || ''}
              onChange={(e) => handleChange(field.type, e.target.value)}
              className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#d2b990]"
            />
           {errors[`stats.${field.type}`] ? (
            <span className="text-red-500">
                {Array.isArray(errors[`stats.${field.type}`]) ? errors[`stats.${field.type}`][0] : errors[`stats.${field.type}`]}
            </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsForm;
