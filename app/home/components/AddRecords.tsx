import { addRecord } from "@/app/actions";
import { useAddData } from "@/app/contexts/add-data";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Select, RadioGroup, Stack, Radio } from "@chakra-ui/react";
import { useState, useEffect } from "react";

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
            <ModalContent>
                <form>
                    <ModalHeader className="font-normal">
                        <span className="font-semibold">Add Record</span>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="flex flex-col">
                            <div className="grid p-1">
                                <span>
                                    When the problem started?
                                </span>
                                <Input
                                    type="date"
                                    defaultValue={date}
                                    name="date"
                                />
                            </div>
                            <div className="grid p-1">
                                <span>
                                    What part of the day?
                                </span>
                                <Select name="daytime" placeholder="Select option">
                                    {
                                        parts.map(type => <option value={type}>{type}</option>)
                                    }
                                </Select>
                            </div>
                            <div className="grid p-1">
                                <span>
                                    Type?
                                </span>
                                <Select name="type" placeholder="Select option">
                                    {
                                        types.map(type => <option value={type}>{type}</option>)
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
                                />
                            </div>
                            <div className="grid p-1">
                                <span>
                                    Did you take any medicine?
                                </span>
                                <RadioGroup name="meds">
                                    <Stack direction={"row"}>
                                        <Radio value="true">Yes</Radio>
                                        <Radio value="false">No</Radio>
                                    </Stack>
                                </RadioGroup>
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
                            variant={"link"}
                            className="text-slate-400 hover:text-slate-600 hover:no-underline pr-5"
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            formAction={handle}
                            className="bg-blue-300 hover:bg-blue-400"
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}