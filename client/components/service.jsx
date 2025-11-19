import React from 'react'
import {IoAlarm} from 'react-icons/io5'
import {IoAccessibility} from 'react-icons/io5'

const Services = () => {
  return (
    <div className='max-w-screen-xl py-3 pb-20 px-4 mx-auto'>
        <div className="flex justify-center text-4xl font-bold">Services To Help You</div>
        <div className="grid grid-cols-3 py-8 gap-4">
            <div className="bg-gray-100 rounded-md py-5 px-5">
                <h1 className='text-red-400 text-lg font-bold'> <IoAlarm className='h-5 w-5'/> When Were Open?</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, inventore!</p>
            </div>
            <div className="bg-gray-100 rounded-md py-5 px-5">
                <h1 className='text-green-400 text-lg font-bold'> <IoAccessibility className='h-5 w-5'/> How Much Worker Do we Have?</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, inventore!</p>
            </div>
            <div className="bg-gray-100 rounded-md py-5 px-5">
                <h1 className='text-yellow-400 text-lg font-bold'> <IoAccessibility className='h-5 w-5'/> Anjay</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, inventore!</p>
            </div>
        </div>
    </div>
  )
}

export default Services