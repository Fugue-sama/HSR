import { Head } from '@inertiajs/react'
import ButtonBack from '../../../../../Components/C-Button/ButtonBack'
import RelicOrnamentForm from "../Components/RelicOrnamentForm"
import '~css/login-register-form.css'

export default function CreateRelic() {
  
  return (
    <>
      <Head title="Chỉnh sửa Di Vật" />
      <div className="fixed top-10 z-50 left-0 focus:">
        <ButtonBack />
      </div>
      <div className="form-contain min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
        <div className="scrollForm backdrop-blur-lg border border-gray-200 shadow-lg rounded-xl p-8 w-[60%] max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[#282828]">
          <h2 className="text-2xl font-bold text-center text-[#d4b990] mb-6">
            Chỉnh sửa Di Vật
          </h2>
          <RelicOrnamentForm
            formType="relic"
            submitRoute="adm.relics.store"
            initialSuitKeys={['Head', 'Hands', 'Body', 'Feet']}
          />
        </div>
      </div>
    </>
  )
}

