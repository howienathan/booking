import Main from "../../components/main";
import Detailing from "../../components/detailing";
import Hero from "../../components/Hero";
import Services from "../../components/service";
import Map from "../../components/map"


export default function Home() {
  return (
    <div className="">
      <Hero/>
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">What People Say About Us</h1>
          <p className="py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, animi!</p>
        </div>
        <Main/>
        <Detailing/>
        <Services/>
        <div className="flex justify-center">
          <h1 className="text-4xl font-semibold">Visit us while u can</h1>
        </div>
        <Map/>
      </div>
    </div>
  );
}
