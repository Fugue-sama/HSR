import React, { useState, useMemo } from "react"
import { getImage, getImageWiki } from "../../../Utils/getImagePath"
import { router } from "@inertiajs/react"
import { route } from "ziggy-js"
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/solid"
import Hashids from "hashids"
import { SaveCookie } from "../../../Utils/Cookie/SaveCookie"

const hashid = new Hashids("salt", 8)

function CharacterFilter({ auth, elements, paths }) {
    const [filters, setFilters] = useState({ p: {}, e: {}, r: {} })

    const handleFilterChange = (type, value, rawName = "") => {
        const name = rawName.replace(/<[^>]+>/g, '');
        setFilters((prev) => ({
            ...prev,
            [type]: { ...prev[type], [value]: prev[type]?.[value] ? undefined : { name },
            },
        }))
    }

    const handleSubmit = () => {
        const Filters = {
            p: Object.keys(filters.p).filter((k) => filters.p[k]),
            e: Object.keys(filters.e).filter((k) => filters.e[k]),
            r: Object.keys(filters.r)
                .filter((k) => filters.r[k])
                .map(Number),
        }

        router.get(
            route(auth.user ? "adm.characters.filter" : "characters.filter"),
            { Filters },
            { preserveState: true, replace: true }
        )
        SaveCookie(filters, "filterHis_characters")
        setFilters({ p: {}, e: {}, r: {} })
    }

    const handleReset = () => {
        setFilters({ p: {}, e: {}, r: {} })
        router.get(
            route(auth.user && auth.user.role.includes('admin') ? "adm.characters" : "characters.index"),
        )
    }

    const elementOptions = useMemo(
        () =>
            elements.map((el) => ({
                id: hashid.encode(el.id),
                name: el.name,
                image: getImage(el.image_id),
            })),
        [elements]
    )

    const pathOptions = useMemo(
        () =>
            paths.map((p) => ({
                id: hashid.encode(p.id),
                name: p.name,
                image: getImage(p.image),
            })),
        [paths]
    )

    const options = [
        { name: "Thuộc Tính", type: "e", data: elementOptions },
        { name: "Vận Mệnh", type: "p", data: pathOptions },
        {
            name: "Cấp Bậc",
            type: "r",
            data: [4, 5],
        },
    ]

    return (
        <div className="character-filter relative flex gap-2.5 w-full">
            <div className="options w-[80%] flex flex-col gap-2.5">
                {options.map(({ name, type, data }) => (
                    <div key={name} className="filter-row element h-[50px]">
                        <div className="filter-items flex items-center gap-5 h-full">
                            <p className="text-[#949599] text-[1rem] font-bold w-[20%]">
                                {name}
                            </p>
                            <div className="element-items flex items-center gap-5 h-full">
                                {type === "r"
                                    ? data.map((rarity) => (
                                          <div
                                              key={rarity}
                                              onClick={() =>
                                                  handleFilterChange(
                                                      "r",
                                                      rarity
                                                  )
                                              }
                                              className={`btnFilter type-item p-2 rounded-tr-lg ${
                                                  filters.r[rarity]
                                                      ? "selected"
                                                      : "border-white/8"
                                              }`}
                                          >
                                              {Array(rarity)
                                                  .fill(0)
                                                  .map((_, i) => (
                                                      <img
                                                          key={i}
                                                          src={getImageWiki(
                                                              "level_star.png"
                                                          )}
                                                          alt=""
                                                          className="h-5 w-5 inline"
                                                      />
                                                  ))}
                                          </div>
                                      ))
                                    : data.map((item) => (
                                          <div
                                              key={item.id}
                                              onClick={() =>
                                                  handleFilterChange(
                                                      type,
                                                      item.id,
                                                      item.name
                                                  )
                                              }
                                              className={`btnFilter type-item ${
                                                  filters[type][item.id]
                                                      ? "selected"
                                                      : ""
                                              } h-full rounded-full`}
                                          >
                                              <img
                                                  src={item.image}
                                                  alt={item.name}
                                                  className="h-full"
                                              />
                                          </div>
                                      ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="accept-reset w-[20%] flex justify-center gap-10 flex-col">
                <div
                    className="btnFilter bg-[#0b0b0e] p-3 flex items-center text-[#d2b991] border border-[#d2b991] rounded-[10px] 
                        shadow-[0_4px_4px_0_rgba(210,185,145,0.6)] hover:shadow-[0_6px_20px_rgba(210,185,145,0.8)] transition-all duration-300"
                    onClick={handleSubmit}
                >
                    <CheckIcon className="h-4 w-4 mr-1" />
                    <p>Lọc</p>
                </div>
                <div
                    className="btnFilter bg-[#0b0b0e] p-3 flex items-center text-[#979c96] border border-[#979c96] rounded-[10px]
                            shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-all duration-300"
                    onClick={handleReset}
                >
                    <ArrowPathIcon className="h-4 w-4 mr-1" />
                    <p>Đặt lại</p>
                </div>
            </div>
        </div>
    )
}

export default CharacterFilter
