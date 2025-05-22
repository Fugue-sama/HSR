function readFilterCookieValid(keyword = '') {
  const cookieKey = keyword
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${cookieKey}=([^;]*)`)
  )

  if (!match) return []

  try {
    const filterHistory = JSON.parse(decodeURIComponent(match[1]))

    return filterHistory
  } catch (e) {
    return []
  }
}
export default readFilterCookieValid