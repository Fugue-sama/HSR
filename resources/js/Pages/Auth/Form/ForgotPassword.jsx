import { useForm, usePage } from "@inertiajs/react"
import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

export default function ForgotPassword() {
  console.log(usePage().props)
  const [step, setStep] = useState(1)
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    otp: '',
    password: '',
    password_confirmation: '',
  })

  const handleSendOTP = (e) => {
    e.preventDefault()
    post(route('forgot.password.send'), {
      onSuccess: () => setStep(2),
    })
  }
  const handleResetPassword = (e) => {
    if (!data.password || data.password.length < 6) {
      validators.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
    }

    if (data.password !== data.password_confirmation) {
        validators.password_confirmation = 'Mật khẩu và xác nhận mật khẩu không khớp.'
    }
    setData(prevData => ({
      ...prevData, errors : validators
    }))
    if(Object.keys(validators).length > 0) return

    e.preventDefault()
    post(route('password.reset'))
  }

  return (
    <div className='form-contain min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4'>
      <div className='detail-form bg-white/10 backdrop-blur-lg border border-gray-200 shadow-lg rounded-xl p-8 w-full max-w-lg'>
        <h2 className='text-2xl font-bold text-center text-[#d4b990] mb-6'>Đặt lại mật khẩu</h2>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-[#d1b790]">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                className="w-full px-4 py-2 text-[#898f9c] border border-[#c8af8c] rounded-md focus:ring focus:ring-[#d1b890]"
                placeholder="Nhập Email để gửi mã OTP"
              />
              {errors.email && <div className="text-sm text-red-500 mt-1">{errors.email}</div>}
            </div>
            <button
              type="submit"
              disabled={processing}
              className="w-full select-none cursor-pointer bg-[#121212] text-[#959a9c] hover:text-[#d4b990] py-2 rounded-md hover:bg-[#78787852] transition duration-200"
            >
              {processing ? 'Đang gửi...' : 'Gửi mã OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4 text-[#808490]">
            <div>
              <label className="block mb-1 text-sm font-extrabold ">Mã OTP</label>
              <input
                type="text"
                value={data.otp}
                onChange={e => setData('otp', e.target.value)}
                className="w-full px-4 py-2 border text-[#d5bc90] rounded-md focus:ring focus:ring-yellow-200"
              />
              {errors.otp && <div className="text-sm text-red-500 mt-1 ">{errors.otp}</div>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-extrabold ">Mật khẩu mới</label>
              <input
                type="password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                className="w-full px-4 py-2 border text-[#d5bc90] rounded-md focus:ring focus:ring-yellow-200"
              />
                <div
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className='select-none h-5 w-5 text-[#d4b990]' />
                ) : (
                  <EyeSlashIcon className='h-5 w-5 text-[#d4b990]' />
                )}
              </div>
              {data.errors.password && <div className="text-sm text-red-500 mt-1">{data.errors.password}</div>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-extrabold">Xác nhận mật khẩu</label>
              <input
                type="password"
                value={data.password_confirmation}
                onChange={e => setData('password_confirmation', e.target.value)}
                className="w-full px-4 py-2 border text-[#d5bc90] rounded-md focus:ring focus:ring-yellow-200"
              />
              <div
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className='select-none h-5 w-5 text-[#d4b990]' />
                ) : (
                  <EyeSlashIcon className='h-5 w-5 text-[#d4b990]' />
                )}
              </div>
              {data.errors.password_confirmation && <div className="text-sm text-red-500 mt-1">{data.errors.password_confirmation}</div>}

            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full select-none cursor-pointer bg-[#121212] text-[#959a9c] hover:text-[#d4b990] py-2 rounded-md hover:bg-[#78787852] transition duration-200"
            >
              {processing ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
