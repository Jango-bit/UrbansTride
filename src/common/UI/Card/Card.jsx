// import React, { useEffect, useState } from 'react'
// import { getallProduct } from '../services/product';

// function Card() {
//     console.log(getallProduct());
//     const[products,Setproducts]=useState('')
//     useEffect(()=>{
//         const fetchproducts=async()=>{
//             try{
//                 const data=await getallProduct()
//                 Setproducts(data)
//                 console.log(data);
                
//             }catch(error){
//                 console.log('error fetching products:',error);
                
//             }

//         }
//         fetchproducts()
//     },)
    
//   return (

 
//     <div>
   
//         <ul>
//           {products.length>0?(
//             products.map((products)=>(
//                 <li key={products.id}>{products.name}</li>

//             ))
//         ):(
//             <p>Loading....</p>
//           )}

//         </ul>
    
//     </div>
//   )
// }

// export default Card


// import React from 'react'

// const Card = () => {
//   return (
//     <div>
       
      
//     </div>
//   )
// }

// export default Card
