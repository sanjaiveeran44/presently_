import React from 'react';
import './homePage.css';
import Leftmenu from '../components/Leftmenu'

export default function HomePage() {
    return (
        <div className="Home">
            <aside className="menu">
             
                <Leftmenu/>
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