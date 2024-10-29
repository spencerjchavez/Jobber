import TextInputProps from "./TextInputProps";

export default interface MultiLineInputProps extends TextInputProps {
    size: "large" | "medium" | "small";
}