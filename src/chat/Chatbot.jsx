import React, { useState, useEffect, useRef } from "react";
import { HfInference } from "@huggingface/inference";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState("");
  const inferenceRef = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.error("API key is missing");
      return;
    }
    inferenceRef.current = new HfInference(apiKey);
  }, []);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setStreaming("");

    try {
      const stream = inferenceRef.current.chatCompletionStream({
        model: "microsoft/DialoGPT-medium",
        messages: newMessages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        max_tokens: 500,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const newContent = chunk.choices[0]?.delta?.content || "";
        fullResponse += newContent;
        setStreaming(fullResponse);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: fullResponse },
      ]);
      setStreaming("");
    } catch (error) {
      if (error.message.includes("Rate limit reached")) {
        console.error("Rate limit reached. Please try again later.");
        // Maybe update state to show a user-friendly message
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="w-1/4 h-screen bg-red-900 absolute top-0 p-4">
      <div className="mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "user" ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === "user"
                  ? "bg-gray-950 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
        {streaming && (
          <div className="text-left">
            <span className="inline-block p-2 rounded-lg bg-gray-300 text-black">
              {streaming}
            </span>
          </div>
        )}
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          className="w-full p-2 border rounded-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="mt-2 w-full bg-gray-950 text-white p-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
