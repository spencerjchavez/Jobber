import './HoverCard.scss';
import {ReactNode, useState } from "react";

interface HoverCardProps {
    className?: string;
    children?: ReactNode;
};

const HoverCard = (props: HoverCardProps) => {

    const [hoverClasses, setHoverClasses] = useState('shadow');

    return <div 
        className={`${hoverClasses} ${props.className} hover-card`} 
        onMouseEnter={() => setHoverClasses('shadow-lg ')} 
        onMouseLeave={() => setHoverClasses('shadow')}>
        {props.children}
    </div>
}

export default HoverCard;