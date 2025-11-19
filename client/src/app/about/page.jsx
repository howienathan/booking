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
        <HeaderSection title="About Us" subTitle="Lorem ipsum dolor sit amet."/>
        <div className="max-w-screen-xl mx-auto py-20">
            <div className="grid md:grid-cols-2 gap-8 ">
                <Image src="/mimosa.png" alt="about-image" width={650} height={579} />
                <div>
                    <h1 className="text-5xl font-semibold text-gray-900 mb-4">
                        Who We Are 
                    </h1>
                    <p className="text-gray-700 py-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis eum optio hic a tenetur ab molestias laboriosam eos dolorem vel!</p>
                        <ul className="list-item space-y-6 pt-8">
                            <li className="flex gap-5">
                                <div className="flex-none mt-1">
                                    <IoEyeOutline className="size-7"/>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">vission :</h4>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aperiam. Sit sapiente ex alias laborum?</p>
                                </div>
                            </li>
                            <li className="flex gap-5">
                                <div className="flex-none mt-1">
                                    <IoLocateOutline className="size-7"/>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">Mission :</h4>
                                    <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, aperiam. Sit sapiente ex alias laborum?</p>
                                </div>
                            </li>
                        </ul>
                </div>
            </div>
            <div className="py-[4rem]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center">
                 <Image src="/jake.jpg" alt="about-image" width={450} height={279} className="rounded-md" />
                 <Image src="/jake.jpg" alt="about-image" width={450} height={279} className="rounded-md" />
                 <Image src="/jake.jpg" alt="about-image" width={450} height={279} className="rounded-md" />
                </div>
               
                    <h1 className="text-2xl flex justify-center font-semibold py-6">Lorem ipsum dolor sit.</h1>
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quidem magnam dicta minima dolores porro repudiandae hic ratione vero asperiores? Earum sunt explicabo sit voluptate officia ex ea. Nihil fuga ad sint eius doloribus aliquid.</p>
    
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