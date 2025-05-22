export const SaveCookie = (newFilter, keyword = '') => {
  const cookieKey = `${keyword}`

  // Chỉ lưu 1 bản ghi duy nhất
  const latest = [{ data: newFilter, time: Date.now() }]
  document.cookie = `${cookieKey}=${encodeURIComponent(JSON.stringify(latest))}; path=/; max-age=86400`
}
