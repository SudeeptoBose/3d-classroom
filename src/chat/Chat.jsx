import axios from "axios"
import { useState } from "react"


const Chat = () => {

    const [userInput, setUserInput] = useState("")
    const [botResponse, setBotResponse] = useState("")
    const [chatHistory, setChatHistory] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleUserInput = (event) => {
        setUserInput(event.target.value)
    }

    const toggleInput = () => {
        setShowInput(!showInput)
        setIsLoading(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post(
                "http://localhost:3001/api/chatgpt",
                {
                    message: userInput,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            const generatedText = response.data.response
            setChatHistory([...chatHistory, {user: userInput, bot: generatedText}])
            setUserInput("")
        } catch (error) {
            console.error("Error", error)
        }   

        setIsLoading(false)
    }

    const handleClear = () => {
        setChatHistory([])
        setUserInput("")
    }
    

    return (
        <div className="absolute px-7 top-36 h-1/2 w-96 bg-red-700 rounded-tr-3xl rounded-br-3xl">
            <button className="mt-2 p-2 rounded-md bg-slate-100" onClick={toggleInput}>
                {showInput ? 'Close chat' : 'Ask a question'}
            </button>
            {showInput && (
                <form className="chat-form mt-2" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        placeholder="Type your question"
                        className="chat-input p-2"
                    />
                    <button type="submit" disabled={isLoading} className="submit-button">
                        {isLoading ? "Sending.." : "Send"}
                    </button>
                </form>
            )}
            {botResponse && (
                <div className="chat-box">
                    <p className="teacher-response">{botResponse}</p>
                </div>
            )}
        </div>
    )
}

export default Chat