import '~css/character.css'
import CharacterFilter from './Character-Filter/CharacterFilter'
import CharacterCardUser from '../../Pages/Auth/User/Characters/Character/CharacterCard'
import CharacterCardAdmin from '../../Pages/Auth/Admin/Characters/Character/CharacterCard'
import WikiLayout from '../../Layouts/WikiLayout'
import { usePage } from '@inertiajs/react'



export default function Characters({ characters, elements, paths }) {
  const { auth } = usePage().props
  return (
    <WikiLayout title='Characters' characters={characters} elements={elements} paths={paths} >
            <div
                className="characters relative w-full h-screen overflow-x-hidden flex justify-center"
            >
                <div className="fit absolute w-full h-fit flex justify-center">
                  <div className="py-10 flex justify-start flex-col w-[80%] translate-x-[15%] items-center h-full relativec">
                      <CharacterFilter auth={auth} paths={paths} elements={elements} />
                        <div className="characters-container w-full px-10 h-fit">
                          <div className="Char-card-container py-10 relative flex gap-5 flex-wrap h-fit w-full">
                            {characters.length !==0 ? (
                                characters.map((character) => {
                                  const path = paths.find(item => item.id == character.path_id);
                                  const element = elements.find(item => item.id == character.element_id);
                                  const CardComponent = auth?.user?.role?.includes('admin') ? CharacterCardAdmin : CharacterCardUser;
                              
                                  return (
                                    <CardComponent
                                      key={character.id}
                                      character={character}
                                      path={path}
                                      element={element}
                                    />
                                  );
                                })
                               ) : 
                                (
                                  <div className='relative w-full flex justify-center flex-col items-center translate-y-20 gap-10'>
                                    <h1 className='text-4xl font-mono text-white opacity-20'>Không tìm thấy</h1>
                                    <img className='opacity-20' src='/images/logo-web.webp' alt="" />
                                  </div>
                                )
                            }
                          </div>
                        </div>
                  </div>
                </div>
            </div>  
    </WikiLayout>
  )
}