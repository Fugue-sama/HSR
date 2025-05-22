import { Head } from '@inertiajs/react'
import ButtonBack from '../../../../../Components/C-Button/ButtonBack'
import RelicOrnamentForm from '../Components/RelicOrnamentForm'
import '~css/login-register-form.css'

export default function CreateOrnament() {
  return (
    <>
      <Head title="Tạo Trang Sức" />
      <div className="fixed top-10 z-50 left-0 focus:">
        <ButtonBack />
      </div>
      <div className="form-contain min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
        <div className="scrollForm backdrop-blur-lg border border-gray-200 shadow-lg rounded-xl p-8 w-[60%] max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[#282828]">
          <h2 className="text-2xl font-bold text-[#d4b990] mb-6 text-center">
            Tạo Trang Sức (Ornament)
          </h2>
          <RelicOrnamentForm
            formType="ornament"
            submitRoute="adm.ornament.store"
            initialSuitKeys={['PS', 'LR']}
          />
        </div>
      </div>
    </>
  )
}
