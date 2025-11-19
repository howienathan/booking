import Card from "./card"


const Main = () => {
  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
        <div className="grid grid-cols-3 max-md:grid-cols-1 items-center gap-7 ">
            <Card/>
            <Card/>
            <Card/>
        </div>
    </div>
  )
}

export default Main