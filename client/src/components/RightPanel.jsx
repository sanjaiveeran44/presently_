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

  const res = await fetch("http://localhost:5000/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: userMessage,
      slideNum: slideNum || null
    })
  });

  const data = await res.json();
  console.log(data.answer)
  return data.answer;
};

  const detectSlideNumber = (text, totalSlides) => {
    const match = text.match(/slide\s*(\d+)/i);
    if (!match) return null;

    const slideNum = parseInt(match[1]);
    if (slideNum >= 1 && slideNum <= totalSlides) return slideNum;

    return null;
  };
  const formatMessage = (msg) => {
  if (msg.sender !== "ai") return msg.text;

  const cleanText = cleanAIOutput(msg.text);

  const lines = cleanText
    .split(/[.\n]/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  return `<ul>${lines.map(line => `<li>${line}</li>`).join("")}</ul>`;
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
  const cleanAIOutput = (text) => {
    return text
      .replace(/[#_*`>\-]+/g, "")        // remove markdown symbols
      .replace(/\s+/g, " ")              // normalize spaces
      .trim();
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
              <div
              className="message-bubble"
              dangerouslySetInnerHTML={{
                __html: msg.sender === "ai" ? formatMessage(msg) : msg.text
              }}
            ></div>
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
