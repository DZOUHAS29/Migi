import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { BiHomeSmile } from "@react-icons/all-files/bi/BiHomeSmile";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { IoStatsChart } from "@react-icons/all-files/io5/IoStatsChart";
import { IoIosSettings } from "@react-icons/all-files/io/IoIosSettings";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";

type props = {
    open: boolean;
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const SideMenu: React.FC<props> = ({ open, setOpen }) => {

    const transition = open ? "translate-x-0" : "translate-x-full";

    return (
        <div
            className={`w-1/4 h-full bg-slate-950 bg-opacity-95 ${transition} fixed 
            rounded right-0 top-0 bottom-0 transition ease-linear z-10`}
        >
            <div className="flex-row">
                <div className="grid justify-end p-4 hover:text-blue-500">
                    <button className="text-3xl font-bold hover:bg-slate-900 rounded-full"
                        onClick={() => { setOpen(false) }}
                    >
                        <IoClose />
                    </button>
                </div>
                <div className="grid p-10 hover:text-blue-500">
                    <button>
                        <div className="flex">
                            <div className="grid self-center text-4xl">
                                <BiHomeSmile />
                            </div>
                            <div className="grid self-center font-mono pl-5 pt-1 font-bold text-2xl">
                                <h5>
                                    Home
                                </h5>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="grid p-10 hover:text-blue-500">
                    <button>
                        <div className="flex">
                            <div className="grid self-center text-4xl">
                                <IoStatsChart />
                            </div>
                            <div className="grid self-center font-mono pl-5 pt-1 font-bold text-2xl">
                                <h5>
                                    Statistics
                                </h5>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="grid p-10 hover:text-blue-500">
                    <button>
                        <div className="flex">
                            <div className="grid self-center text-4xl">
                                <BiUser />
                            </div>
                            <div className="grid self-center font-mono pl-5 pt-1 font-bold text-2xl">
                                <h5>
                                    Profile
                                </h5>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="grid p-10 hover:text-blue-500">
                    <button>
                        <div className="flex">
                            <div className="grid self-center text-4xl">
                                <IoIosSettings />
                            </div>
                            <div className="grid self-center font-mono pl-5 pt-1 font-bold text-2xl">
                                <h5>
                                    Settings
                                </h5>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="grid p-10 text-red-500 hover:text-red-600">
                    <button>
                        <div className="flex">
                            <div className="grid self-center text-4xl">
                                <BiLogOut />
                            </div>
                            <div className="grid self-center font-mono pl-5 pt-1 font-bold text-2xl">
                                <h5>
                                    Log out
                                </h5>
                            </div>
                        </div>
                    </button>
                </div>
               

            </div>
        </div>
    )
}