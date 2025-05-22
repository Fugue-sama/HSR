// function saveFilterToCookie(newFilter, keyword = '') {
//   const now = Date.now()
//   const cookieKey = `${keyword}`

//   // Đọc cookie hiện có
//   const cookieValue = document.cookie.replace(
//     new RegExp(`(?:(?:^|.*;\\s*)${cookieKey}\\s*=\\s*([^;]*).*$)|^.*$`),
//     "$1"
//   )

//   const history = JSON.parse(decodeURIComponent(cookieValue || "[]"))
//   console.log(history)
//   // So sánh để loại bỏ bản trùng lặp
//   const filteredHistory = history.filter(entry =>
//     JSON.stringify(entry.data) !== JSON.stringify(newFilter)
//   )
//   console.log(filteredHistory)
//   // Thêm bản ghi mới vào đầu
//   filteredHistory.unshift({ data: newFilter, time: now })

//   // Giới hạn tối đa 10 bản ghi
//   const limitedHistory = filteredHistory.slice(0, 10)

//   // Lưu lại vào cookie
//   document.cookie = `${cookieKey}=${encodeURIComponent(JSON.stringify(limitedHistory))}; path=/; max-age=10`
// }

// export default saveFilterToCookie
