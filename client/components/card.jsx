import Image from "next/image"
import Link from "next/link"
import {IoStar} from "react-icons/io5"

const Card = () => {
  return (
<div className="bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm ">
    <div className="h-[260px] w-auto rounded-t-sm relative">
    <Image src="/image.png" width={384} height={256} alt="menu image" className="w-full 
    h-full object-cover rounded-t-sm"/>
    </div>
    <div className="p-8">
      <h4 className="text-2xl font-medium">
      <Link href="#" className="hover:text-gray-800 transition duration-150">Smoothing</Link>
      </h4>
      <h4 className="text-base  mb-7">
        <span className="font-semibold text-gray-600">Smoothing nya rapi banget bagus suka deh jadi pengen ke salon mimi lagi hehhe yuk rapatkan ke salon mimi secepatnya</span>
      </h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
        </div>
        <span className="font-semibold text-gray-600">Rp 210.000</span>
        <Link href="/booking" className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white bg-pink-400 rounded-xl hover:bg-pink-500 transition duration-150">
          Book Now
          </Link>
      </div>
    </div>
</div>
  )
}

export default Card