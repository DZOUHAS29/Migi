import { Grid, GridItem, Icon, Heading } from "@chakra-ui/react";
import { BiBrain } from "@react-icons/all-files/bi/BiBrain";

export default function Logo() {
    return (
        <div className="flex">
            <div className="grid">
                <Icon as={BiBrain} fontSize={"5xl"} />
            </div>
            <div className="grid text-3xl content-center">
                Migi
            </div>
        </div>

    )
}