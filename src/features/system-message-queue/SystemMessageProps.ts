export default interface SystemMessageProps {
    message: string;
    level: "error" | "warn" | "information";
    timeout: number;
}

export const GENERIC_ERROR = 'An error occurred! Please try again.';