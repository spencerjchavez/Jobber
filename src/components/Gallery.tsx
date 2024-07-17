import React from "react";

interface GalleryProps {
    images: string[];
}

const Gallery: React.FC<GalleryProps> = ({images}) => {
    return <div className="masonry-grid">
        {images.map((src, index) => (
            <div key={index} className="masonry-item">
                <img src={src} alt={`Portfolio Image ${index}`} />
            </div>
        ))}
    </div>
}

const orderMasonry = () => {

}

window.onload = () => orderMasonry();
window.onresize = () => orderMasonry();
export default Gallery;