import Image from 'next/image'

const Detailing = ({
  title = 'Someone Says About Us',
  quote = `If you ask our clients what sets us apart, they won't just talk about the perfect balayage or the flawless blowout. They'll tell you about the laughter, the conversations, and the genuine connections forged within these walls. We're often described as a home away from home — a place where you're not just a client, but a friend.`,
  detail = `The reviews we cherish most say things like, "I leave feeling better than when I came in, and not just because of my hair," and "It feels like catching up with old friends who happen to be geniuses with shears." Our community talks about the comfort of knowing their stylist remembers their kid's name, their vacation plans, and exactly how they like their layers. This isn't a factory — it's a family.`,
  image = '/isi.jpg',
  avatar = '/jake.jpg',
}) => {
  return (
    <section className="max-w-screen-xl py-8 px-4 mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
        <figure className="relative w-full rounded-lg overflow-hidden shadow-lg">
          <Image src={image} alt='figure' width={800} height={520} className="w-full h-auto object-cover" />
        </figure>

        <aside className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>

          <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed border-l-4 border-pink-300 pl-4">
            {quote}
          </blockquote>

          <p className="text-gray-600">{detail}</p>

          <div className="flex items-center gap-4">
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Detailing