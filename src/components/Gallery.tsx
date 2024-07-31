import React, { useEffect, useState } from "react";
import './Gallery.scss';

interface GalleryProps {
    images: string[];
}
interface LoadedImage {
    element: React.ReactElement;
    height: number;
}

// 2 columns for small screens, otherwise 4
const getColumnCount = () => window.innerWidth < 992 ? 2 : 4;

const Gallery: React.FC<GalleryProps> = ({images}) => {

    // track columns of gallery
    const [columnCount, setColumnCount] = useState(getColumnCount());
    const emptyColumns: LoadedImage[][] = Array.from({length: columnCount}, () => []);
    const [columns, setColumns] = useState(emptyColumns);
    const [loadedImages, setLoadedImages] = useState<LoadedImage[]>([]);

    useEffect(() => {
        const handleResize = () => setColumnCount(getColumnCount);

        // update columns as screen size changes
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, [])

    // load image heights
    useEffect(() => {
        const loadImage = async (src: string): Promise<LoadedImage> => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              resolve({ 
                element: <img src={src} alt = '' />,
                height: img.height / img.width 
            });
            };
          });
        };
    
        const loadAllImages = async () => {
          const loadedImages = await Promise.all(images.map((src) => loadImage(src)));
          setLoadedImages(loadedImages);
        };
    
        loadAllImages();
      }, []);

    //place images into columns
    useEffect( () => {
        const columnHeights = Array.from({ length: columnCount }, () => 0);
        const columns: LoadedImage[][] = Array.from({ length: columnCount }, () => []);
        loadedImages.forEach((loadedImage) => {
            let minHeight = Number.POSITIVE_INFINITY;
            let minCol = 0;
            columnHeights.forEach((height, index) => {
                if (height < minHeight) {
                    minHeight = height;
                    minCol = index;
                }
            })
            columns[minCol].push(loadedImage);
            columnHeights[minCol] += loadedImage.height;
        })
        setColumns(columns);
    }, [columnCount, loadedImages]);

    return <div className="masonry-grid">
        {columns.map((column, index) => {
            return <div key={index} className="masonry-col">
                {column.map((image, index2) => {
                    return <React.Fragment key={index2}>
                        {image.element}
                    </React.Fragment>
                })}
            </div>
        })}
    </div>
}
export default Gallery;