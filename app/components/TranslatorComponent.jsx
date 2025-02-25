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
                    // layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                },
                'google_translate_element'
            );
        };

        
    }, []);
    

  return (

    <div ref={translatorref}  id="google_translate_element"></div>



  )
}
