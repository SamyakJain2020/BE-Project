import { useState, useMemo , useEffect, use } from "react";
const API_PATH = "localhost:5000/ask";
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * A custom hook to handle the chat state and logic
 */
export function useChat() {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<"idle" | "waiting" | "loading">("idle");

  useEffect(() => {
    console.log("chatHistory", chatHistory);
  }
  , [chatHistory]);

  // Lets us cancel the stream
  const abortController = useMemo(() => new AbortController(), []);

  /**
   * Cancels the current chat and adds the current chat to the history
   */
  function cancel() {
    setState("idle");
    abortController.abort();
    if (currentChat) {
      // const newHistory = [
      //   ...chatHistory,
      //   { role: "user", content: currentChat } as const,
      // ];

      // setChatHistory(newHistory);
      setCurrentChat("");
    }
  }

  /**
   * Clears the chat history
   */

  function clear() {
    console.log("clear");
    setChatHistory([]);
  }

  /**
   * Sends a new message to the AI function and streams the response
   */
  const sendMessage =  (message: string, chatHistory: Array<ChatMessage>) => {
    setState("waiting");
    let chatContent = "";
    // const newHistory = [
    //   ...chatHistory,
    //   { role: "user", content: message } as const,
    // ];
    let newHistory = chatHistory;
    newHistory.push({ role: "user", content: message } as const);
    setChatHistory(newHistory);
    const body = JSON.stringify({
      messages: newHistory.slice(-8),
    });

//TODO: IMPLEMENTATION TODO
let raw = JSON.stringify({
  "query":message
});

let myHeaders = new Headers();
myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:5000');
myHeaders.append('Access-Control-Allow-Credentials', 'true');
myHeaders.append("Content-Type", "application/json");

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
    

  console.log("FETCHING");
 fetch("http://127.0.0.1:5000/ask", {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
  
}) .then(response => {
  console.log("RESPONSE");
  console.log(response);
  return response.json();
})
.then(result1 => {
  console.log(result1);
  // TODO: REFORMAT RESULT

  // Parse the metadata and extract content
const metadataArray = result1["metadata"];
console.log("metadataArray",metadataArray);
// const contentsArray = metadataArray.forEach((metadata) => metadata["content"]);

// Concatenate all contents
// const concatenatedContents = contentsArray.join(' ');

// Extract result
const result = result1["result"];

// console.log("Concatenated Contents:", concatenatedContents);
console.log("Result:", result);
  setCurrentChat(result)
  // const newHistory = [
  //   ...chatHistory,
  //   { role: "assistant", content: result } as const,
  // ];
  let newHistory = chatHistory;
  newHistory.push({ role: "assistant", content: result } as const);
  
  setChatHistory(newHistory);
  setState("idle");
  
})
.catch(error => console.log('error', error));


};


//DONE: TEST CODE
// let query = (message:string) => {
//   let raw = JSON.stringify({
//     "query":message
//   });

// let myHeaders = new Headers();
// myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:5000');
// myHeaders.append('Access-Control-Allow-Credentials', 'true');
// myHeaders.append("Content-Type", "application/json");

// let requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };
    

//   console.log("FETCHING");
// fetch("http://127.0.0.1:5000/ask", {
//   method: 'POST',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow',
  
// })
//   .then(response => {
//     console.log("RESPONSE");
//     console.log(response);
//     return response.text()
//   })
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// }

  return { sendMessage, currentChat, chatHistory, cancel, clear, state };
}
