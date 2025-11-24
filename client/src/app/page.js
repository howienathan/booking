import Main from "../../components/main";
import Detailing from "../../components/detailing";
import Hero from "../../components/Hero";
import Map from "../../components/map"


export default function Home() {
  return (
    <div className="">
      <Hero/>
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">What People Say About Us</h1>
        </div>
        <Main/>
        <Detailing/>
        <div className="flex justify-center">
          <h1 className="text-4xl font-semibold">Visit us while u can</h1>
        </div>
        <Map/>
      </div>
    </div>
  );
}
