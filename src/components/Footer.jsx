import React from 'react'

const Footer = () => {
  return (
    <div className='text-white bg-neutral-900 flex flex-col justify-center items-center  w-full'>
        <div className="logo font-bold">
        <span className='text-green-400'>&lt;</span>
        Pass
        <span className='text-green-400'>OP/&gt;</span>
        </div>
        <div className='flex'>
            Created with <img className='mx-2 w-8' src="icons/heart.png" alt="" /> by PranavJadia
        </div>
    </div>
  )
}

export default Footer
