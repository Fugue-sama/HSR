import { router, useForm, usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import ImgForm from "./ImgForm"
import TypeForm from "./TypeForm"
import { route } from "ziggy-js"
import { getImage } from "../../../../../Utils/getImagePath"
import Hashids from "hashids"

export default function RelicOrnamentForm({ formType = 'relic', initialSuitKeys, submitRoute, model,  method: submitMethod = 'post' }) {
  const hashid = new Hashids('salt', 8)
  console.log(usePage().props)
  const [processing, setProcessing] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)
  const typeRef = useRef()
  const suitLabelMap = {
    Head: "Nón",
    Hands: "Găng tay",
    Body: "Áo",
    Feet: "Giày",
    PS: "Cầu",
    LR: "Dây",
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (typeRef.current && !typeRef.current.contains(e.target)) {
        setTypeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const orginalSuit = model ? JSON.parse(model?.suit) : {}

  const { data, setData, post, errors } = useForm({
    name: model?.name || '',
    image: model?.image || null,
    set_two: model?.set_two || '',
    set_four: model?.set_four || '',
    suit: model
      ? orginalSuit
      : Object.fromEntries(initialSuitKeys.map(k => [k, ''])),
    type: model?.type ? JSON.parse(model.type) : [],
  })
  const handleSubmit = (e) => {
    setProcessing(!processing)
    e.preventDefault()
    const cleanedData = { ...data }

    if (typeof cleanedData.image === 'string') {
      cleanedData.image = null
    }

    initialSuitKeys.forEach((key) => {
      if (typeof cleanedData.suit[key] === 'string') {
        cleanedData.suit[key] = null
      }
    })

    const formData = {
      ...cleanedData,
      _method: 'PUT',
    }
    if (submitMethod === 'put') {
      router.post(route(submitRoute, hashid.encode(model.id)), formData, {
        forceFormData: true,
        onFinish: () => setProcessing(!processing),
      })
    } else {
      post(route(submitRoute), cleanedData, { forceFormData: true })
    }
  }
  
  const toggleSelection = (field, value) => {
    setData((prevData) => {
        if (value === 'none') {
            return {
                ...prevData,
                [field]: [], // Khi chọn 'none'-> giữ mảng rỗng
            }
        }
        // Tiếp tục xử lý như bình thường cho các giá trị khác
        return {
            ...prevData,
            [field]: prevData[field].includes(value)
                ? prevData[field].filter((item) => item !== value)
                : [...prevData[field], value],
        }
    })
}

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {[
        { key: 'name', label: 'Tên' },
        { key: 'set_two', label: 'Hiệu ứng (2 món)' },
      ].concat(formType === 'relic' ? [{ key: 'set_four', label: 'Hiệu ứng (4 món)' }] : []).map(({ key, label }) => (
        <div key={key} className="flex flex-col">
          <label className="text-[#d4b990]">{label}</label>
          <input
            rows={key === 'name' ? 1 : 3}
            className="w-full text-[#cfb68e] bg-transparent border-b-2 focus:outline-none cursor-pointer"
            value={data[key]}
            onChange={(e) => setData(key, e.target.value)}
          />
          {errors[key] && (
            <div className="text-red-500 text-sm">{errors[key]}</div>
          )}
        </div>
      ))}

      {initialSuitKeys.map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-[#d4b990] mb-1">
            {suitLabelMap[key] || key}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0]
              if (file) {
                setData("suit", { ...data.suit, [key]: file })
              }
            }}
            className="text-[#cfb68e] bg-transparent border-b-2 focus:outline-none file:text-[#cfb68e] cursor-pointer"
          />
          {data.suit[key] && (() => {
            return (
              <img
                src={
                  data.suit[key] instanceof File
                    ? URL.createObjectURL(data.suit[key])
                    : getImage(data.suit[key])
                }
                alt={`Preview ${key}`}
                className="relative max-h-20 object-contain w-fit rounded mt-2"
              />
            )
          })()}
          {errors[`suit.${key}`] && (
            <div className="text-red-500 text-sm">{errors[`suit.${key}`]}</div>
          )}
        </div>
      ))}

      <ImgForm orginalImg={data?.image} setData={setData} errors={errors} />

      <TypeForm
        typeRef={typeRef}
        typeOpen={typeOpen}
        setTypeOpen={setTypeOpen}
        data={data}
        errors={errors}
        toggleSelection={toggleSelection}
      />

      <div className="md:col-span-2 flex justify-center">
        <button
          type="submit"
          disabled={processing}
          className="w-full bg-[#121212] text-[#959a9c] hover:text-[#d4b990] py-2 rounded-md cursor-pointer"
        >
          {processing ? 'Đang xử lý...' : `${submitMethod  == 'put' ? 'Cập nhật' : 'Tạo'} ${formType === 'relic' ? 'Di Vật' : 'Trang Sức'}`}
        </button>
      </div>
    </form>
  )
}
