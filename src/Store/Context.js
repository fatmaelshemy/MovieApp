import { createContext, useState } from "react";


export let langContext=createContext()

export default function LangContextProvider(props){
    let[lang,setLang]=useState('en')
    function ChangeLang(newLang) {
        setLang(newLang);
        console.log(newLang)
      }
    return <langContext.Provider value={{lang,ChangeLang}}>
{props.children}
    </langContext.Provider>
}