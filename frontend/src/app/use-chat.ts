import { useState, useMemo } from "react";
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

  // Lets us cancel the stream
  const abortController = useMemo(() => new AbortController(), []);

  /**
   * Cancels the current chat and adds the current chat to the history
   */
  function cancel() {
    setState("idle");
    abortController.abort();
    if (currentChat) {
      const newHistory = [
        ...chatHistory,
        { role: "user", content: currentChat } as const,
      ];

      setChatHistory(newHistory);
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
  const sendMessage = (message: string, chatHistory: Array<ChatMessage>) => {
    setState("waiting");
    let chatContent = "";
    const newHistory = [
      ...chatHistory,
      { role: "user", content: message } as const,
    ];

    setChatHistory(newHistory);
    const body = JSON.stringify({
      messages: newHistory.slice(-8),
    });

//TODO: IMPLEMENTATION TODO

};


//TODO: IMPLEMENTATION TODO
let query = (message:string) => {
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
  
})
  .then(response => {
    console.log("RESPONSE");
    console.log(response);
    return response.text()
  })
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}

  return { sendMessage, currentChat, chatHistory, cancel, clear, state };
}
