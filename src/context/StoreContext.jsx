import { createContext, useEffect, useState } from "react";

import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems]=useState({});
    const url="https://foodydesk-backend.onrender.com"
    const [token,setToken]=useState("");

    const [food_list,setFoodList] =useState([])
    // 
    const addToCart = async (itemId)=>{
          if(!cartItems[itemId])//item id not available in the cart so we are setting
          {
            setCartItems((prev)=>({...prev,[itemId]:1}))
          }
          else{  //aur agar present hi h to bas increse kar rha hu
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
          }
         // idhar jo backend m cart ki apis banayi unko integrate kar rha hu frontend se
          if(token){
               await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
          }
    }
    const removeFromCart =async (itemId)=>{  ///isme upar se ulta kar rhe h remove kar rhe h items
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
if(token){
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
}

    }

//     useEffect(()=>{
// console.log(cartItems);
//     },[cartItems]) //this thing is helping me to manage the cart for the items as they arfe being added (maine state ki jagah functions se kaam liya h joki mera storecontext sambhal raha h)

const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){  //idhar maine for in loop li h kyuki constitem is an object and m isse items one one karke iterate karunga
if(cartItems[item]>0){
    let itemInfo=food_list.find((product)=>product._id===item); // this tellls that tthis product is available in the cart
    totalAmount+=itemInfo.price*cartItems[item];
}
       

    }
    return totalAmount;
}
const FetchFoodList = async()=>{
    const response =await axios.get(url+"/api/food/list") 
    setFoodList(response.data.data)
}

const loadCartData = async (token) =>{
const response =await axios.post(url+"/api/cart/get",{},{headers:{token}})

//ab m data ko ek state m store kar rha hu
setCartItems(response.data.cartData);
}
useEffect(()=>{
    // isse jo foood diaplay ho rha h woh backend se aa rh ah
    async function loadData(){
        await FetchFoodList();
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"))
        }
        
    }
    loadData();
},[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
