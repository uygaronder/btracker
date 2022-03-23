import React from 'react';
import "../Home.css";

class Home extends React.Component{
    render(){
        return(
            <div id='home'>
                <nav>
                    <a href='*'><h2><i className="fas fa-bug"></i> BTrack</h2></a>
                    <ul id='anchors'>
                        <li><a href='*'>Features</a></li>
                        <li><a href='*'>For Team</a></li>
                        <li><a href='*'>Resources</a></li>
                    </ul>
                    <ul id='navButtons'>
                        <li><a href='/signin'>Sign In</a></li>
                        <li><a href='/register'><button>Get Started</button></a></li>
                        
                    </ul>
                </nav>
                {/* Hero Section */}
                <section id='hero'>
                    <div>
                        <h2>Track Bugs with BTrack</h2>
                        <p>BTrack is a bug tracking application built for teams. Lorem ipsum dolor, sit amet. Lorem ipsum dolor, sit amet</p>
                        <div>
                            <a href='/register'><button>Get Started</button></a>
                        </div>
                    </div>
                    <div>
                        <img src={require("../res/bugPic.png")} alt='svg'/>
                    </div>
                </section>
            </div>
        )
    }
}

export default Home