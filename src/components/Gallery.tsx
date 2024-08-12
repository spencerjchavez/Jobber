import React, { useEffect, useState } from "react";
import './Gallery.scss';
import ImageWithOverlay from "./ImageWithOverlay";

interface GalleryProps {
    images: string[];
    gap?: number;
    colsLg?: number;
    colsSm?: number;
    overlay?: string;
    aspectRatio?: number;
}
interface LoadedImage {
    element: React.ReactElement;
    aspectRatioInverse: number;
}

const Gallery: React.FC<GalleryProps> = ({images, gap, colsLg = 4, colsSm = 2, overlay='', aspectRatio}) => {

    const getColumnCount = () => window.innerWidth < 992 ? colsSm : colsLg;
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
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                resolve({ 
                    element: <ImageWithOverlay src={src} alt = '' className='mb-0' overlay={overlay} style={{aspectRatio: aspectRatio}}/>,
                    aspectRatioInverse: img.height / img.width
                });
            };
            img.onerror = () => {
                reject(new Error(`Image with url: ${img.src} could not be loaded`))
            }
          });
        };
    
        const loadAllImages = async () => {
          const loadedImagesResults = await Promise.allSettled(images.map((src) => loadImage(src)));
            setLoadedImages(loadedImagesResults.reduce((carry, val) => {
                if(val.status == 'fulfilled') {
                    carry.push(val.value)
                } else {
                    console.log(val.reason);
                }
                return carry;
            }, new Array<LoadedImage>()));
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
            // update aspect ratio
            columns[minCol].push(loadedImage);
            columnHeights[minCol] += loadedImage.aspectRatioInverse;
        })
        setColumns(columns);
    }, [columnCount, loadedImages]);

    return <div className="masonry-grid" style={{gap: gap != null ? gap : '1em'}}>
        {columns.map((column, index) => {
            return <div key={index} className="masonry-col" style={{gap: gap != null ? gap : '1em'}}>
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