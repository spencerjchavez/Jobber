import Coordinate from "src/features/locations/Coordinate";
import { API_BASE_URL } from "./Constants";
import IService from "./IService";
import ContractorProps from "src/global-types/ContractorProps";
import { ParseContractorProps } from "./ContractorServiceModels";

export interface FetchContractorsParams {
    searchCoordinates: Coordinate;
    radius: number // km
}

export const fetchContractors: IService<FetchContractorsParams, ContractorProps[]> = async ({searchCoordinates, radius}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(API_BASE_URL + `/contractors/page?latitude=${searchCoordinates.latitude}&longitude=${searchCoordinates.longitude}&radius=${radius}`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            if (res.ok) {
                const contractorsJson = await res.json();
                resolve(
                    ParseContractorProps(contractorsJson)
                );
            } else {
                reject(res.statusText);
            }
        } catch(err) {
            reject(err);
        }
        
    })
}