import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

function Type({ isOpen, setIsOpen, checkedItems, setCheckedItems, countOption, setCountOption, handleAccept }) {
  const options = [
      "Tấn Công",
      "Phòng Thủ",
      "HP",
      "Tốc Độ",
      "Tỷ Lệ Bạo Kích",
      "Khiên",
      "Trị Liệu",
      "Tấn Công Thường, Chiến Kỹ, Tuyệt Kỹ",
      "Đòn Đánh Theo Sau",
      "Sát Thương Bạo Kích",
      "Chính Xác Hiệu Ứng",
      "Bỏ Qua Phòng Thủ",
      "Tấn Công Kích Phá",
      "Điểm Chiến Kỹ",
      "Năng Lượng",
      "Hiệu Suất Hồi Năng Lượng",
      "Ưu Tiên Hành Động",
      "Giảm Sát Thương Phải Chịu",
      "Sát Thương Thuộc Tính",
      "Lượng Trị Liệu",
      "Sát thương phe ta tăng",
      "Kháng Hiệu Ứng",
      "giảm Phòng Thủ",
  ]

  const handleCheckboxChange = (option) => {
    setCheckedItems(prev => { 
      const update = {...prev, [option]: !prev[option] }
      setCountOption(Object.values(update).filter(Boolean).length)
      return update
      })
  }
  const handleResetOption = () => {
    setCheckedItems({})
    setCountOption(0)    
  }

  const selectedOptions = Object.keys(checkedItems).filter(key => checkedItems[key])

  return (
    <>
    <div className="border-[rgba(219,194,145,0.9)] w-[15rem]">
            <div className="relative" tabIndex={0}>
              <div
                className={`trigger ${isOpen ? 'opening' : 'text-[#ffffff73] border-[#ffffff14]'}`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-[1.1rem] whitespace-nowrap overflow-hidden text-ellipsis block">
                  {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Loại Kỹ Năng'}
                </span>                
                <div className='flex items-center gap-1'>
                  {countOption > 0 && (
                    <span>{`(${countOption})`}</span>
                  )}
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#d4bf92]' : ''}`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeIn" }}
                    className="absolute w-full bg-[#121212] top-full rounded shadow-lg overflow-hidden"
                  >
                    <div className="listt-toggle max-h-[18rem]">
                      {options.map(option => (
                        <div key={option} className="option-item rounded-[8px]">
                          <label className="flex justify-between items-center gap-2 cursor-pointer select-none">
                            <span className={checkedItems[option] ? 'text-[#d4bf92]' : ''}>{option}</span>
                            <span className="relative inline-block">
                              <input
                                type="checkbox"
                                checked={!!checkedItems[option]}
                                onChange={() => handleCheckboxChange(option)}
                                className="peer appearance-none w-5 h-5 border-2 border-gray-500 rounded-md checked:border-[#d4bf92] transition-all flex items-center"
                              />
                              <CheckIcon className="absolute inset-0 m-auto w-4 h-4 text-transparent peer-checked:text-[#d4bf92] transition-colors" />
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-white text-sm px-4 py-2 border-t border-gray-700">
                      <button className="btn border rounded-[2rem] px-4 py-1 text-[#ffffff99]" onClick={()=> handleResetOption()}>Đặt lại</button>
                      <button className="btn border rounded-[2rem] px-4 py-1 text-[#d4bf92]" onClick={()=> handleAccept()}>Đồng ý</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
    </>
  )
}

export default Type