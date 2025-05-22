import React, {  useMemo} from "react"
import "~css/relics.css"
import NavbarWiki from "../Components/Navbar/NavbarWiki"
import { Head, usePage } from "@inertiajs/react"
import { getNavigationByRole } from "../Utils/Navigation"


function WikiLayout({ title, children}) {
    const { auth } = usePage().props
    const role = auth.user?.role ?? null

    const navigation = getNavigationByRole(role)
    return (
        <div >
        <Head title={title} />
            <NavbarWiki navigation={navigation}/>
            {children}
        </div>
    )
}

export default WikiLayout
