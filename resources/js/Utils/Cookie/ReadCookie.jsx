export const ReadCookie = (keyword = '') => {
  const name = `${keyword}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      const value = c.substring(name.length)
      try {
        return JSON.parse(value)
      } catch (err) {
        return null
      }
    }
  }
  return null
}