const OpenAI = require('openai')

const OpenAimod = async(texttotranslate , language) => {
    console.log(process.env.openaikey)
    

    const options = {
      text:texttotranslate,
      translateLanguage:language
    }

    const texttosend = `Translate This Words:${options.text} And Return Only Translated Version if you cant translate just return "I Cant Translate" TranslateLanguage:${options.translateLanguage}`

    const openai = new OpenAI({
        apiKey: "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",
      });
      const completion = openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {"role": "user", "content": texttosend},
        ],
      });
    return completion.then((result) =>  result.choices[0].message)

      
      

}


module.exports = {OpenAimod}