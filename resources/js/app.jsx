import './bootstrap'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from '~/Layouts/Layout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const el = document.getElementById('app')
createInertiaApp({
  title: title => title ? `${title} - HSR` : 'HSR',

  resolve: async (name) => {
    const pages = import.meta.glob([
      './Pages/**/*.jsx',
      './Components/**/*.jsx',
    ])
  
    const customPaths = {
      // Trang chính & Auth
      AuthForm: './Pages/Auth/AuthForm.jsx',
      Profile: './Components/C-UserProfile/UserProfile.jsx',
      
      // Lightcores
      Lightcores: './Components/C-Lightcores/Lightcores.jsx',
      LightcoreDetail: './Pages/Auth/User/Lightcores/LightcoreDetail/LightcoreDetail.jsx',
      LightcoreCreate: './Pages/Auth/Form/CreateForm/Lightcore/LightcoreForm.jsx',
      LightcoreEdit: './Pages/Auth/Form/CreateForm/Lightcore/EditLightcore.jsx',

    
      // Characters
      Characters: './Components/C-Characters/Characters.jsx',
      CharacterDetail: './Pages/Auth/User/Characters/Character/Detail/Detail.jsx',
      CreateCharacter: './Pages/Auth/Form/CreateForm/Character/CreateCharacter.jsx',
    
      // Relics
      Relics: './Components/C-Relics/Relics.jsx',
      RelicDetail: './Pages/Auth/User/Relics/Detail/RelicsDetail.jsx',
      OrnamentCreate: './Pages/Auth/Form/CreateForm/RelicOrnamentForm/CreateOrnament.jsx',
      OrnamentEdit: './Pages/Auth/Form/CreateForm/RelicOrnamentForm/EditOrnament.jsx',
      RelicCreate: './Pages/Auth/Form/CreateForm/RelicOrnamentForm/CreateRelic.jsx',
      RelicEdit: './Pages/Auth/Form/CreateForm/RelicOrnamentForm/EditRelic.jsx',

      // Elements & Paths (chung Layout)
      Elements: './Components/C-Elements-Paths/Layout.jsx',
      Paths: './Pages/Auth/User/Paths.jsx',
      PathsAdmin: './Components/C-Elements-Paths/Layout.jsx',
      ElementCreate: './Pages/Auth/Form/CreateForm/ElementForm.jsx',
      PathCreate: './Pages/Auth/Form/CreateForm/Path/PathForm.jsx',

      // report 
      AdminReports: './Pages/Auth/Admin/AdminReports.jsx'
    }
    
    
    const path =
      customPaths[name] ||
      `./Pages/${name}.jsx` ||
      `./Components/${name}/${name}.jsx`
  
    const pageImport =
      pages[path] ||
      pages[`./Pages/${name.split('/')[0]}/${name.split('/')[0]}.jsx`] ||
      pages[`./Components/${name}/${name}.jsx`]
  
    if (!pageImport) {
      throw new Error(`Page "${name}" not found in globbed paths.`)
    }
  
    const page = await pageImport()
  
    // Gắn layout mặc định nếu chưa có
    page.default.layout = page.default.layout || ((page) => <Layout>{page}</Layout>)
    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>
        <>
          <App {...props} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      </GoogleOAuthProvider>
    )
  },

  progress: false
})
