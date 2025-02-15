import React, { useEffect, useRef } from 'react'

export default function TranslatorComponent() {

    const translatorref = useRef()

    
    useEffect(() => {
     




        const addScript = document.createElement('script');
        addScript.setAttribute(
            'src',
            '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        );
        document.body.appendChild(addScript);
        // debugger
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                },
                'google_translate_element'
            );
        };

        
    }, []);
    

  return (
    <div className="translatorframe text-[14px] text-black">
        Select Language
    <div ref={translatorref}  id="google_translate_element"></div>

    </div>

  )
}
