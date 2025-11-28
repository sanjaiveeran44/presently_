import React, { useState } from 'react';
import './homePage.css';
import Leftmenu from '../components/Leftmenu'
import CenterContainer from '../components/CenterContainer'
import RightPanel from '../components/RightPanel'

export default function HomePage() {

    const [isChatOpen , setIsChatOpen] = useState(false);
    return (
        <div className="Home">
            <aside className="menu">
             
                <Leftmenu isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}/>
            </aside>
            
            <main className="center">
                
                <CenterContainer/>
            </main>
            
            <aside className="right">
               
                {/* <RightPanel isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen}/> */}
            </aside>
        </div>
    );
}