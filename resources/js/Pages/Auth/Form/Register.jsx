import { useForm, Link, usePage, router } from '@inertiajs/react'
import '~css/login-register-form.css'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export default function Register() {
    const { sendSuccess, email, googleId, warn, avatar } = usePage().props
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [emailflashMsg, setEmailFlashMsg] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        password:  '',
        password_confirmation: '',
        googleId : '',
        avatar: avatar?? null
    })

    useEffect(() => {
        if (sendSuccess) {
            setIsEmailVerified(true)
            setData('email', email || '')
            setData('googleId', googleId || '')
            setEmailFlashMsg(sendSuccess)
        }
        else {
            setData('email', email || '')
            setEmailFlashMsg(warn)
        }
    }, [sendSuccess, warn])

    const handleEmailVerification = () => {
        setIsProcessing(true)
        router.post('/send-verification', { email: data.email}, {
            onSuccess: () => {
                setEmailFlashMsg('Đã gửi email xác thực!')
                setIsEmailVerified(false)
            },
            onError: () => {
                setEmailFlashMsg('Có lỗi xảy ra khi gửi email.')
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault() 

        let validators = {}
    
        if (!data.name) {
            validators.name = 'Tên đăng nhập là bắt buộc.'
        }
    
        if (!data.password || data.password.length < 6) {
            validators.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
        }
    
        if (data.password !== data.password_confirmation) {
            validators.password_confirmation = 'Mật khẩu và xác nhận mật khẩu không khớp.'
        }
    
        if (!isEmailVerified && !data.email) {
            validators.email = 'Email là bắt buộc.'
        } else if (!isEmailVerified && data.email && !/\S+@\S+\.\S+/.test(data.email)) {
            validators.email = 'Email không đúng định dạng.'
        }
    
        setData(prevData => ({
            ...prevData,
            errors: validators,
        }))
    
        if (Object.keys(validators).length > 0) {
            return
        }
    
        post('/register', {
            onSuccess: () => {
                reset()
            }
        });
    }

    const handleEmailChange = (e) => {
        setData('email', e.target.value)
    }

    return (
        <div className='form-contain min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4'>
            <div className='detail-form bg-white/10 backdrop-blur-lg border border-gray-200 shadow-lg rounded-xl p-8 w-full max-w-lg'>
                <h2 className='text-2xl font-bold text-center text-[#d4b990] mb-6'>
                    Đăng ký
                </h2>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Email */}
                    <div className={data.email ? 'select-none opacity-50' : ''}>
                        <label htmlFor='email' className='block text-sm font-medium text-[#d4b990]'>Email</label>
                        <input
                            type='email'
                            id='email'
                            value={data.email}
                            onChange={handleEmailChange}
                            onClick={() => {
                                if (isEmailVerified) {
                                    alert("Email đã xác thực. Vui lòng refresh nếu bạn muốn thay đổi.")
                                }
                            }}
                            readOnly={isEmailVerified}
                            className='mt-1 w-full text-[#cfb68e] px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d2b990] focus:outline-none'
                            required
                            placeholder='example@domain.com'
                        />
                    </div>
                    {/* Verify Email Button */}
                    {!emailflashMsg && data.email && !isEmailVerified ? (
                        <>
                            <button
                                type="button"
                                onClick={handleEmailVerification}
                                className='text-[#f2a88d] mt-1 text-sm text-center inline-block w-full hover:underline cursor-pointer'
                            >
                                Nhấp vào để xác thực gmail
                            </button>

                            {/* Hiển thị spinner khi đang xử lý */}
                            {isProcessing && (
                                <div className="flex justify-center mt-4">
                                    <div className="w-6 h-6 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-gray-500 text-sm">{emailflashMsg}</div>
                    )}
                    {data.email && 
                (
                <>
                    {/* Name */}
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-[#d4b990]'>Tên Đăng Nhập</label>
                        <input
                            type='text'
                            id='name'
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className='mt-1 w-full text-[#cfb68e] px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d2b990] focus:outline-none'
                            required
                            placeholder='HsrFandom'
                        />
                    {data.errors?.name && <div className='text-red-500 text-sm'>{data.errors?.name}</div>}
                    </div>


                    {/* Password */}
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-[#d4b990]'>Mật khẩu</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                value={data.password}
                                onChange={(e) => {
                                    setData('password', e.target.value);
                                    setData(prevData => ({ ...prevData, errors: {} })); // Clear errors on password change
                                }}
                                className='mt-1 w-full text-[#cfb68e] px-4 py-2 pr-10 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d2b990] focus:outline-none'
                                required
                                placeholder='••••••••'
                            />
                            <div
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeIcon className='h-5 w-5 text-[#d4b990]' />
                                ) : (
                                    <EyeSlashIcon className='h-5 w-5 text-[#d4b990]' />
                                )}
                            </div>
                        </div>
                        {data.errors?.password && <div className='text-red-500 text-sm'>{data.errors.password}</div>}
                    </div>


                    {/* Confirm Password */}
                    <div>
                        <label htmlFor='password_confirmation' className='block text-sm font-medium text-[#d4b990]'>Xác nhận mật khẩu</label>
                        <input
                            type='password'
                            id='password_confirmation'
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className='mt-1 w-full text-[#cfb68e] px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#d2b990] focus:outline-none'
                            required
                            placeholder='••••••••'
                        />
                    {data.errors?.password_confirmation && <div className='text-red-500 text-sm'>{data.errors.password_confirmation}</div>}
                </div>
                    
                    {/* Submit */}
                    <button
                        type='submit'
                        disabled={processing}
                        className='w-full select-none cursor-pointer bg-[#121212] text-[#959a9c] hover:text-[#d4b990] py-2 rounded-md hover:bg-[#78787852] transition duration-200'
                    >
                         {processing ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>

                </>
                )}
                    
                    <p className='mt-4 text-center text-sm text-[#959a9c] select-none'>
                        Đã có tài khoản?{' '}
                        <Link href='/login' className='text-[#d4b990] hover:underline px-2'>
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
