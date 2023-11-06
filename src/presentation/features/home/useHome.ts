import { useState } from "react";
import { OptionState } from "./types";
import { POST_OPTIONS } from "src/common/constants";

const useHome = () => {
    const [openModal, setOpenModal] = useState(false);
    const [option, setOption] = useState<OptionState>({
        id: POST_OPTIONS[0].id,
        title: POST_OPTIONS[0].title,
    });
    const [openOptionSelect, setOpenOptionSelect] = useState(false);
    const [textareaValue, setTextareaValue] = useState("");
    const [textareaHeight, setTextareaHeight] = useState<number>(160);
    const [baseFee, setBaseFee] = useState<string>("");

    const copyAddress = async () => {
        await navigator.clipboard.writeText("This is the text to be");
    };

    const handleToggleModal = () => {
        setOpenModal(!openModal);
    };

    const onToggleSelect = () => {
        setOpenOptionSelect(!openOptionSelect);
    };

    const onSelectMenu = (data: OptionState) => {
        setOption(data);
        setBaseFee("");
        onToggleSelect();
    };

    const handleTextareaChange = (event: any) => {
        setTextareaValue(event.target.value);

        if (event.target.value)
            setTextareaHeight(Math.max(event.target.scrollHeight, 160));
        else setTextareaHeight(0);
    };

    const handleSharePost = () => {
        console.log("shares");
    };

    return {
        openModal,
        option,
        openOptionSelect,
        textareaValue,
        textareaHeight,
        baseFee,
        copyAddress,
        onToggleSelect,
        handleToggleModal,
        onSelectMenu,
        handleTextareaChange,
        setBaseFee,
        handleSharePost,
    };
};

export default useHome;
