import { useEffect } from 'react'
import { NavigationProvider } from '../Utils/navigationContext'
import { usePage } from '@inertiajs/react'

function Layout({ children }) {
  const { url } = usePage()
  useEffect(() => {
    const app = document.getElementById('app')
    if (app?.hasAttribute('data-page')) {
      app.removeAttribute('data-page')
    }
  }, [])
  return (
    <NavigationProvider>
      <main className=" relative h-full">
        {children}
      </main>
    </NavigationProvider>
  )
}

export default Layout
