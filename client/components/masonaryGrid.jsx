import React from 'react'

const images = [
    "/mimosa.png",
    "/jake.jpg",
    "/isi.jpg",
    "/image.png",
    "/mimosa.png",
    "/jake.jpg",
    "/isi.jpg",
    "/image.png",
    
]

const MasonaryGrid = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 py-10 md:py-20 gap-4">
        {images.map((src, index) => (
            <div key={index} className='mb-4 break-inside-avoid'>
                <img src={src} className='w-full object-cover rounded-xl' />
            </div>
        ))}
    </div>  
  )
}

export default MasonaryGrid