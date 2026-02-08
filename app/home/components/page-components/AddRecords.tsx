import { addRecord } from "@/app/record-actions";
import { useAddData } from "@/app/contexts/add-data";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Select, RadioGroup, Stack, Radio, useToast, ToastId } from "@chakra-ui/react";
import { RecordsProps } from "@/app/interfaces";
import { checkHealth } from "@/app/status-actions";
import { useRecords } from "@/app/contexts/records";

const types = [
    "Headache",
    "Migraine"
];

const parts = [
    "Morning",
    "Afternoon",
    "Evening",
];

export default function AddRecord() {
    const { date, open, closeAdd } = useAddData();
    const toast = useToast();
    const { setRecords } = useRecords();

    const handle = async (formData: FormData): Promise<ToastId | void> => {
        const data = await addRecord(formData);

        if (!data) return;

        if (data.variant === "error")
            return toast({
                title: data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });

        await checkHealth();

        if (data.record)
            setRecords(prev => [...prev, data.record as RecordsProps]);

        closeAdd();
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
                                <Select name="daytime" defaultValue={parts[0]} placeholder="Select option" iconColor="black" className="bg-white text-black">
                                    {
                                        parts.map((type, i) => <option key={i} value={type}>{type}</option>)
                                    }
                                </Select>
                            </div>
                            <div className="grid p-1">
                                <span>
                                    Type?
                                </span>
                                <Select name="type" defaultValue={types[0]} placeholder="Select option" iconColor="black" className="bg-white text-black">
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
                                <Select name="meds" defaultValue={"false"} placeholder="Select option" iconColor="black" className="bg-white text-black">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Select>
                            </div>
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