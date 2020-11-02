import React from 'react';
import './About.css';

const About = props => {
    return (
        <div>
            <p>Related Github Projects:</p>
            <ul>
                <li><a href="https://github.com/pabloubal/toggly-web" target="_blank" rel="noopener noreferrer">Toggly UI</a></li>
                <li><a href="https://github.com/pabloubal/toggly-controller" target="_blank" rel="noopener noreferrer">Toggly Controller</a></li>
                <li><a href="https://github.com/pabloubal/toggly-spring-boot-starter" target="_blank" rel="noopener noreferrer">Toggly Springboot Starter</a></li>
                <li><a href="https://github.com/pabloubal/toggly-js" target="_blank" rel="noopener noreferrer">Toggly JS client</a></li>
            </ul>
            <div className="about-footer">
                <p style={{marginBottom:"5px"}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
            </div>
        </div>
    );
};

export default About;