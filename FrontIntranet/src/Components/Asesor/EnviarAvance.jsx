import React from 'react'

const EnviarAvance = () => {
  return (
    <div className='flex bg-[#F8F7F7] w-[456px] h-[200px] rounded-lg justify-center flex-col items-center'>
        <p>EnviarAvance</p>
        <div>
            <p>Asunto:</p>
            <input type="text" />
        </div>
        <div>
            <p>Archivos:</p>
            <input type="text" />
        </div>
    </div>
  )
}

export default EnviarAvance