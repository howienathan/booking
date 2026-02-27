"use client";

import { FaMapMarkedAlt  } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import Image from "next/image";

const handleWhatsAppChat = () => {
  const phoneNumber = '6281227355537';
  const text = 'Halo kak, saya ingin datang jam ... , bisakah ? saya akan membuat janji temu lewat booking';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
};

const Map = ({
  placeName = 'Mimi Salon',
  address = 'Jl. Jalan Lamongan Raya, Bendan Ngisor, Semarang City, Central Java',
  lat = -7.009291068655293,
  lng = 110.39375727429398,
  embedSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9999195480104!2d110.39375727429398!3d-7.009291068655293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b18c3209617%3A0xd577419982eba6e0!2sMimi%20Salon!5e0!3m2!1sid!2sid!4v1754442868816!5m2!1sid!2sid',
}) => {
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  const mapsDir = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2 rounded-lg overflow-hidden shadow-lg ring-1 ring-black/5">
          <div className="relative aspect-[16/9] md:aspect-video w-full">
            <iframe
              title={`Map to ${placeName}`}
              src={embedSrc}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <aside className="bg-white rounded-lg p-5 shadow-md flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className=" shadow-[0px_0px_20px_1px_#ed64a6] text-pink-600 rounded-lg p-2">
              <Image src="/logo.png" alt="Map Icon" width={150} height={150} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{placeName}</h3>
              <p className="text-xs text-gray-600 mt-1">{address}</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">Open hours: Mon–Sat 09:00–19:00</div>

          <div className="flex gap-3 mt-2">
            <a href={mapsDir} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 max-md:text-sm text-white rounded-md text-sm font-medium transition">
              <FaMapMarkedAlt className="w-4 h-4" />
              Get directions
            </a>

            <a href={mapsSearch} target="_blank" rel="noreferrer" className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition">
              <CiLocationArrow1 className="w-4 h-4 mr-1" />
              View in Google Maps
            </a>
          </div>
            <div>
            <p className="mb-4 text-sm text-gray-500">Messages us at</p>
            <button onClick={handleWhatsAppChat} className=" bg-green-500 text-white px-2 py-1 rounded-lg cusor-pointer inline-flex items-center gap-1 font-medium hover:bg-green-600 transition">
            Whatsapp Chat
            </button>
            </div>
          <div className="mt-3 text-xs text-gray-400">Tap the map to open full-screen map on mobile.</div>
        </aside>
      </div>
    </section>
  )
}

export default Map