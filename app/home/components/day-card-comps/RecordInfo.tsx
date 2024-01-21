import { useRecordInfo } from "@/app/contexts/record-info";
import { Button, Divider, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import moment from "moment";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { IoIosCheckmark } from "@react-icons/all-files/io/IoIosCheckmark";
import { useState } from "react";
import { RemoveRecord } from "@/app/record-actions";
import { useSocket } from "@/app/contexts/socket";

export default function RecordInfo() {
    const [warning, setWarning] = useState<string>("");
    const { open, closeAdd, record } = useRecordInfo();
    const { socket } = useSocket();

    const deleteRecord = async (): Promise<void> => {
        if (!record?.id)
            return setWarning("400: Something went wrong");

        const data = await RemoveRecord(record.id);

        if (data !== 200)
            return setWarning(`${data}: Something went wrong`);

        socket?.emit("delete", record.id);

        handle();
    }

    const handle = (): void => {
        setWarning("");
        closeAdd();
    }

    return (
        <Modal
            isOpen={open}
            onClose={handle}
            isCentered
        >
            <ModalOverlay />
            <ModalContent className="bg-air-blue">
                <ModalHeader>
                    Record
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="flex flex-col bg-tea-green text-ucla-blue rounded shadow-md p-2">
                        <div className="font-medium text-xl p-2">
                            {record?.date ? moment(record.date).format("MM/DD/YYYY") : null}
                        </div>
                        <div className="p-1">
                            <Divider className="border-ucla-blue" />
                        </div>
                        <div className="p-1">
                            <p className="font-medium">
                                Part of the day:
                            </p>
                            {record?.day_part}
                        </div>
                        <div className="p-1">
                            <p className="font-medium">
                                Type:
                            </p>
                            {record?.type}
                        </div>
                        <div className="p-1">
                            <p className="font-medium">
                                Cause:
                            </p>
                            {record?.cause}
                        </div>
                        <div className="p-1">
                            <p className="font-medium">
                                Meds:
                            </p>
                            {
                                record?.meds ?
                                    <p>
                                        <Icon as={IoIosCheckmark} className="text-4xl" />
                                    </p>
                                    :
                                    <p className="p-1">
                                        <Icon as={IoClose} className="text-2xl" />
                                    </p>
                            }
                        </div>
                    </div>
                    {
                        warning === "" ?
                            null
                            :
                            <p className="text-center bg-red-500 rounded shadow-md mt-2 p-1">
                                {warning}
                            </p>
                    }
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => { handle() }}
                        className="text-white hover:bg-air-blue hover:text-slate-500"
                    >
                        Close
                    </Button>
                    <Button
                        variant={"solid"}
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={deleteRecord}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}