import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
            <Image src="/isi.jpg" alt="hero image" fill className="object-cover opacity-80 object-center
            w-full h-full"/>
            <div className="absoulute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-7xl font-extrabold leading-tight mb-3 capitalize">Book Your Order/Seat</h1>
            <p className="text-xl text-gray-50 font-bold mb-8">Take a seat wisely and go book ur order were ready to take ur order everytime we open</p>
            <div className="flex gap-5">
                <Link href="/book" className="bg-pink-400 rounded-2xl text-white hover:bg-pink-600 py-2
                px-6 md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg">
                    Book Now
                </Link>
                <Link href="/contact" className="bg-transparent border rounded-2xl border-pink-500 hover:bg-pink-600 py-2
                px-6 md:px-10 text-lg font-semibold hover:scale-105 hover:shadow-lg">
                    Contact Us
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero