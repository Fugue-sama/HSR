import { Head, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import '~css/login-register-form.css'
import ImgForm from '../Components/ImgForm'
import PathForm from '../Components/PathForm'
import RollForm from '../Components/RollForm'
import CharForm from '../Components/CharForm'
import ButtonBack from '../../../../../Components/C-Button/ButtonBack'

export default function CreateLightcore({ paths, characters }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        image: null,
        effect: '',
        rarity: '',
        hp: '',
        attack: '',
        defend: '',
        desc: '',
        path_id: '',
        characters: [],
        roll: '',
        subtile: '',
    })
    const [rollOpen, setRollOpen] = useState(false)
    const [typeOpen, setTypeOpen] = useState(false)
    const [charOpen, setCharOpen] = useState(false)
    const [pathOpen, setPathOpen] = useState(false)

    const charRef = useRef()
    const rollRef = useRef()
    const pathRef = useRef()

    useEffect(() => {
        function handleClickOutside(e) {
            if (rollRef.current && !rollRef.current.contains(e.target))
                setRollOpen(false)
            if (charRef.current && !charRef.current.contains(e.target))
                setCharOpen(false)
            if (pathRef.current && !pathRef.current.contains(e.target))
                setPathOpen(false)

        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: data.name,
            effect: data.effect,
            rarity: data.rarity,
            hp: data.hp,
            attack: data.attack,
            defend: data.defend,
            desc: data.desc,
            path_id: data.path_id,
            subtile: data.subtile,
            image: data.image,
            characters: data.characters,
            roll: data.roll,
        }
        post(route('lightcores.store'), formData, {
            forceFormData: true,
            onError: (errors) => {
                console.log(errors); // Nếu có lỗi, sẽ hiển thị trong console
            },
        })
    }

    return (
      <>
        <Head title='Create Lightcore' />
        <div className='fixed top-10 z-50 left-0 focus:'>
            <ButtonBack />
        </div>
        <div className='form-contain min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4'>
            <div className='scrollForm backdrop-blur-lg border border-gray-200 shadow-lg rounded-xl p-8 w-[60%] max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[#282828]'>
                <h2 className='text-2xl font-bold text-center text-[#d4b990] mb-6'>
                    Nón Ánh Sáng
                </h2>
                <form
                    onSubmit={handleSubmit}
                    encType='multipart/form-data'
                    className='grid grid-cols-1 md:grid-cols-2 gap-6'
                >
                    <div className='space-y-4'>
                    {[
                        { label: 'Tên', key: 'name', type: 'text' },
                        { label: 'Hiệu ứng', key: 'effect', type: 'text' },
                        { label: 'Nhân vật', key: 'rarity', type: 'select' },
                        { label: 'Máu', key: 'hp', type: 'number' },
                        { label: 'Tấn công', key: 'attack', type: 'number' },
                        { label: 'Phòng thủ', key: 'defend', type: 'number' },
                        { label: 'Lời tựa', key: 'subtile', type: 'text' }
                    ].map(({ label, key, type }) => (
                        <div key={key}>
                            <label className='block text-sm font-medium text-[#d4b990]'>
                                {label}
                            </label>

                            {key === 'rarity' ? (
                                <select
                                    value={data[key]}
                                    onChange={(e) => setData(key, e.target.value)}
                                    className='mt-1 w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 bg-[#1a1a1a] focus:outline-none focus:border-[#d2b990]'
                                >
                                    <option value='' disabled hidden> -- Chọn --</option>
                                    <option value={4}>Thường</option>
                                    <option value={5}>Giới hạn</option>
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    className='mt-1 w-full text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#d2b990] bg-transparent'
                                    value={data[key]}
                                    onChange={(e) => setData(key, e.target.value)}
                                />
                            )}

                            {errors[key] && (
                                <div className='text-red-500 text-sm mt-1'>
                                    {errors[key]}
                                </div>
                            )}
                        </div>
                    ))}
                       
                    </div>

                    {/* Column 2 */}
                    <div className='space-y-4'>
                        {/* Hình ảnh */}
                        <ImgForm setData={setData} errors={errors } />

                        {/* Vận mệnh */}
                        <PathForm paths={paths} data={data} setData={setData} errors={errors} pathOpen={pathOpen} setPathOpen={setPathOpen} pathRef={pathRef}/>

                        {/* Vòng quay multi-select */}
                        <RollForm rollOpen={rollOpen} setRollOpen={setRollOpen} data={data} setData={setData} errors={errors} rollRef={rollRef} />

                        {/* Nhân vật multi-select */}
                        <CharForm charRef={charRef} data={data} setCharOpen={setCharOpen} charOpen={charOpen} errors={errors} characters={characters} toggleSelection={toggleSelection} />
                         {/* Mô tả */}
                         <div>
                            <label className='block text-sm font-medium text-[#d4b990]'>
                               Mô tả
                            </label>
                            <textarea
                                className='mt-1 w-full h-fit text-[#cfb68e] px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#d2b990] bg-transparent customScroll'
                                value={data.desc}
                                onChange={(e) =>
                                    setData('desc', e.target.value)
                                }
                                rows={10}
                            />
                            {errors.desc && (
                                <div className='text-red-500 text-sm mt-1'>
                                    {errors.desc}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit button full width dưới cùng */}
                    <div className='md:col-span-2'>
                        <button
                            type='submit'
                            disabled={processing}
                            className='w-full select-none cursor-pointer bg-[#121212] text-[#959a9c] hover:text-[#d4b990] py-2 rounded-md hover:bg-[#78787852] transition duration-200'
                        >
                            {processing ? 'Đang xử lý...' : 'Tạo mới'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </>
    )
}
