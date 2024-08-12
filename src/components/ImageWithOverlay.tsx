
interface ImageWithOverlayProps {
    src: string;
    className?: string;
    alt?: string;
    overlay?: string;
}


const ImageWithOverlay: React.FC<ImageWithOverlayProps> = ({src, className, alt, overlay}) => {
    return <div style={{position: 'relative', display: 'block'}}>
        <img className={className} alt={alt} src={src} />
        {overlay && <div className="img-overlay fill" style={{backgroundColor: overlay}}/>} 
    </div>
}

export default ImageWithOverlay;