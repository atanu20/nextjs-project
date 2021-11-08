import '../styles/globals.css'
import Head from 'next/head'
import { ConTextProvider } from '../utils/DataContext'
import {useState} from 'react'

function MyApp({ Component, pageProps }) {
  
 
  return (
    <>
    
    <Head>
    <meta charset="UTF-8" />
  <meta name="description" content="Atanu smart cart" />
  <meta name="keywords" content="HTML, CSS, JavaScript" />
  <meta name="author" content="Atanu Jana" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>Smart Cart</title>

   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>


<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </Head>
    <ConTextProvider>
    <Component {...pageProps} />
   
    </ConTextProvider>
    

    </>
  )
}

export default MyApp
