import Cookies from 'js-cookie';
import React, { createContext ,useState ,useEffect } from 'react'

 const DataContext=createContext()
 

const getLocalItmes = () => {
    let list;
    if(typeof window !== 'undefined' )
     {
        list = localStorage.getItem('nextcart');
     }
   

    if (list) {
        return JSON.parse(localStorage.getItem('nextcart'));
    } else {
        return {};
    }
}

const getLocalAddress=()=>{
    let list;
    if(typeof window !== 'undefined' )
     {
        list = localStorage.getItem('_next_user_address');
     }
   

    if (list) {
        return JSON.parse(localStorage.getItem('_next_user_address'));
    } else {
        return {};
    }
}

 const ConTextProvider=({children})=>{
    const [cart, setCart] = useState(getLocalItmes())
   
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        localStorage.setItem('nextcart', JSON.stringify(cart))
     }, [cart]); 
     
    
    useEffect(() => {
        if(Cookies.get('_next_user_address'))
          {
              setAddress(Cookies.get('_next_user_address'))
          }

          if(Cookies.get('_next_user_phone'))
          {
              setPhone(Cookies.get('_next_user_phone'))
          }
          if(Cookies.get('_next_user_name'))
          {
              setName(Cookies.get('_next_user_name'))
          }
       
    }, [])
   

    return(
        <>
        <DataContext.Provider value={{cart,setCart,address, setAddress,phone, setPhone,name, setName}}>
        {children}
        </DataContext.Provider>

        </>
    )
}

export {DataContext,ConTextProvider}