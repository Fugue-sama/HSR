import React, { useState } from 'react'
import parse from 'html-react-parser'
import Skills from './skills'
import Souls from './Souls'
import { AnimatePresence, motion } from 'framer-motion'
import Build from './Build'

function Info({ character }) {
  const [activeTab, setActiveTab] = useState('skills')
  const skills = JSON.parse(character.skills)
  const souls = JSON.parse(character.souls)

  return (
    <div className="info mb-2 p-10">
      <div className="title-info">Thông tin cơ bản</div>

      <section className="box-info basis">
        <div className="container-basic whitespace-normal ">
          <div className="container-info p-3 flex justify-between gap-20">
            <div className="info-left">
              <div className="name-row">
                <div className="lable">Tên</div>
                <div className="info-content">{character.name}</div>
              </div>
              <div className="faction-row">
                <div className="lable">Phe Phái</div>
                <div className="info-content">{character.faction}</div>
              </div>
            </div>

            <div className="info-right">
              <div className="path-row">
                <div className="lable">Vận Mệnh</div>
                <div className="info-content">{character.path.name}</div>
              </div>
              <div className="element-row">
                <div className="lable">Thuộc tính</div>
                <div className="info-content">{parse(character.element.name)}</div>
              </div>
            </div>
          </div>

          <div className="gameplay w-full p-3">
            <div className="row flex justify-between">
              <div className="lable">Đánh Giá Chung</div>
              <div className="info-content">{character.gameplay}</div>
            </div>
          </div>

          <div className="char-description w-full p-3">
            <div className="row flex justify-between">
              <div className="lable">Mô Tả</div>
              <div className="info-content">{parse(character.desc)}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="trace-title mt-10 flex gap-2">
        <p
          className={`skill trace rounded-[5px] px-4 py-1 cursor-pointer transition ${
            activeTab === 'skills' ? 'active bg-white/20' : 'bg-transparent'
          }`}
          onClick={() => setActiveTab('skills')}
        >
          Vết Tích
        </p>
        <p
          className={`souls trace rounded-[5px] px-4 py-1 cursor-pointer transition ${
            activeTab === 'souls' ? 'active bg-white/20' : 'bg-transparent'
          }`}
          onClick={() => setActiveTab('souls')}
        >
          Tinh Hồn
        </p>
        <p
          className={`build trace rounded-[5px] px-4 py-1 cursor-pointer transition ${
            activeTab === 'build' ? 'active bg-white/20' : 'bg-transparent'
          }`}
          onClick={() => setActiveTab('build')}
        >
          Trang Bị
        </p>
      </div>

      <section className="box-info relative h-[600px] p-5 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Skills pathID={character.path.id} skills={skills} />
            </motion.div>
          )}

          {activeTab === 'souls' && (
            <motion.div
              key="souls" 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Souls pathID={character.path.id} souls={souls} />
            </motion.div>
          )}
          {activeTab === 'build' && (
            <motion.div
              key="build"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Build pathID={character.path.id} lightcores={character.lightcores} relics={character.relics} ornaments={character.ornaments} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default Info
