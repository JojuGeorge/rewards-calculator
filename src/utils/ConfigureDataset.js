
export const ConfigureDataset =(dataSet)=> {
    const data = dataSet;
    SortName(data)
    return data
  
}


const SortName = (data) => {
    data.sort((a,b) =>  a.customerName - b.customerName)
    console.log(data)
}
