// import { createContext, useEffect, useState } from "react";
// import main from "../config/Gemini";

// export const Context = createContext();

// const ContextProvider = ({ children }) => {
//   // save input data
//   const [response, setResponse] = useState("");
//   // save input data will be displayed
//   const [recentPrompts, setRecentPrompts] = useState("");

//   const [input, setInput] = useState("");
//   // all the input history data
//   const [prevPrompts, setPrevPrompts] = useState([]);

//   // save input data will be displayed and it  will hide the hard coded card
//   const [showResult, setShowResult] = useState(false);
//   // loading will be displayed and later it will hide
//   const [loading, setLoading] = useState(false);
//   // save input data will be displayed on web page
//   const [resulData, setResulData] = useState(""); 

//   const delayPara = (index, next) => {
//   setTimeout(() => {
//     setResulData((prev) => prev + next);
//   }, 75 * index);
// };


//  const onSent = async () => {
//   setLoading(true);
//      setResulData("");
//   setShowResult(true);
//   setRecentPrompts(input)
//  setPrevPrompts(prev => [...prev, input]);
  
//   try {
//     const result = await main(input);
//     let responseArray = result.split("**");
//     let newResponse = "";

//     for (let i = 0; i < responseArray.length; i++) {
//       if (i === 0 || i%2 !==1){
//         newResponse += responseArray[i]
//       }
//       else{
//         newResponse += "<b>"+responseArray[i]+"</b>";
//       } 
//     }
//     let newResponse2 = newResponse.split("*").join("</br>");
//     let newResponseArray = newResponse2.split("")
//     // setPrevPrompts((prev) => [...prev, input]);
//     for(let i=0;i<newResponseArray.length;i++){
//       const nextWord = newResponseArray[i];
//       delayPara(i,nextWord +"")
//     }
//     setPrevPrompts(input);
//   } catch (error) {
//     console.error("Gemini error in onSent:", error);
//   } 
//   setLoading(false);
//   setInput("")
// };


//   useEffect(() => {
//     const run = async (promptText) => {
//       try {
//         const result = await main(input);
//         setResponse(result);
//       } catch (error) {
//         console.error("Gemini API error:", error);
//       }
//     };

//     run();
//   }, []);

//   return <Context.Provider value={{ response,
//       recentPrompts,
//       input,  
//       setInput,
//       prevPrompts,
//       setPrevPrompts,
//       setRecentPrompts,
//       showResult,
//       setShowResult,
//       loading,
//       setLoading,
//       resulData,
//       setResulData,
//       onSent, }}>{children}</Context.Provider>;
// }
// ;

// export default ContextProvider;


import { createContext, useEffect, useState } from "react";
import main from "../config/Gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [response, setResponse] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [input, setInput] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resulData, setResulData] = useState("");

  const delayPara = (index, next) => {
    setTimeout(() => {
      setResulData((prev) => prev + next);
    }, 75 * index);
  };

  const newChat = () =>{
    setLoading(false)
    setShowResult(false)
  }

 const onSent = async (prompt) => {
  if (!input.trim()) return;

  setLoading(true);
  setResulData("");
  setShowResult(true);

  try {
    const result = await main(prompt || input);
    setResponse(result); // ✅ Use setResponse instead of assigning to response directly
    setRecentPrompts(prompt || input);
    setPrevPrompts((prev) => [...prev, prompt || input]);

    let responseArray = result.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split("");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord);
    }
  } catch (error) {
    console.error("Gemini error in onSent:", error);
  }

  setLoading(false);
  setInput("");
};


  useEffect(() => {
    const run = async () => {
      try {
        const result = await main(input);
        setResponse(result);
      } catch (error) {
        console.error("Gemini API error:", error);
      }
    };

    run();
  }, []); // This effect runs only once on mount

  return (
    <Context.Provider
      value={{
        response,
        recentPrompts,
        setRecentPrompts,
        input,
        setInput,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resulData,
        setResulData,
        onSent,
        newChat
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
