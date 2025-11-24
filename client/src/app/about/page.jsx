import Map from '../../../components/map'
import Image from "next/image"
import {IoEyeOutline, IoLocateOutline} from "react-icons/io5"
import { Metadata } from "next"
import HeaderSection from "../../../components/header-Section"


export const metadata = {
     title: "about",
     description: "Who we are",
} 

const AboutPage = () => {
  return (
    <div>
        <HeaderSection title="About Us" subTitle="The place that explain everything about us."/>
        <div className="max-w-screen-xl mx-auto py-20">
            <div className="grid md:grid-cols-2 gap-8 ">
                <Image src="/mimosa.png" alt="about-image" width={650} height={579} />
                <div>
                    <h1 className="text-5xl font-semibold text-gray-900 mb-4">
                        Salon Mimi: Your Sanctuary For Your Radiant Skin
                    </h1>
                    <p className="text-gray-700 py-5">Simply come in when your skin needs care, and let us enhance your natural glow.</p>
                        <ul className="list-item space-y-6 pt-8">
                            <li className="flex gap-5">
                                <div className="flex-none mt-1">
                                    <IoEyeOutline className="size-7"/>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">vission :</h4>
                                    <p className="text-gray-600">To be the premier sanctuary where every individual discovers and embraces their most radiant, confident self.</p>
                                </div>
                            </li>
                            <li className="flex gap-5">
                                <div className="flex-none mt-1">
                                    <IoLocateOutline className="size-7"/>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                                    <p className="text-gray-600">To provide personalized, results-oriented facial treatments in a serene and welcoming environment. We are dedicated to enhancing our clients natural beauty by delivering expert care precisely when their skin needs it most, leaving them with a healthy, glowing complexion.</p>
                                </div>
                            </li>
                        </ul>
                </div>
            </div>
            <div className="py-[4rem]">
                <div className="flex justify-center">
                 <Image src="/isi.jpg" alt="about-image" width={900} height={200} className="rounded-md" />
                </div>
               
                    <h1 className="text-2xl flex justify-center font-semibold py-6">Who We are?</h1>
                    <p className="text-center">At Salon Mimi, we are more than just a skincare clinic; we are your dedicated partner in achieving and maintaining a naturally beautiful, glowing complexion. We understand that your skin has unique needs and moments when it calls for extra care and attention.
                                        Our mission is to provide a serene and welcoming retreat where you can escape the daily grind and invest in your well-being. We specialize in personalized facial treatments designed to rejuvenate, refresh, and enhance your skins natural radiance. Our expert therapists are committed to using their skills to provide you with the perfect treatment, leaving your face looking and feeling perfectly pampered.
                                        Walk into Salon Mimi whenever you feel your skin needs us. Let us help you reveal your most confident, luminous self.</p>
            </div>
            <div className="py-9">
                <h1 className="py-10 font-semibold text-3xl flex justify-center">Come visit us while u can</h1>
                        <Map/>
            </div>
        </div>
    </div>
  )
}

export default AboutPage