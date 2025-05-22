import "~css/Elements_Paths_Admin.css"

import WikiLayout from "../../Layouts/WikiLayout"

import AdminElementsCard from "../../Pages/Auth/Admin/ElementsCard"
import UserElementsCard  from "../../Pages/Auth/User/ElementsCard"

import AdminPathsCard from "../../Pages/Auth/Admin/PathsCard"

import { motion } from "framer-motion"
import { usePage } from "@inertiajs/react"


function Layout({ paths, elements }) {
    const { auth } = usePage().props
    console.log(paths)

  const data = paths ?? elements

  const CardComponent = paths ? AdminPathsCard : (auth.user ? AdminElementsCard : UserElementsCard)
    return (
        <WikiLayout title="Characters">
            <div className="layoutBG relative w-full h-screen overflow-x-hidden flex justify-center">
                <div className="fit absolute w-full h-fit flex justify-center">
                    <div className="py-10 flex justify-start flex-col w-[80%]  items-center h-full relativec">
                        <div className=" w-full px-10 h-fit">
                            <div className="translate-x-[15%] py-10 relative flex gap-15 flex-wrap h-fit w-full">
                            {data.map((data, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                                >
                                    <CardComponent data={data} idx={idx} />
                                </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WikiLayout>
    )
}

export default Layout
