import { IoIosArrowForward } from "react-icons/io";

type FormTimelineProps = {
  sections: string[]
  isActiveSectionIndex: number
  setIsActiveSectionIndex: (index: number) => void
};

const FormTimeline: React.FC<FormTimelineProps> = ({ sections, isActiveSectionIndex, setIsActiveSectionIndex }) => {
    return (
        <section className="flex justify-start align-middle items-center w-full gap-2">
        {sections.map((section, index) => {
            return (
            <div
                key={index}
                className="flex justify-start align-middle items-center gap-2"
            >
                <div className="flex justify-center align-middle p-2 pl-4 pr-4 rounded-[8px] cursor-pointer" style={ (isActiveSectionIndex === index) ? {backgroundColor:"#DAEDF9"} : {}} onClick={() => setIsActiveSectionIndex(index)}>
                <p className="font-['Work_Sans'] text-[#808080] text-[14px] font-medium leading-[16.42px]" style={ (isActiveSectionIndex === index) ? { color:"#1F8CD0"} : {}}>
                    {section}
                </p>
                </div>
                {index < sections.length - 1 && (
                <IoIosArrowForward
                    color="#808080"
                    size={20}
                    className="flex justify-center align-middle"
                />
                )}
            </div>
            );
        })}
        </section>
    );
};

export default FormTimeline;
