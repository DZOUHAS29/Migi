import { addRecord } from "@/app/record-actions";
import { useAddData } from "@/app/contexts/add-data";
import { useSocket } from "@/app/contexts/socket";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Select, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RecordsProps } from "@/app/interfaces";

const types = [
    "Headache",
    "Migraine"
];

const parts = [
    "Morning",
    "Afternoon",
    "Evening",
];

interface Message {
    message: string;
    variant: string;
}

export default function AddRecord() {
    const [warning, setWarning] = useState<Message>({ message: "", variant: "" });
    const { date, open, closeAdd } = useAddData();
    const { socket } = useSocket();

    useEffect(() => {
        if (!open)
            setWarning({
                message: "",
                variant: ""
            });

    }, [open])

    const handle = async (formData: FormData): Promise<void> => {
        const data = await addRecord(formData);

        if (data.variant === "error")
            return setWarning({
                message: data.message,
                variant: data.variant
            });

        socket?.emit("add", { record: data.record as RecordsProps });

        setWarning({
            message: data.message,
            variant: data.variant
        });

        return closeAdd();
    }

    return (
        <Modal
            isOpen={open}
            onClose={closeAdd}
            isCentered
        >
            <ModalOverlay />
            <ModalContent className="bg-air-blue">
                <form>
                    <ModalHeader className="font-normal">
                        <span className="font-semibold">Add Record</span>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex flex-col bg-tea-green text-ucla-blue rounded shadow-md p-2">
                            <div className="grid p-1">
                                <span>
                                    When the problem started?
                                </span>
                                <Input
                                    type="date"
                                    defaultValue={date}
                                    name="date"
                                    className="bg-white text-black"
                                />
                            </div>
                            <div className="grid p-1">
                                <span>
                                    What part of the day?
                                </span>
                                <Select name="daytime" placeholder="Select option" iconColor="black" className="bg-white text-black">
                                    {
                                        parts.map((type, i) => <option key={i} value={type}>{type}</option>)
                                    }
                                </Select>
                            </div>
                            <div className="grid p-1">
                                <span>
                                    Type?
                                </span>
                                <Select name="type" placeholder="Select option" iconColor="black" className="bg-white text-black">
                                    {
                                        types.map((type, i) => <option key={i} value={type}>{type}</option>)
                                    }
                                </Select>
                            </div>
                            <div className="grid p-1">
                                <span>
                                    What might have caused it?
                                </span>
                                <Input
                                    type="text"
                                    name="cause"
                                    className="bg-white text-black "
                                />
                            </div>
                            <div className="grid p-1">
                                <span>
                                    Did you take any medicine?
                                </span>
                                <Select name="meds" placeholder="Select option" iconColor="black" className="bg-white text-black">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Select>
                            </div>
                            {
                                warning.message === "" ?
                                    null
                                    :
                                    <div className={`${warning.variant === "error" ? "bg-red-500" : "bg-green-500"} text-center text-white rounded p-1`}>
                                        {warning.message}
                                    </div>
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={closeAdd}
                            className="text-white hover:bg-air-blue hover:text-slate-500"
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            formAction={handle}
                            className="bg-light-blue hover:bg-light-dark-blue text-white"
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}