import axios from "axios"
import { useState } from "react"


const Chat = () => {

    const [userInput, setUserInput] = useState("")
    const [botResponse, setBotResponse] = useState("")
    const [showInput, setShowInput] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleUserInput = (event) => {
        setUserInput(event.target.value)
    }

    const toggleInput = () => {
        showInput(!setShowInput)
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
            setBotResponse(generatedText)
        } catch (error) {
            console.error("Error", error)
        }   

        setIsLoading(false)
    }
    

    return (
        <div className="chat-component">
            <button className="chat-button" onClick={toggleInput}>
                {showInput ? 'Close chat' : 'Ask a question'}
            </button>
            {showInput && (
                <form className="chat-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleUserInput}
                        placeholder="Type your question"
                        className="chat-input"
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