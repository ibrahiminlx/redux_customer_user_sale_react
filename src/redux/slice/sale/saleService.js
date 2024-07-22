import axios from "axios";
import { SALES, BASE_URL } from "../api/apiUrl";


const allSales = async ()=>{
    const response = await axios.get(BASE_URL + SALES.ALL);
    if (response?.data?.error == true) {
      throw new Error(response?.data?.data);
    }
    return response.data.data;
}
const createSales = async(data)=>{
    const response = await axios.post(BASE_URL + SALES.CREATE,{amount:data.amount,customerId:data.customerId,token:data.token});
    if (response?.data?.error == true) {
      throw new Error(response?.data?.data);
    }
    return response.data.data;
}
const updateSales = async(data)=>{
    const response = await axios.put(BASE_URL + SALES.UPDATE(data.id),{amount:data.amount,customerId:data.customerId});
    if (response?.data?.error == true) {
      throw new Error(response?.data?.data);
    }
    return response.data.data;
}
const deleteSales = async(data)=>{
    const response = await axios.delete(BASE_URL + SALES.DELETE(data));
    if (response?.data?.error == true) {
      throw new Error(response?.data?.data);
    }
    return response.data.data;
}

const saleService={
    allSales,
    createSales,
    updateSales,
    deleteSales
}
export default saleService