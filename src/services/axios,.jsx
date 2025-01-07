import { Await } from "react-router-dom";
import { userUrl } from "../api/AuthAPI";
import axios from "axios";
import Login from "../auth/Login";



export const RegisterAPi = async(values)=>{
    const user =await userExist(values)
    if(user.length!==0){
        return "this mail alredy used"
    }
    try {     
       await axios.post(userUrl, {
        name: values.name,
        email: values.email,
        password: values.password,
        cart :[],
        order :[]
      });

      // console.log("values====",values)
     

      return  'login successfully'
     
    } catch (error) {
        console.log(error);
    }
}

export const logout = (navigate) => {
   
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  
   
    navigate("/login");  // Adjust the redirect URL based on your app's flow
  };
  
  
export const LoginAPi = async (values) => {
    const user = await userExist(values);  // Check if the user exists
    console.log("user", user);
  
    if (user.length > 0) {  // Make sure user exists
      if (user[0].email === values.email && user[0].password === values.password) {
        localStorage.setItem("user", JSON.stringify(user[0]));  // Save user to localStorage
        localStorage.setItem("id", user[0].id);  // Save user ID
        return await user;  // Return success message
      } else {
        return 'Incorrect password';  // Return error message if password doesn't match
      }
    } else {
      return 'Please register, email could not be found';  // Return error if user doesn't exist
    }
  };

export const getalluser=async()=>{
    try{
      const res=await axios.get(userUrl)
      console.log("getalluser",res.data)
      return await res.data

    }catch (error) {
        console.error('Error during the axios request:', error);
      }
 
}


export const userExist=async(values)=>{
    const data =await  getalluser()
    const user=   await data?.filter((data)=>{
        if(data?.email===values?.email){
            return   data
        }
       })
       return await user 
}
