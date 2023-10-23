import { IoClose } from "@react-icons/all-files/io5/IoClose";

type props = {
    open: boolean;
    setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const SideMenu: React.FC<props> = ({ open, setOpen }) => {

    const transition = open ? "translate-x-0" : "translate-x-full";

    return (
        <div
            className={`w-1/4 h-full bg-white ${transition} fixed rounded right-0 top-0 bottom-0 transition ease-linear z-10`}
        >
            <div className="flex-row">
                <div className="grid justify-end p-1 hover:text-blue-500">
                    <button className="text-3xl font-bold" onClick={() => { setOpen(false) }}>
                        <IoClose />
                    </button>
                </div>
            </div>
        </div>
    )
}