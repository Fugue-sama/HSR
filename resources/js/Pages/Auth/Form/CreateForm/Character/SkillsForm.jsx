import React from 'react'

const SKILL_TYPES = [
  { key: 'name', label: 'Tên', type: 'text' },
  { key: 'image', label: 'Ảnh', type: 'file', accept: 'image/*' },
  { key: 'gif', label: 'GIF', type: 'file', accept: 'image/gif' },
  { key: 'desc', label: 'Mô tả', type: 'textarea' },
]

const SkillsForm = ({ skills, setSkillData, errors }) => {
  return (
    <div className="col-span-full space-y-4 p-10">
      <h3 className="text-lg font-semibold text-[#bda377]">Vết tích</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.keys(skills).map(type => (
          <div key={type} className="border border-gray-700 rounded-md p-2">
            {skills[type].type && (
              <h4 className="text-[1.1rem] font-bold text-[#cfb68e] py-5 underline">{skills[type].type}</h4>
            )}

            {SKILL_TYPES.map(({ key, label, type: inputType, accept }) => (
              <div key={key} className="space-2 px-2">
                {/* Hiển thị lỗi cho trường cụ thể */}
                {errors && errors[`skills.${type}.${key}`] && (
                  <div className="text-red-500 text-sm">
                    {Array.isArray(errors[`skills.${type}.${key}`])
                      ? errors[`skills.${type}.${key}`][0]
                      : errors[`skills.${type}.${key}`]}
                  </div>
                )}
                <label className="block text-sm font-medium text-[#929897] py-2">{label}</label>

                {/* Xử lý các loại input */}
                {inputType === 'textarea' ? (
                  <textarea
                    value={skills[type][key] || ''}
                    onChange={(e) => setSkillData(type, key, e.target.value)}
                    className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#d2b990] bg-transparent"
                  />
                ) : inputType === 'file' ? (
                  <>
                    <input
                      type="file"
                      accept={accept}
                      onChange={(e) => setSkillData(type, key, e.target.files[0])}
                      className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#d2b990] bg-transparent"
                    />
                    {/* Hiển thị ảnh đã chọn */}
                    {skills[type][key] && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(skills[type][key])}
                          alt={`${key} preview`}
                          className="w-32 h-32 object-cover"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <input
                    type={inputType}
                    value={skills[type][key] || ''}
                    onChange={(e) => setSkillData(type, key, e.target.value)}
                    className="w-full text-[#cfb68e] px-4 border-b-2 border-gray-300 focus:outline-none focus:border-[#d2b990] bg-transparent"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsForm
