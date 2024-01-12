import { Divider } from "@chakra-ui/react";

export default function Socials() {
    return (
        <div className="flex flex-col text-ucla-blue p-2">
            <div>
                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="p-2 pl-0 text-lg mac-font-heading">Comprehensive Tracking</p>
                        <p>Our platform meticulously records migraine occurrences, durations, and intensity levels, offering users a detailed overview of their migraine patterns.</p>
                    </div>
                    <div>
                        <Divider className="border-ucla-blue" />
                        <p className="p-2 pl-0 text-lg mac-font-heading">Accurate Statistical Analysis</p>
                        <p>Utilizing the recorded data, our system generates precise statistical insights, empowering users with actionable information about their migraine triggers and patterns.</p>
                    </div>
                    <div>
                        <Divider className="border-ucla-blue" />
                        <p className="p-2 pl-0 text-lg mac-font-heading">Intuitive User Interface</p>
                        <p>A thoughtfully designed interface ensures ease of use, allowing seamless navigation and effortless data entry for effective migraine tracking without unnecessary complexity.</p>
                    </div>
                    <div>
                        <Divider className="border-ucla-blue" />
                        <p className="p-2 pl-0 text-lg mac-font-heading">Effortless Data Export</p>
                        <p>Users can easily export their tracked statistics, facilitating sharing with healthcare professionals or for personal records, ensuring seamless data portability and compatibility.</p>
                    </div>
                    <div>
                        <Divider className="border-ucla-blue" />
                        <p className="p-2 pl-0 text-lg mac-font-heading">Comparison to Normal Levels</p>
                        <p>Our platform evaluates the frequency of migraines against established norms, providing users with insights into whether their migraine patterns align with typical levels, potentially indicating the need for further medical attention or consultation.</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="p-3">
                    <div className="text-center self-end text-lg">
                        <span>
                            Check out our socials!
                        </span>
                    </div>
                    <div className="row-span-1 justify-self-center">
                        <div className="flex justify-center space-x-5">
                            <div>
                                <img src="/instagram.svg" alt="instagram" />
                            </div>
                            <div>
                                <img src="/facebook.svg" alt="facebook" />
                            </div>
                            <div>
                                <img src="/x.svg" alt="x" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
