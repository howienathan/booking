"use client"

import Image from "next/image"
import Link from "next/link"
import { IoStar, IoHeart } from "react-icons/io5"
import { useState } from "react"

const truncate = (text, len = 120) =>
  text && text.length > len ? text.slice(0, len).trimEnd() + "…" : text

const Card = ({
  title = "Smoothing",
  description = "Smoothing nya rapi banget bagus suka deh jadi pengen ke salon mimi lagi hehhe yuk rapatkan ke salon mimi secepatnya",
  price = 210000,
  image = "/image.png",
  href = "/booking",
  rating = 4.2,
  reviews = 34,
}) => {
  const [fav, setFav] = useState(false)

  const fullStars = Math.floor(rating)
  const stars = Array.from({ length: 5 }).map((_, i) => i < fullStars)

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 md:h-56 lg:h-60">
        <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />

        <button
          aria-pressed={fav}
          onClick={() => setFav(!fav)}
          className="absolute top-3 right-3 z-10 rounded-full bg-white/80 hover:bg-white p-2 shadow-md">
          <IoHeart className={`h-5 w-5 ${fav ? 'text-pink-500' : 'text-gray-500'}`} />
        </button>

        <div className="absolute left-3 bottom-3 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow">
          Rp {price.toLocaleString('id-ID')}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold mb-1">
          <Link href={href} className="hover:text-gray-900 transition">
            {title}
          </Link>
        </h3>

        <p className="text-sm text-gray-600 mb-4">{truncate(description, 140)}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center -space-x-1">
              {stars.map((filled, i) => (
                <IoStar key={i} className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <div className="text-sm text-gray-500">{rating.toFixed(1)} · {reviews} reviews</div>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={href} className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium shadow-sm transition">
              Book Now
            </Link>
            <Link href={href} className="hidden md:inline-block text-sm text-pink-600 hover:underline">Details</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card