import React, { useState } from 'react'
import { getImage } from '../../../../../Utils/getImagePath';

function ImgForm({orginalImg, setData, errors}) {
    const [imagePreview, setImagePreview] = useState(orginalImg ?? null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file))
        } else {
            setImagePreview(null)
        }
    }

  return (
    <div  title='Trường hợp chỉnh sửa ảnh thì chỉ cần upload ảnh mới'>
    <label className='block text-sm font-medium text-[#d4b990]'>
        Hình ảnh
    </label>
    <input
        type='file'
        onChange={handleImageChange}
        accept="image/*"
        className='mt-1 w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#d2b990] bg-transparent text-[#cfb68e]'
    />
        {imagePreview && (
            <div className='mt-2'>
                <img
                    src={imagePreview.startsWith('blob:') ? imagePreview : getImage(imagePreview) }
                    alt='Image Preview'
                    className='w-32 h-32 object-cover border border-gray-500 rounded-md'
                />
            </div>
        )}
    {errors.image && (
        <div className='text-red-500 text-sm mt-1'>
            {errors.image}
        </div>
    )}
</div>
  )
}

export default ImgForm