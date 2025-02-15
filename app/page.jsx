'use client'
import Image from "next/image";
import Header from "./components/Header";
import Main from "./components/Main";
import { Toaster } from "react-hot-toast";
import Howitworks from "./components/Howitworks";
import { useEffect } from "react";
import TranslatorComponent from "./components/TranslatorComponent";
import Footer from "./components/Footer";

export default function Home() {

  
  return (

   <> 
   <Header></Header>


   <Main></Main>
   <Howitworks></Howitworks>
   <Footer></Footer>

   </>
  );
}
