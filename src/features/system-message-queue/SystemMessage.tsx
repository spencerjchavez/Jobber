import SystemMessageProps from "./SystemMessageProps";

const SystemMessage : React.FC<SystemMessageProps> = (props) => {
    return <div className="p-4 background-color-primary">
        <p>{props.message}</p>
    </div>
}

export default SystemMessage;