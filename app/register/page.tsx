import About from "../login/components/About";
import Socials from "../login/components/Socials";
import RegisterPaper from "./components/RegisterPaper";

export default function Register() {

    return (
        <div className="grid grid-cols-3 p-10 gap-x-20 h-5/6">
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
                    <div className="row-span-1">

                    </div>
                    <div className="row-span-5">
                        <RegisterPaper />
                    </div>
                </div>
            </div>
            <div className="col-span-1">
                <div className="grid grid-rows-6">
                    <div className="row-span-6 bg-celadon rounded h-full">
                        <Socials />
                    </div>
                </div>
            </div>
        </div>
    )
}