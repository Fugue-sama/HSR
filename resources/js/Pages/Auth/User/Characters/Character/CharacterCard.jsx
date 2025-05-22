import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { route } from 'ziggy-js'
import Hashids from 'hashids'
import { getImage, getImageWiki } from '../../../../../Utils/getImagePath'

function CharacterCard({character, path, element}) {
  const hashid = new Hashids('salt', 8)
  return (
    <motion.div 
    key={character.id} 
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ amount: 0.8 }}
    className="character-card btnFilter">
        <img
            src={getImage(path.image)}
            className="char-bg_card opacity-20"
            alt=""
        />
        <Link href={route('character.detail', hashid.encode(character.id))}
        className="char-card-title relative flex h-[8rem] m-1 outline-none focus:outline-none ring-0 focus:ring-0">
            <div className={`card-main ${character.rarity == 5 ? 'bg-gradient-to-t from-[#a35d55] to-[#d0aa6e]' : 'bg-gradient-to-b from-[#3f4064] to-[#9c65d7]'}`}>
                <img className='scale-[1.8] translate-y-[20px]' src={getImage(character.image)} alt="" />
            </div>

            <div className="char-card-left flex flex-col w-[65%] left-[7.5rem] gap-1 ">
                <div className="char-card-name whitespace-nowrap h-[1.4rem] text-[1.2rem] text-[#b7b195]">
                    {character.name}
                </div>
                <div className="char-card-path my-1 ">
                  <div className="path-info w-full flex justify-start items-center text-[#919d9b]">
                    <img className='relative w-[15%] h-full' src={getImage(path.image)} alt={path.name} />
                    <span className='mx-2'>{path.name}</span>
                  </div>
                </div>

                <div className="rarity-element flex justify-start items-center gap-2">
                  <div className="char-rarity">
                        {Array(character.rarity)
                              .fill(0)
                              .map((_, i) => (
                                <img
                                    key={i}
                                    src={getImageWiki('level_star.png')}
                                    alt=""
                                    className="h-3 w-3 inline"
                                />
                          ))}
                  </div>
                  <div className="char-element px-1">
                    <img className='h-6 w-6 inline' src={getImage(element.image_id)} alt="" />
                  </div>
                </div>
                
            </div>
        </Link>
    </motion.div>
  )
}

export default CharacterCard