import axios from "axios";
import { productUrl } from "../api/product";




export const getallProduct=async()=>{
    try{
      const res=await axios.get(productUrl)
      return await res.data

    }catch (error) {
        console.error('Error during the axios request:', error);
      }
 
}
