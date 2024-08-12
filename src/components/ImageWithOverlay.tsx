
interface ImageWithOverlayProps {
    src: string;
    className?: string;
    alt?: string;
    overlay?: string;
    style?: React.CSSProperties;
}


const ImageWithOverlay: React.FC<ImageWithOverlayProps> = ({src, className, alt, overlay, style}) => {
    return <div style={{position: 'relative', display: 'block'}}>
        <img className={className} alt={alt} src={src} style={style}/>
        {overlay && <div className="img-overlay fill" style={{backgroundColor: overlay}}/>} 
    </div>
}

export default ImageWithOverlay;