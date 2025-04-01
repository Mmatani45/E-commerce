import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = '10';
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});

    const addToCart = async (itemId,size) => {
        let cartData = structuredClone(cartItems);
       
        if (!size || size.trim() === "") {  // Check if size is actually selected
            toast.error("Select Product Size");
            return;
        }

     
        
       
        if(cartData[itemId])
        {
           if(cartData[itemId][size])
           {
            cartData[itemId][size] += 1;
           }
           else
           {
            cartData[itemId][size] =  1;
           }
        }
        else
        {
         cartData[itemId] = {};
         cartData[itemId][size] = 1;
    
        }
        setCartItems(cartData);
        
    }
     

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems)
        {
            for(const item in cartItems[items])
            {
                try{
                    if(cartItems[items][item] > 0)
                    {
                        totalCount += cartItems[items][item];
                    }

                }catch(error)
                {

                }
            }
        }
        return totalCount;
    }

    const value = {
          products ,currency, delivery_fee,
          search,setSearch,showSearch,setShowSearch,
          cartItems,addToCart,getCartCount
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}

        </ShopContext.Provider>
    )
}
export default ShopContextProvider; 
