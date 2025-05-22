import React from 'react';

const DescriptionForm = ({ data, setData, errors }) => {
  return (
    <div className="col-span-full space-y-4 border border-gray-700 p-10 rounded-md">
      <h3 className="text-lg font-semibold text-[#bda377]">Mô tả</h3>
      
      <div>
        <label className="text-sm font-medium text-[#d4b990]">Mô tả</label>
        <textarea
          value={data.desc}
          onChange={(e) => setData('desc', e.target.value)}
          className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#d2b990]"
        />
        {errors.desc && <p className="text-xs text-red-500">{errors.desc}</p>}
      </div>
    </div>
  );
};

export default DescriptionForm;
