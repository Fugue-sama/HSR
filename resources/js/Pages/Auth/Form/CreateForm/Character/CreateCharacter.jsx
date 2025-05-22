import { Head, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import '~css/login-register-form.css'
import ImgForm from '../Components/ImgForm'
import PathForm from '../Components/PathForm'
import ElementForm from '../Components/ElementForm'
import OrnamentForm from '../Components/OrnamentForm'
import RelicForm from '../Components/RelicForm'
import LightcoreForm from '../Components/LCForm'
import SkillsForm from './SkillsForm'
import StatsForm from './StatsForm'
import SoulsForm from './SoulsForm'
import DescriptionForm from './DescriptionForm'
import ButtonBack from '../../../../../Components/C-Button/ButtonBack'

const BASIC_FIELDS = [
  { label: 'Tên', key: 'name', type: 'text' },
  { label: 'Phe', key: 'faction', type: 'text' },
  { label: 'Nhân vật', key: 'rarity', type: 'select', options: [4, 5], format: (val) => val === 4 ? 'Thường' : 'Giới hạn' },
  { label: 'Lối chơi', key: 'gameplay', type: 'text' },
]


export default function CreateCharacter({ paths, elements, relics, ornaments, lightcores }) {

  const [imagePreview, setImagePreview] = useState('')
  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    setData('background', file)

    // Tạo preview cho ảnh nền
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }


  const { data, setData, post, processing, errors } = useForm({
    name: '',
    image: null,
    background: null,
    faction: '',
    rarity: '',
    gameplay: '',
    skills: {
        basis: { name: '', image: null, desc: '', gif: null, type: 'Đánh thường' }, // image và gif là File objects
        skill: { name: '', image: null, desc: '', gif: null, type: 'Chiến kỹ' },
        ultimate: { name: '', image: null, desc: '', gif: null, type: 'Tuyệt kỹ' },
        talent: { name: '', image: null, desc: '', gif: null, type: 'Thiên Phú' },
        technique: { name: '', image: null, desc: '', gif: null, type: 'Bí kỹ' },
    },
    path_id: '',
    desc: '',
    stats: { hp: '', attack: '', defend: '', speed: '', taunt: '' },
    souls: Array(6).fill().map(() => ({ image: null, name: '', desc: '' })), // image là File object
    element_id: null,
    ornaments: [],
    relics: [],
    lightcores: [],
  })
  // Hàm cập nhật skills trực tiếp vào data của useForm
  const setSkillData = (type, key, value) => {
    setData(prevData => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        [type]: {
          ...prevData.skills[type],
          [key]: value,
        },
      },
    }))
  }

  const [stats, setStats] = useState({
    hp: '', attack: '', defend: '', speed: '', taunt: ''
  })

  const [souls, setSouls] = useState(
    Array(6).fill().map(() => ({ image: '', name: '', desc: '' }))
  )
  const [dropdowns, setDropdowns] = useState({
    path: false,
    element: false,
    ornament: false,
    relic: false,
    lightcore: false,
  })

  const refs = {
    path: useRef(),
    element: useRef(),
    ornament: useRef(),
    relic: useRef(),
    lightcore: useRef(),
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      Object.entries(refs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setDropdowns(prev => ({ ...prev, [key]: false }))
        }
      })
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSelection = (field, value) => {
    setData(field, value === 'none' ? [] : 
      data[field].includes(value) 
        ? data[field].filter(item => item !== value)
        : [...data[field], value]
    )
  }

  useEffect(() => {
      setData(prevData => ({ ...prevData, skills: data.skills }))
  }, [data.skills, setData])

  useEffect(() => {
      setData(prevData => ({ ...prevData, stats: stats }))
  }, [stats, setData])

  useEffect(() => {
      setData(prevData => ({ ...prevData, souls: souls }))
  }, [souls, setData])


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    post(route('characters.store'), data, {
        forceFormData: true,
    })
}

  return (
   <>
    <Head title='Create Character' />
    <div className='fixed top-10 z-50 left-0'>
      <ButtonBack />
    </div>
    <div className="form-contain min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="scrollForm backdrop-blur-lg border border-gray-200 shadow-lg rounded-xl p-8 w-[80%] max-h-[95vh] overflow-y-auto overflow-x-hidden bg-[#282828]">
        <h2 className="text-2xl font-bold text-center text-[#d4b990] mb-6">
          Tạo Nhân Vật
        </h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Basic Info */}
          <div className="col-span-full md:col-span-2 space-y-4 border border-gray-700 rounded-md p-10">
            <h3 className="text-lg font-semibold text-[#bda377]">Thông tin cơ bản</h3>
             {/* Render Basic Fields */}
            {BASIC_FIELDS.map(field => (
              <div key={field.key} className="span-2 space-y-2">
                <label className="text-sm font-medium text-[#d4b990]">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={data[field.key] || ''}
                    onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                    className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#d2b990]"
                  >
                    <option value="" disabled>-- Chọn --</option>
                    {field.options.map(option => (
                      <option key={option} value={option}>
                        {field.format ? field.format(option) : option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={data[field.key] || ''}
                    onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                    className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#d2b990]"
                  />
                )}
                {errors && errors[field.key] && (
                  <div className="text-red-500 text-sm">{errors[field.key]}</div>
                )}
              </div>
            ))}
            <div className="span-2 space-y-2">
              <label className="text-sm font-medium text-[#d4b990]">Ảnh nền</label>
              <input
                type="file"
                onChange={handleBackgroundChange}
                className="w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#d2b990]"
              />
              {/* Hiển thị ảnh preview nếu có */}
              {imagePreview && (
                <div className='mt-2'>
                  <img
                    src={imagePreview}
                    alt='Image Preview'
                    className='w-32 h-32 object-cover border border-gray-500 rounded-md'
                  />
                </div>
              )}
              {data.background && <div className="text-red-500 text-sm">{errors.background}</div>}
            </div>
            <ImgForm setData={setData} errors={errors} />
            
            <PathForm
              paths={paths}
              data={data}
              setData={setData}
              errors={errors}
              pathOpen={dropdowns.path}
              setPathOpen={(open) => setDropdowns(prev => ({ ...prev, path: open }))}
              pathRef={refs.path}
            />
            <ElementForm
              elements={elements}
              data={data}
              setData={setData}
              errors={errors}
              elementOpen={dropdowns.element}
              setElementOpen={(open) => setDropdowns(prev => ({ ...prev, element: open }))}
              elementRef={refs.element}
            />
          </div>
          {/* Stats */}
          <StatsForm  stats={stats} setStats={setStats} errors={errors} />
          {/* Skills */}
          <SkillsForm skills={data.skills} setSkillData={setSkillData} errors={errors} />

          {/* Souls */}
          <SoulsForm souls={souls} setSouls={setSouls} errors={errors} />

          {/* Description & Background */}
          <DescriptionForm  data={data} setData={setData} errors={errors} />

          <div className="col-span-full md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-gray-700 p-10 rounded-md">
            <OrnamentForm
              ornaments={ornaments}
              ornamentOpen={dropdowns.ornament}
              setOrnamentOpen={(open) => setDropdowns(prev => ({ ...prev, ornament: open }))}
              data={data}
              setData={setData}
              toggleSelection={toggleSelection}
              errors={errors}
              ornamentRef={refs.ornament}
            />
            <RelicForm
              relics={relics}
              relicOpen={dropdowns.relic}
              setRelicOpen={(open) => setDropdowns(prev => ({ ...prev, relic: open }))}
              data={data}
              setData={setData}
              toggleSelection={toggleSelection}
              errors={errors}
              relicRef={refs.relic}
            />
            <LightcoreForm
              lightcores={lightcores}
              lightcoreOpen={dropdowns.lightcore}
              setLightcoreOpen={(open) => setDropdowns(prev => ({ ...prev, lightcore: open }))}
              data={data}
              setData={setData}
              toggleSelection={toggleSelection}
              errors={errors}
              lightcoreRef={refs.lightcore}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              disabled={processing}
              className="w-full select-none cursor-pointer bg-[#121212] text-[#959a9c] hover:text-[#d4b990] py-2 rounded-md hover:bg-[#78787852] transition duration-200"
            >
              {processing ? 'Đang xử lý...' : 'Tạo nhân vật'}
            </button>
          </div>
        </form>
      </div>
    </div>
   </>
  )
}