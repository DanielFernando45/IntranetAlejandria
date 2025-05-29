

const EnviarAvance = () => {
  return (
    <div className='flex bg-[#F8F7F7] w-[456px] h-[200px] rounded-lg justify-center flex-col items-center gap-2'>
        <p>EnviarAvance</p>
        <div className='flex gap-[30px] '>
            <p>Asunto:</p>
            <input type="text" className='rounded-md w-80'/>
        </div>
        <div className='flex gap-5 '>
            <p>Archivos:</p>
            <input type="text" className='rounded-md w-80' />
        </div>
    </div>
  )
}

export default EnviarAvance