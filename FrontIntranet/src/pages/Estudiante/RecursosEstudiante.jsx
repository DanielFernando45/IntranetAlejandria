import React from 'react'
import LayoutApp from '../../layout/LayoutApp'
import FeclaIzqui from "../../assets/icons/arrow-left.svg"
import FechaDerec from "../../assets/icons/arrow-right.svg"
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import NoticiaUno from "../../assets/images/NoticiaAsesor.png"
import play from "../../assets/icons/play.svg"

const RecursosEstudiante = () => {
    return (
        <LayoutApp>
            <main className='ml-5 mr-40'>
                <div>
                    <div className=" mt-5 mx-5 flex justify-between items-center">
                        <h2 className="text-[20px] font-medium">Tutoriales</h2>
                        <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                            <a href="">Ver todo</a>
                            <img src={flechaAzul} alt="" />
                        </span>
                    </div>
                    <div className="flex justify-between w-full">
                        <div className="flex items-center ">
                            <a className=" " href=""> <img src={FeclaIzqui} alt="" /></a>
                        </div>

                        <section >
                            <div className=" bg-[#1C1C34] w-[300px] h-[283px] rounded-t-xl ">
                                <img className="w-full h-full rounded-t-xl" src={NoticiaUno} alt="" />
                            </div>
                            <div className='flex bg-white h-[50px] w-[50px] rounded-full justify-center items-center'>
                                <img src={play} alt="" />
                            </div>
                            <div className='flex flex-col gap-3 w-[300px] h-[116px] bg-white rounded-b-xl p-6'>
                                 <div className='flex flex-col gap-[1px]'>
                                    <h1 className='text-[16px] font-semibold'>Como citar en APA</h1>
                                    <p className='text-[10px] text-[#82777A]'>BiGuru Guias</p>
                                 </div>               
                                 <p className='text-[10px] text-[#82777A] font-medium'>10k Views . 1 month ago</p>
                            </div>
                        </section>


                        <div className="flex items-center">
                            <a className=" w-6 h-6" href=""> <img src={FechaDerec} alt="" /></a>
                        </div>

                    </div>
                </div>

            </main>
        </LayoutApp>

    )
}

export default RecursosEstudiante