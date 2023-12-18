import { useRecordInfo } from "@/app/contexts/record-info";
import { Button, Divider, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import moment from "moment";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { IoIosCheckmark } from "@react-icons/all-files/io/IoIosCheckmark";

export default function RecordInfo() {
    const { open, closeAdd, record } = useRecordInfo();

    return (
        <Modal
            isOpen={open}
            onClose={closeAdd}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Record
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="flex flex-col bg-red-400 rounded p-2">
                        <div className="font-medium text-xl p-2">
                            {record?.date ? moment(record.date).format("MM/DD/YYYY") : null}
                        </div>
                        <div className="p-1">
                            <Divider className="border-red-700" />
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
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => { closeAdd() }}
                    >
                        Close
                    </Button>
                    <Button
                        variant={"solid"}
                        className="bg-red-500 text-white hover:bg-red-600"
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}