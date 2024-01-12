import About from "./components/About";
import LoginPaper from "./components/LoginPaper";
import Socials from "./components/Socials";


export default function Login() {

  return (
    <div className="grid grid-cols-3 p-10 gap-x-20 h-5/6 mac-font-text">
      <div className="col-span-1">
        <div className="grid grid-rows-6 h-full gap-y-10">
          <div className="row-span-3">
            <About />
          </div>
          <div className="row-span-3">
            <img src="kytka.png" />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid grid-rows-6">
          <div className="row-span-2">

          </div>
          <div className="row-span-4">
            <LoginPaper />
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid grid-rows-6">
          <div className="row-span-6 bg-celadon rounded shadow-md h-full">
            <Socials />
          </div>
        </div>
      </div>
    </div>
  )
}
