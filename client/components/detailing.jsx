import React from 'react'
import Image from 'next/image'

const Detailing = () => {
  return (
    <div className='max-w-screen-xl py-6 pb-20 px-4 mx-auto'>
        <div className="grid grid-cols-2 max-md:grid-cols-1">
            <Image src="/jake.jpg" alt='anjay' width={500} height={120}/>
            <div className="">
                <h1 className='text-2xl font-semibold'>Wanna see our other detail?</h1>
                <p className='text-base mr-8 pt-5    '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa rem corporis perspiciatis, culpa placeat ab id sed! Perferendis, molestias cupiditate, reprehenderit ad beatae, quos sint ex aspernatur iure eveniet officiis.</p>
            </div>
        </div>
    </div>
  )
}

export default Detailing