import { router } from "@inertiajs/react"
import { createContext, useContext, useEffect, useState } from "react"

const navigationContext = createContext()

export function NavigationProvider({children}) {
  const [isNavigating,setIsNavigating] = useState(false)

  useEffect(()=> {
    const onStart =  () => setIsNavigating(true)
    const onFinish =  () => setIsNavigating(false)

    router.on('start', onStart)
    router.on('finish', onFinish)

    return () => {
      router.off('start', onStart)
      router.off('finish', onFinish)
    }
  }, [])
  return (
    <navigationContext.Provider value={{isNavigating}}>
      {children}
    </navigationContext.Provider>
  )
} 

export function useNavigation() {
  return useContext(navigationContext)
}