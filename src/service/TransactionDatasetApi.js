import { logger } from '../logger';
import { Config } from '../utils/Config';



const GetTransactionDataset = async () =>  {

    try{
        // Fetch the dataset
        const response = await fetch("/data-source/CustomerTransactionDataset.json");
        if(!response.ok){
            logger.error("Data not found")
        }
        const data = await response.json();
        logger.log("Fetch customer transaction data")
        return data;
    }catch(error){  
        logger.error(Config.ERR_SOMETHING_WENT_WRONG, error)
        throw new Error(Config.ERR_SOMETHING_WENT_WRONG)
    }
}



export default GetTransactionDataset