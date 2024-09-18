import { useState } from "react";
import Gallery from "src/components/Gallery";
import HoverCard from "src/components/HoverCard";
import AutocompleteInput from "../locations/AutocompleteInput";
import image0 from 'src/assets/images/compressed/0.jpg';
import image1 from 'src/assets/images/compressed/1.jpg';
import image2 from 'src/assets/images/compressed/2.jpg';
import image3 from 'src/assets/images/compressed/3.jpg';
import image4 from 'src/assets/images/compressed/4.jpg';
import image5 from 'src/assets/images/compressed/5.jpg';
import image6 from 'src/assets/images/compressed/6.jpg';
import image7 from 'src/assets/images/compressed/7.jpg';
import image8 from 'src/assets/images/compressed/8.jpg';
import image9 from 'src/assets/images/compressed/9.jpg';
import image10 from 'src/assets/images/compressed/10.jpg';
import image11 from 'src/assets/images/compressed/11.jpg';


const WelcomePage = () => {
    const bgImageURLs = [image0, image1, image2, image11, image4, image3, image6, image7, image8, image9, image10, image5];

    const [isCustomer, setIsCustomer] = useState<boolean | null>(null);

    const handleIsContractor = () => {
        setIsCustomer(false);
    }
    const handleIsCustomer = () => {
        setIsCustomer(true);
    }
    const handleClearIsContractor = () => {
        setIsCustomer(null);
    }

    return <div className="section align-items-center justify-content-center h-100vh">
        <div className="fill overflow-hidden">
            <Gallery images={bgImageURLs} aspectRatio={3/2} gap={0} colsLg={3} overlay={'rgba(0, 0, 0, .5)'}/>
        </div>
        <div className="row justify-content-center">
            <div className="col-10 p-3 p-lg-5 bg-white shadow-lg">
                <div className="pt-3 pt-lg-5" />
                { // STEP 1: user selects either customer or contractor side
                isCustomer == null && <> 
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="alt-font">Let's Get Started</h2>
                        </div>
                    </div>
                    <div className="row g-3 g-lg-5 justify-content-center">
                        <div className="col-12 col-lg-6">
                            <HoverCard className="p-3 p-lg-5 text-center">
                                <h4 className="mb-0">I'm a Customer</h4>
                                <a className="fill" onClick={handleIsCustomer} />
                            </HoverCard>
                        </div>
                        <div className="col-12 col-lg-6">
                            <HoverCard className="p-3 p-lg-5 text-center">
                                <h4 className="mb-0">I'm a Contractor</h4>
                                <a className="fill" onClick={handleIsContractor} />
                            </HoverCard>
                        </div>
                    </div>
                </>}
                { // STEP 2: customers select location, contractors create an account
                // TODO: enable contractors to create an account
                isCustomer != null && <>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="alt-font mb-4">Find Great Contractors In Your Area:</h2>
                            <AutocompleteInput />
                            <div className="pt-5"/>
                            <a className="btn btn-simple btn-icon-arrow-left mb-0" onClick={handleClearIsContractor}>Go Back</a>
                        </div>
                    </div>
                </>
                }
                <div className="pt-5" />
            </div>
        </div>
    </div>
}

export default WelcomePage;
