import axios from 'axios';


const GetTransactionDataset = async () =>  {

    try{
        const response = await fetch("/data-source/CustomerTransactionDataset.json");
        if(!response.ok){
            throw new Error("error")
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error)
    }
}



export default GetTransactionDataset