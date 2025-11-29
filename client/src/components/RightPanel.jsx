
import React, { useState } from 'react';
import './RightPanel.css';

const RightPanel = ({ isOpen, onClose }) => {
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
    <div className={`right-panel ${isOpen ? 'open' : 'closed'}`}>
      <div className="panel-header">
        <h3 className="panel-title">AI Chat</h3>
        <button className="panel-close-btn" onClick={onClose}>
          <span>✕</span>
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
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
          className="chat-textarea"
        />
        <button className="send-btn" onClick={handleSend}>
          <span className="send-icon">→</span>
        </button>
      </div>
    </div>
  );
};

export default RightPanel;