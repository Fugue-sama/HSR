import { Head, usePage } from "@inertiajs/react"
import NavbarWiki from "../Navbar/NavbarWiki"

function AdminLayout({ title, children }) {

  const navigation = [
    { name: "Nón Ánh Sáng", href: "/adm/lightcores", icon: "icon-lightcore.png"},
    { name: "Nhân Vật", href: "/adm.characters", icon: "icon-character.png" },
    { name: "Di Vật", href: "/adm/relics", icon: "icon-relics.png" },
    { name: "Thuộc Tính", href: "/adm.elements", icon: "element.png" },
    { name: "Vận Mệnh", href: "/adm.paths", icon: "path.png" },
    { name: "Trang Chủ", href: "/adm", icon: "home.png" },
  ]
  const { url } = usePage()

  return (
    <>
      <Head title={title} />
      <NavbarWiki navigation={navigation} url={url}/>
      {children}
    </>
  )
}
export default AdminLayout
