 import { useEffect, useState } from 'react'
import '~css/login-register-form.css'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { Link, router, usePage } from '@inertiajs/react'
import ButtonBack from '../../../Components/C-Button/ButtonBack'

export default function Login({googleRedirectUrl}) {
  const { flash } = usePage().props
  const [flashMsg, setFlashMsg] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (flash?.error) {
      setFlashMsg(flash.error)
    }
  }, [flash])

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const googleRedirect = googleRedirectUrl 
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)
    router.post('/login', { login, password }, {
      onSuccess: () => {
        setIsProcessing(false)
      },
    })
  }
  
  return (
    <div className='form-contain min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4'>
      <ButtonBack />
      <div className='detail-form bg-white/10 backdrop-blur-lg border border-gray-200 shadow-lg rounded-xl p-8 w-full max-w-lg'>
        <h2 className='text-2xl font-bold text-center text-[#d4b990] mb-6'>Đăng nhập</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-[#d4b990]'>Email hoặc tên đăng nhập</label>
            <input
              type='text'
              id='email'
              name='login'
              className='mt-1 w-full text-[#cfb68e] px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d2b990] focus:outline-none'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              placeholder='example@domain.com'
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-[#d4b990]'>Mật khẩu</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='mt-1 w-full text-[#cfb68e] px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d2b990] focus:outline-none'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='••••••••'
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
            </div>
            
          </div>
          <div>
            <Link href='' className='hover:underline hover:text-[#d1b790] text-[#a7abb8] my-2'>Quên mật khẩu</Link>
          </div>
          <button
            type='submit'
            className='w-full select-none cursor-pointer bg-[#121212] text-[#959a9c] hover:text-[#d4b990] py-2 rounded-md hover:bg-[#78787852] transition duration-200'
          >
            {isProcessing ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
          {flash.error && (
              <div className='text-red-500 text-center text-sm mt-2'>
                {flash.error}
              </div>
          )}
        </form>
      
        <div className='mt-10 mb-10'>
          <p className='text-center text-sm text-[#959a9c] select-none'>Hoặc đăng nhập bằng Google</p>
          <div className='flex justify-center mt-2'>
            <a href={googleRedirect}
              className='flex items-center gap-2 px-4 py-2 text-[#d7bb93] border-[#d7bb93] rounded-2xl cursor-pointer border transition duration-200'
            >
              <svg width='32px' height='32px' viewBox='0 0 32.00 32.00' data-name='Layer 1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' fill='#ffffff' stroke='#ffffff'><g id='SVGRepo_bgCarrier' strokeWidth='0'></g><g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' stroke='#3c4355' strokeWidth='0.128'></g><g id='SVGRepo_iconCarrier'><path d='M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16' fill='#cbb38d'></path><path d='M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16' fill='#cbb38d'></path><path d='M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z' fill='#cbb38d'></path><polygon fill='#cbb38d' points='8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374'></polygon><path d='M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z' fill='#cbb38d'></path><polygon fill='#cbb38d' points='8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626'></polygon><path d='M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z' fill='#cbb38d'></path></g></svg>
              <span className='text-sm font-medium'>Đăng nhập với Google</span>
            </a>
          </div>
        </div>

        <p className='mt-4 text-center text-sm text-[#959a9c] select-none'>
          Chưa có tài khoản? <Link href='/register' className='text-[#d4b990] hover:underline px-2'>Đăng ký</Link>
        </p>
      </div>
    </div>
  )
}
