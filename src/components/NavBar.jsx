import React, { useState, useEffect } from 'react';
import './NavBar.css';
import logo from './logo.png';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.body.classList.toggle("dark-theme", newTheme === "dark");
        document.querySelector('.navbar').classList.toggle("dark-theme", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.body.classList.toggle("dark-theme", savedTheme === "dark");
        document.querySelector('.navbar').classList.toggle("dark-theme", savedTheme === "dark");
    }, []);

    // Closes mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



  return (
    <header className="navbar">
        <div className="nav-left">
            <div className="mobile-nav">
                <a href="#about" className='name'>
                    <h1 className="logo">
                        {/* <span className="material-icons">cloud</span> */}
                        <img className="logo" src={logo} alt="logo" />
                    </h1>
                </a>
                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
                    {isOpen ? (
                        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                            <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04-.04-.06-.05-.09-.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"/>
                        </svg>
                    ) : (
                        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                            <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"/>
                        </svg>
                    )}
                </div>
            </div>
        </div>
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
            {/* About */}
            <a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
                <path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
            </svg> 
            About
        </a>
        
        {/* Skills */}
        <a href="#skills" className="nav-link" onClick={() => setIsOpen(false)}>
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                <path d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8v48zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 00308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 00-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1zM880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path>
            </svg>
            Skills
        </a>

        {/* Experience */}
        <a href="#experience" className="nav-link" onClick={() => setIsOpen(false)}>
            <svg stroke="currentColor" strokeWidth="0" viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"></path>
            </svg> 
            Experience
        </a>

        {/* Education */}
        <a href="#education" className="nav-link" onClick={() => setIsOpen(false)}>
            <svg stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z"></path>
                <path d="M8 6h9v2H8z"></path>
            </svg> 
            Education
        </a>

        {/* Projects */}
        <a href="#projects" className="nav-link" onClick={() => setIsOpen(false)}>
            <svg stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="m21.706 5.291-2.999-2.998A.996.996 0 0 0 18 2H6a.996.996 0 0 0-.707.293L2.294 5.291A.994.994 0 0 0 2 5.999V19c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5.999a.994.994 0 0 0-.294-.708zM6.414 4h11.172l.999.999H5.415L6.414 4zM4 19V6.999h16L20.002 19H4z"></path>
                <path d="M15 12H9v-2H7v4h10v-4h-2z"></path>
            </svg> 
            Projects
        </a>

        {/* Contact */}
        <a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}>
            <svg stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
                <path d="M8 9h8v2H8z"></path>
            </svg> 
            Contact
        </a>
        </nav>
        <div className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            <span className="material-icons">
                {theme === "light" ? "wb_sunny" : "brightness_3"}
            </span>
        </div>
    </header>
);

};

export default NavBar;
