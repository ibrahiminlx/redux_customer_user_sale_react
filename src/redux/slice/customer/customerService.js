import axios from "axios";
import { CUSTOMERS, BASE_URL } from "../api/apiUrl";


const allCustomers = async ()=>{
    const response = await axios.get(BASE_URL + CUSTOMERS.ALL);
    if (response?.data?.error == true) {
      throw new Error(response?.data?.data);
    }
    return response.data.data;
}
const createCustomer = async(data)=>{
    const response = await axios.post(BASE_URL + CUSTOMERS.CREATE,data);
    if (response?.data?.error == true) {
      throw new Error(response?.data?.data);
    }
    return response.data.data;
}
const updateCustomer = async(data)=>{
    const response = await axios.put(BASE_URL + CUSTOMERS.UPDATE(data.id),{name:data.name,phone:data.phone,address:data.address});
    if (response?.data?.error == true) {
      throw new Error(response?.data?.data);
    }
    return response.data.data;
}
const deleteCustomer = async(id)=>{
    const response = await axios.delete(BASE_URL + CUSTOMERS.DELETE(id));
    if (response?.data?.error == true) {
      throw new Error(response?.data?.data);
    }
    return response.data.data;
}

const customerService={
   allCustomers,
   createCustomer,
   updateCustomer,
   deleteCustomer
}
export default customerService