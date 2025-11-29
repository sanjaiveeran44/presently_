
import React, { useState } from 'react';
import './RightPanel.css';

const RightPanel = ({setIsChatOpen,isChatOpen}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you with your presentation?', sender: 'ai' }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: 'I can help you with slide summaries, quiz generation, and more!', 
          sender: 'ai' 
        }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`right-panel ${isChatOpen ? 'open' : 'closed'}`}>
      <div className="chat-header">
        <h3>AI Chat</h3>
        <button className="close-btn" onClick={setIsChatOpen(false)}>✕</button>
      </div>
      
      <div className="messages-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
      </div>
      
      <div className="chat-input-area">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          rows="3"
        />
        <button className="send-btn" onClick={handleSend}>
          ✈
        </button>
      </div>
    </div>
  );
};

export default RightPanel;