import React from 'react';
import './homePage.css';

export default function HomePage() {
    return (
        <div className="Home">
            <aside className="menu">
             
                <h3>Menu</h3>
                <p>Menu items will go here</p>
            </aside>
            
            <main className="center">
                
                <h2>Presentation Area</h2>
                <p>Your slides/content will appear here</p>
            </main>
            
            <aside className="right">
               
                <h3>AI Assistant</h3>
                <p>Chat interface will appear here</p>
            </aside>
        </div>
    );
}