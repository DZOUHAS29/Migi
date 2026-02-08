import { Grid, GridItem, Icon, Heading } from "@chakra-ui/react";
import { BiBrain } from "@react-icons/all-files/bi/BiBrain";
import { useRouter } from "next/navigation";

export default function Logo() {
    const router = useRouter();

    return (
        <div className="flex hover:cursor-pointer" onClick={() => { router.push("/home") }}>
            <div className="grid">
                <Icon as={BiBrain} fontSize={"5xl"} />
            </div>
            <div className="grid text-3xl content-center" >
                Migi
            </div>
        </div>

    )
}