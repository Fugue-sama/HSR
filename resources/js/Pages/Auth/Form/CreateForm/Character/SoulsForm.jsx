import React from "react"

const SoulsForm = ({ souls, setSouls, errors }) => {
  const handleSoulChange = (index, field, value) => {
    setSouls((prev) => {
      const newSouls = [...prev]
      newSouls[index] = { ...newSouls[index], [field]: value }
      return newSouls
    })
  }

  return (
    <div className="col-span-full space-y-4 border border-gray-700 rounded-md p-10">
      <h3 className="text-lg font-semibold text-[#bda377]">Tinh hồn</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {souls.map((soul, index) => (
          <div key={index} className="space-y-2 border border-gray-700 rounded-md p-4">
            {errors[`souls.${index}.name`] ? (
              <span className="text-red-500">
                {Array.isArray(errors[`souls.${index}.name`])
                  ? errors[`souls.${index}.name`][0]
                  : errors[`souls.${index}.name`]}
              </span>
            ) : null}
            <h4 className="text-md font-semibold text-[#d4b990]">Tinh hồn {index + 1}</h4>
            <div>
              <label className="text-sm font-medium text-[#d4b990]">Tên</label>
              <input
                type="text"
                value={soul.name}
                onChange={(e) => handleSoulChange(index, "name", e.target.value)}
                className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#d2b990]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#d4b990]">Mô tả</label>
              <input
                type="text"
                value={soul.desc}
                onChange={(e) => handleSoulChange(index, "desc", e.target.value)}
                className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#d2b990]"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#d4b990]">Ảnh</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleSoulChange(index, "image", e.target.files[0])
                }
                className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#d2b990]"
              />
              {/* Kiểm tra xem có ảnh được chọn hay không và hiển thị ảnh */}
              {soul.image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(soul.image)}
                    alt="Soul image preview"
                    className="w-32 h-32 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SoulsForm
