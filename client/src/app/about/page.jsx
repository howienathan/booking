import Map from '../../../components/map'
import Image from "next/image"
import {IoEyeOutline, IoLocateOutline} from "react-icons/io5"
import { Metadata } from "next"
import HeaderSection from "../../../components/header-Section"


export const metadata = {
     title: "About - Salon Mimi",
     description: "Discover Salon Mimi, your sanctuary for radiant skin with expert facial treatments.",
} 

const AboutPage = () => {
  return (
    <div>
        <HeaderSection title="About Us" subTitle="The place that explain everything about us."/>
        <article className="max-w-screen-xl mx-auto px-4 py-16">
            <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <figure className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition duration-300">
                  <Image src="/mimosa.png" alt="Salon Mimi interior" width={650} height={579} className="w-full h-auto object-cover" />
                </figure>
                <div className="space-y-8">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        Salon Mimi
                    </h1>
                    <p className="text-xl font-light text-pink-600 tracking-wide">Your Sanctuary For Your Radiant Skin</p>
                    <p className="text-lg text-gray-700 leading-relaxed font-light">Simply come in when your skin needs care, and let us enhance your natural glow.</p>
                    <div className="space-y-4 pt-4">
                        <div className="group p-6 rounded-xl border-2 border-gray-100 hover:border-pink-300 hover:bg-pink-50 transition duration-300 cursor-pointer">
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 rounded-full bg-blue-100 p-3 group-hover:bg-blue-200 transition">
                                    <IoEyeOutline className="w-6 h-6 text-blue-600"/>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Vision</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">To be the premier sanctuary where every individual discovers and embraces their most radiant, confident self.</p>
                                </div>
                            </div>
                        </div>
                        <div className="group p-6 rounded-xl border-2 border-gray-100 hover:border-pink-300 hover:bg-pink-50 transition duration-300 cursor-pointer">
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 rounded-full bg-pink-100 p-3 group-hover:bg-pink-200 transition">
                                    <IoLocateOutline className="w-6 h-6 text-pink-600"/>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mission</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">To provide personalized, results-oriented facial treatments in a serene and welcoming environment, enhancing natural beauty with expert care precisely when skin needs it most.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-r from-gray-50 to-pink-50 rounded-3xl p-12 md:p-16 mb-20">
                <div className="max-w-3xl mx-auto space-y-8">
                    <figure className="rounded-2xl overflow-hidden shadow-xl">
                      <Image src="/isi.jpg" alt="Salon Mimi team and facilities" width={900} height={400} className="w-full h-auto object-cover" />
                    </figure>
                    <div className="space-y-6 text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900">Who We Are?</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                          <p className="text-lg">At Salon Mimi, we are more than just a skincare clinic; we are your dedicated partner in achieving and maintaining a naturally beautiful, glowing complexion.</p>
                          <p className="text-base text-gray-600">We understand that your skin has unique needs and moments when it calls for extra care and attention. Our mission is to provide a serene and welcoming retreat where you can escape the daily grind and invest in your well-being.</p>
                          <p className="text-base text-gray-600">We specialize in personalized facial treatments designed to rejuvenate, refresh, and enhance your skin's natural radiance. Our expert therapists are committed to delivering expert care, leaving your face looking and feeling perfectly pampered.</p>
                          <p className="text-lg font-semibold text-pink-600 pt-4">Walk into Salon Mimi whenever you feel your skin needs us. Let us help you reveal your most confident, luminous self.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-center text-gray-900">Visit Us Today</h2>
                <Map/>
            </section>
        </article>
    </div>
  )
}

export default AboutPage