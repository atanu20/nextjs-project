import Head from 'next/head'
import Layout from '../components/Layout'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import Link from 'next/link'
import Products from '../components/product/products'

import axios from 'axios'
import { apiLinks } from '../connection.config'

export default function Home({allproducts}) {
  const [alldata, setAllData] = useState(allproducts)
  const [search, setSearch] = useState("")
  const [filteritem, setFilterItem] = useState("all")
  // console.log(allproducts)
  const onSearch=async(e)=>{
e.preventDefault()

if(search=="")
{

}else{
  if(filteritem==='all')
  {
    const da=allproducts.filter((val)=>val.name.toLowerCase().includes(search.toLowerCase())|| val.description.toLowerCase().includes(search.toLowerCase()) )
  setAllData(da)
  setSearch("")
  }
  else{
    const da=allproducts.filter((val)=> val.category===filteritem && (val.name.toLowerCase().includes(search.toLowerCase())|| val.description.toLowerCase().includes(search.toLowerCase())) )
  setAllData(da)
  setSearch("")
  }
}
  }
  useEffect(() => {
    if(filteritem==='all')
    {
      setAllData(allproducts)
    }
    else{
      const fildata=allproducts.filter((val)=>val.category===filteritem)
      setAllData(fildata)
      
    }
    
   
  }, [filteritem])
  return (
    <>
      <Layout>
        <div className="hero">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-10 col-12 mx-auto">
                <form onSubmit={onSearch}>
                  
                
                <div class="input-group mb-3">
                  <div class="input-group-prepend">

                    <select class="form-control" onChange={(e)=>setFilterItem(e.target.value)} >
                      <option value="all">All</option>
                      <option value="mens">Men's</option>
                      <option value="womens">Women's</option>
                      <option value="kids">Kid's</option>
                    </select>

                  </div>
                  <input type="text" class="form-control" placeholder="Serach . . ." value={search} onChange={(e)=>setSearch(e.target.value)} required />
                  <div class="input-group-append">
                    <button class="btn btn-dark" type="submit">Search</button>
                  </div>
                </div>
                </form>




              </div>
            </div>
            <Products allproducts={alldata} />
           
          </div>


        </div>


      </Layout>
    </>
  )
}

const getAllProductsData=async()=>{
  try{
    const packagesResponse = await axios.get(apiLinks.getproducts);
    if(packagesResponse.data){
        return packagesResponse.data;
    }
    else{
        return [];
    }
}
catch(err){
    console.log(err);
}
}

export async function getServerSideProps(context) {
  try{
    return { props: {
            allproducts: await getAllProductsData()
            } 
        };
    }
    catch(err){
        console.log(err);
        return { props: {allproducts:[]} };
    }
}
