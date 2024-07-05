import axios from 'axios';


async function GetTransactionDataset() {

    try{
        const response = await axios.get("/data-source/CustomerTransactionDataset.json");
        console.log(response.data)
        return response.data;
    }catch(error){
        console.log(error)
    }
}

export default GetTransactionDataset