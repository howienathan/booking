import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className='bg-gray-900'>
            <div className="max-w-screen xl mx-auto px-4 w-full py-10 md:py-16 ">
                <div className="grid md:grid-cols-3 gap-7 ">
                    <div>
                        <Link href="/" className="mb-10 block">
                        <Image src="/logo.png" width={128} height={49} alt="logo" />
                        </Link>
                        <p className="text-gray-400">
                           This entire website was crafted with copious amounts of coffee, late-night inspiration, and a genuine love for the craft. Thank you for being here.  
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-20">
                           <div className="flex-1 md:flex-none">
                            <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                            <ul className=" grid grid-cols-2 space-y-5 text-gray-400">
                                <li >
                                    <Link className=" hover:text-red-400 duration-150 cursor-pointer " href="/">Home</Link>
                                </li>
                                <li>
                                    <Link className=" hover:text-red-400 duration-150 cursor-pointer" href="/tentang">Tentang Kami</Link>
                                </li>
                                <li>
                                    <Link className=" hover:text-red-400 duration-150 cursor-pointer" href="/galeri">Galeri</Link>
                                </li>
                                <li>
                                    <Link className=" hover:text-red-400 duration-150 cursor-pointer" href="/book">Booking</Link>
                                </li>
                                <li>
                                    <Link className=" hover:text-red-400 duration-150 cursor-pointer" href="/contact">Contact</Link>
                                </li>
                            </ul>
                           </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-8 text-xl font-semibold text-white">Newsletter</h4>
                        <p className="text-gray-400">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        <form action="" className="mt-5">
                            <div className="mb-5">
                                <input type="text" name="email" className="w-full p-3 rounded-sm bg-white" placeholder="Something u want to say" />
                            </div>
                            <button className="bg-pink-400 p-3 font-bold text-white w-full text-center
                            rounded-sm hover:bg-pink-700">Sendd</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="max-w-screen xl mx-auto px-4 border-t-pink-400 py-8 text-center
            text-base text-gray-500 ">
                $copy; Copyright 2025 | Salon Mimi | All Right Reserved
            </div>
    </footer>
  )
}

export default Footer