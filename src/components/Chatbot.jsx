import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([{ sender: "bot", text: "Hi! How can I help you today?" }]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message) return;

        const newChat = [...chat, { sender: "user", text: message }];
        setChat(newChat);
        setMessage("");

        try {
            const res = await axios.post("https://aceelectronics.alwaysdata.net/api/chatbot", { message });
            setChat([...newChat, { sender: "bot", text: res.data.response }]);
        } catch (err) {
            setChat([...newChat, { sender: "bot", text: "Sorry, I'm having trouble connecting." }]);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {isOpen && (
                <div className="card bg-dark text-white border-info" style={{ width: '300px', marginBottom: '10px' }}>
                    <div className="card-header border-info d-flex justify-content-between">
                        <span>Ace Assistant</span>
                        <button className="btn-close btn-close-white" onClick={() => setIsOpen(false)}></button>
                    </div>
                    <div className="card-body" style={{ height: '300px', overflowY: 'auto' }}>
                        {chat.map((msg, i) => (
                            <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-end' : 'text-start'}`}>
                                <small className={`p-2 rounded d-inline-block ${msg.sender === 'user' ? 'bg-primary' : 'bg-secondary'}`}>
                                    {msg.text}
                                </small>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={sendMessage} className="card-footer border-info p-2">
                        <div className="input-group">
                            <input type="text" className="form-control form-control-sm bg-dark text-white border-secondary" 
                                value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type here..." />
                            <button className="btn btn-info btn-sm">Send</button>
                        </div>
                    </form>
                </div>
            )}
            <button className="btn btn-info rounded-circle shadow-lg" style={{ width: '60px', height: '60px' }} onClick={() => setIsOpen(!isOpen)}>
                🤖
            </button>
        </div>
    );
};

export default ChatBot;