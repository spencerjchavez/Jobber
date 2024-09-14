import './Loading.scss';
import LoadingIcon from 'src/assets/icons/loading.svg?react'
import { useEffect, useState } from 'react';

const Loading: React.FC = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 1000);
    }, [])

    return <div className="section h-100vh align-items-center justify-content-center">
        <div className="icon-loading">
            {show && <LoadingIcon />}
        </div>
    </div>
}

export default Loading;