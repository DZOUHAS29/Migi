import { Grid, GridItem, Icon, Heading } from "@chakra-ui/react";
import { BiBrain } from "@react-icons/all-files/bi/BiBrain";

export default function Logo() {
    return (
        <Grid templateColumns={"repeat(2, 0fr)"}>
            <GridItem className="py-1">
                <Icon as={BiBrain} fontSize={"4xl"} />
            </GridItem>
            <GridItem className="px-2">
                <Heading fontFamily={"mono"}>Migi</Heading>
            </GridItem>
        </Grid>
    )
}