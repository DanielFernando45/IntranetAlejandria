import React from 'react'
import LayoutApp from '../../layout/LayoutApp'
import Zoom from "../../assets/images/zoom.svg"

const CalendarioAsesor = () => {
  return (
    <LayoutApp>
      <main className='m-5 flex gap-[60px]'>
        <div className='w-[60%]'>
          <div className='flex justify-between mb-10 items-center'>
            <p className='font-semibold text-[20px]'>Calendario de actividades</p>
            <div className='flex gap-3'>
              <select className='bg-[#1C1C34] p-[5px] rounded-lg text-white w-[100px] h-[35px] font-semibold '>Marzo
                <option value="">Enero</option>
                <option value="">Febero</option>
                <option value="">Marzo</option>
                <option value="">Abril</option>
                <option value="">Mayo</option>
                <option value="">Junio </option>
                <option value="">Julio</option>
                <option value="">Agosto</option>
                <option value="">Septiembre</option>
                <option value="">Octubre </option>
                <option value="">Noviembre</option>
                <option value="">Diciembre</option>

              </select>
              <select className='bg-[#1C1C34] p-[5px] rounded-lg text-white w-[100px] h-[35px] font-semibold'>
                <option value="">2025</option>
                <option value="">2024</option>
                <option value="">2023</option>
                <option value="">2022</option>
              </select>

              <select className='border border-[#1C1C34] rounded-lg w-[240px] h-[35px] font-semibold'>
                <option value="">Seleccione alumno(s)</option>
                <option value="">Dana Ortiz </option>
                <option value="">Alex Alberto</option>
                <option value="">Rodolfo Alfred</option>
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex gap-2'>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] '>Lu</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] '>Ma</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] '>Mi</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] '>Ju</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] '>Vi</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] '>Sa</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] '>Do</div>
            </div>
            <div className='flex gap-2'>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] '></div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] '></div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] '></div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>1</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>2</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>3</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>4</div>
            </div>
            <div className='flex gap-2'>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>5</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>6</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-[#D2CECF] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>7</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] text-white  bg-[#4BD7F5]'>8</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>9</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>10</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>11</div>
            </div>
            <div className='flex gap-2'>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>12</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>13</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>14</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>15</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>16</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>17</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>18</div>
            </div>
            <div className='flex gap-2'>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>19</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>20</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>21</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>22</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>23</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>24</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>25</div>
            </div>
            <div className='flex gap-2'>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>26</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>27</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>28</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>29</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>30</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] hover:bg-[#E9E7E7] hover:text-[#4BD7F5]'>31</div>
              <div className='flex justify-center items-center rounded-full w-[85px] h-[85px] text-[25px] '></div>
            </div>
          </div>

        </div>

        <div className='flex flex-col  h-full justify-center p-5 gap-32 w-[40%] bg-white rounded-xl'>
          <div>
            <p className='text-[#b1afb0] font-medium text-center text-[20|px]'>Viernes</p>
            <h2 className='text-[50px] font-semibold text-center'>9</h2>
            <h1 className='text-[#575051] text-[25px] font-semibold text-center'>Marzo</h1>
          </div>

          <div className='flex flex-col sombra '>

            <div className='bg-white flex w-full h-[121px] gap-2 p-2  border-[2px]'>
              <div className='h-full px-3 py-2'>
                <div className='flex items-start w-[15px] h-[15px] rounded-full bg-[#4E4E91]'>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#575051] font-medium'>10:00am - 12:00am</p>
                <h2 className='text-[25px] font-bold'>John Mobbin</h2>
                <div className='flex gap-2'>
                  <img src={Zoom} alt="" />
                  <p className='text-[#82777A]'>Avance de IV Capitulo</p>
                </div>
              </div>
            </div>

            <div className='bg-white flex w-full h-[121px] gap-2 p-2  border-[2px]'>
              <div className='h-full px-3 py-2'>
                <div className='flex items-start w-[15px] h-[15px] rounded-full bg-[#4E4E91]'>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#575051] font-medium'> 12:00am</p>
                <h2 className='text-[25px] font-bold'>Entrega de avance</h2>
                <div className='flex gap-2'>
                  <p className='text-[#82777A]'>Fecha limite: 28 de Marzo</p>
                </div>
              </div>
            </div>

            <div className='bg-white flex w-full h-[121px] gap-2 p-2  border-[2px]'>
              <div className='h-full px-3 py-2'>
                <div className='flex items-start w-[15px] h-[15px] rounded-full bg-[#4E4E91]'>
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-[#575051] font-medium'> 12:00am</p>
                <h2 className='text-[25px] font-bold'>Entrega de avance</h2>
                <div className='flex gap-2'>
                  <p className='text-[#82777A]'>Fecha limite: 28 de Marzo</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </LayoutApp>

  )
}

export default CalendarioAsesor