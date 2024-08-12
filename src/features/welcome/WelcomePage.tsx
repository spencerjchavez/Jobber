import { useState } from "react";
import Gallery from "src/components/Gallery";
import HoverCard from "src/components/HoverCard";
import AutocompleteInput from "../locations/AutocompleteInput";

const WelcomePage = () => {
    const bgImageURLs = Array.from({length: 12}).map((_, i) => `/src/assets/images/${i}.jpg`);

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

    return <div className="section fill d-flex flex-column align-items-center justify-content-center">
        <div className="fill overflow-hidden">
            <Gallery images={bgImageURLs} gap={0} colsLg={3} overlay={'rgba(0, 0, 0, .5)'}/>
        </div>
        <div className="row justify-content-center">
            <div className="col-9 p-5 bg-white shadow-lg">
                <div className="pt-5" />
                { // STEP 1: user selects either customer or contractor side
                isCustomer == null && <> 
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="alt-font">Let's Get Started</h2>
                        </div>
                    </div>
                    <div className="row g-5 justify-content-center">
                        <div className="col-6">
                            <HoverCard className="p-5 text-center">
                                <h4 className="mb-0">I'm a Customer</h4>
                                <a className="fill" onClick={handleIsCustomer} />
                            </HoverCard>
                        </div>
                        <div className="col-6">
                            <HoverCard className="p-5 text-center">
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
