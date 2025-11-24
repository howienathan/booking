import React from 'react'
import Image from 'next/image'

const Detailing = () => {
  return (
    <div className='max-w-screen-xl py-6 pb-20 px-4 mx-auto'>
        <div className="grid grid-cols-2 max-md:grid-cols-1">
            <Image src="/jake.jpg" alt='anjay' width={500} height={120}/>
            <div className="">
                <h1 className='text-2xl font-semibold'>Someone Say About Us</h1>
                <p className='text-base mr-8 pt-5    '>If you ask our clients what sets us apart, they wont just talk about the perfect balayage or the flawless blowout. Theyll tell you about the laughter, the conversations, and the genuine connections forged within these walls. Were often described as a home away from home a place where youre not just a client, but a friend. Our chairs have been the setting for celebrated promotions, consoled heartbreaks, and witnessed the planning of a thousand life events.
                <p className='mt-2'>
                  The reviews we cherish most say things like, I leave feeling better than when I came in, and not just because of my hair, and It feels like catching up with old friends who happen to be geniuses with shears. Our community talks about the comfort of knowing their stylist remembers their kids name, their vacation plans, and exactly how they like their layers. This isnt a factory its a family. And the work we do is beautiful because its built on a foundation of trust, care, and a whole lot of joy. People say they come for the style, but they stay for the smiles.</p>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Detailing