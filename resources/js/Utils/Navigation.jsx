import { useReports } from "./ReportLength"


export const getNavigationByRole = (role) => {
  const reports = useReports()
  const isAdmin = role === 'admin' || role === 'admin.super'
  const prefix = isAdmin ? '/adm' : ''
  const unreadCount = reports.filter(report => report.is_read === 0).length
  const navigation = [
    { name: 'Nón Ánh Sáng', href: `${prefix}/lightcores`, icon: 'icon-lightcore.png' },
    { name: 'Nhân Vật', href: `${prefix}/characters`, icon: 'icon-character.png' },
    { name: 'Di Vật', href: `${prefix}/relics`, icon: 'icon-relics.png' },
    { name: 'Thuộc Tính', href: `${prefix}/elements`, icon: 'element.png' },
    { name: 'Vận Mệnh', href: `${prefix}/paths`, icon: 'path.png' },
    { name: 'Trang Chủ', href: prefix || '/', icon: 'home.png' },
  ]

  if (isAdmin) {
    navigation.unshift(
      { name: 'Thông báo', href: `${prefix}/reports`, icon: 'notify.png',  notifyCount: unreadCount },
      { name: 'Thêm', href: '#add', icon: 'add.png', action: 'add' },
      { name: 'Xóa', href: `${prefix}/lightcores/delete`, icon: 'delete.png' }
    )
  }

  return navigation
}
