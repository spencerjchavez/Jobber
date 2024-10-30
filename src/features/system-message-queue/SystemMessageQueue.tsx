import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import SystemMessage from "./SystemMessage";


const SystemMessageQueue : React.FC = () => {
    const presenting = useSelector((state: RootState ) => state.systemMessageQueue.presenting);

    return <div className="d-flex flex-column g-4">
        {
            presenting.map((systemMessage, i) => {
                return <SystemMessage key={i} {...systemMessage}/>;
            })
        }
    </div>
}

export default SystemMessageQueue;