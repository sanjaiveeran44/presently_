import React, { useState, useEffect, useRef } from 'react';
import './RightPanel.css';

const RightPanel = ({ isOpen, onClose ,slides}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you with your presentation?', sender: 'ai' }
  ]);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const sendMessageToAI = async (userMessage) => {
  const slideNum = detectSlideNumber(userMessage, slides.length);
  let slideBase64 = null;

  if (slideNum) {
    const slideUrl = slides[slideNum - 1];

    const resImg = await fetch(`http://localhost:5000/slide-base64?url=${encodeURIComponent(slideUrl)}`);

    const imgData = await resImg.json();
    console.log(imgData);

    slideBase64 = imgData.base64;
  }

  const res = await fetch("http://localhost:5000/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: userMessage,
      slideImage: slideBase64
    })
  });

  const data = await res.json();
  return data.answer;
};




  const detectSlideNumber = (text, totalSlides) => {
    const match = text.match(/slide\s*(\d+)/i);
    if (!match) return null;

    const slideNum = parseInt(match[1]);
    if (slideNum >= 1 && slideNum <= totalSlides) return slideNum;

    return null;
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

 
  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
  if (!message.trim()) return;

  const userMessage = message;
  setMessage("");

 
  setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);

 
  setMessages(prev => [...prev, { text: "typing...", sender: "typing" }]);

  const aiReply = await sendMessageToAI(userMessage);

  setMessages(prev => [
    ...prev.filter(m => m.sender !== "typing"),
    { text: aiReply, sender: "ai" }
  ]);
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

      {/* ⭐ ADD REF HERE */}
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}

        {/* ⭐ Dummy div to help with scrolling */}
        <div ref={messagesEndRef} />
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
