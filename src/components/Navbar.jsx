import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-neutral-900 bg-opacity-80 text-white '>
      <div className="mycontainer flex justify-between px-4 py-5 h-12 items-center">

      <div className="logo font-bold">
        <span className='text-green-400'>&lt;</span>
        Pass
        <span className='text-green-400'>OP/&gt;</span>
        </div>
      <ul className='flex gap-6'>
        <a className='hover:font-bold hover:text-black transition-all' href="#">Home</a>
        <a className='hover:font-bold hover:text-black transition-all' href="#">About</a>
        <a className='hover:font-bold hover:text-black transition-all' href="#">Contact</a>
      </ul>
      </div>
    </nav>
  )
}

export default Navbar
