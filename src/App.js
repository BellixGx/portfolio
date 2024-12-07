import React, { useEffect, useState } from 'react';

import './App.css';
import './styles/sections.css';
import profilLogo from './assets/ammine.jpg';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import tmpaLogo from './icons/logo.png';

// Importing skills svg icons
import { ReactComponent as PythonIcon }  from './assets/svgs/Python.svg';
import { ReactComponent as JavaIcon } from  './assets/svgs/Java.svg';
import { ReactComponent as PHPIcon } from  './assets/svgs/PHP.svg';
import { ReactComponent as ReactIcon } from  './assets/svgs/Reactjs.svg';
import { ReactComponent as AngularIcon } from  './assets/svgs/Angular.svg';
import { ReactComponent as JupyterIcon } from  './assets/svgs/JupyterNotebook.svg';
import { ReactComponent as TableauIcon } from  './assets/svgs/Tableau.svg';
import { ReactComponent as PowerBIIcon } from  './assets/svgs/PowerBI.svg';
import { ReactComponent as MySQLIcon } from  './assets/svgs/MySQL.svg';
import { ReactComponent as SQLServerIcon } from  './assets/svgs/SQLServer.svg';
import { ReactComponent as MongoDBIcon } from  './assets/svgs/MongoDB.svg';
import { ReactComponent as GitIcon } from  './assets/svgs/Git.svg';
import { ReactComponent as FlaskIcon } from  './assets/svgs/Flask.svg';
import { ReactComponent as DockerIcon } from  './assets/svgs/Docker.svg';

const skillss = [
  { name: 'Python', icon: <PythonIcon /> },
  { name: 'Java', icon: <JavaIcon /> },
  { name: 'PHP', icon: <PHPIcon /> },
  { name: 'React.js', icon: <ReactIcon /> },
  { name: 'Angular', icon: <AngularIcon /> },
  { name: 'Jupyter Notebook', icon: <JupyterIcon /> },
  { name: 'Tableau', icon: <TableauIcon /> },
  { name: 'Power BI', icon: <PowerBIIcon /> },
  { name: 'MySQL', icon: <MySQLIcon /> },
  { name: 'SQL Server', icon: <SQLServerIcon /> },
  { name: 'MongoDB', icon: <MongoDBIcon /> },
  { name: 'Git', icon: <GitIcon /> },
  { name: 'Flask', icon: <FlaskIcon /> },
  { name: 'Docker', icon: <DockerIcon /> },
];

  const skills = [
    'Data Science',
    'Reactjs',
    'Node.js',
    'Python',
    'Data Analysis',
    'Machine Learning',
    'Adaptability',
    'Problem Solving'
  ];
  
    const App = () => {
    const [currentSkill, setCurrentSkill] = useState('');
    const [skillIndex, setSkillIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [repos, setRepos] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [languages, setLanguages] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
  
    const [error, setError] = useState({
      name: false,
      email: false,
      subject: false,
      message: false,
    });

  
    // Functions

    useEffect(() => {
      const typingSpeed = 100; // typing speed
      const deletingSpeed = 100; // deleting speed
      const pauseTime = 2000; // pause before starting next skill
  
      const handleTyping = () => {
        const currentWord = skills[skillIndex];
        if (isDeleting) {
          setCurrentSkill(currentWord.substring(0, currentSkill.length - 1));
          if (currentSkill.length === 0) {
            setIsDeleting(false);
            setSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
            setTimeout(() => {}, pauseTime); // pause before typing the next skill
          }
        } else {
          setCurrentSkill(currentWord.substring(0, currentSkill.length + 1));
          if (currentSkill.length === currentWord.length) {
            setIsDeleting(true);
            setTimeout(() => {}, pauseTime); // pause before starting to delete
          }
        }
      };
  
      const timer = setInterval(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
      return () => clearInterval(timer);
    }, [currentSkill, skillIndex, isDeleting]);
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
          top: targetElement.offsetTop - 80, 
          behavior: 'smooth'
        });
      });
    });

    // For Skills Section

    const initialSkillsCount = 6; 
    const [visibleSkillsCount, setVisibleSkillsCount] = useState(initialSkillsCount);

    const handleShowMoreSkills = () => {
      setVisibleSkillsCount((prevCount) => prevCount + (skillss.length - prevCount)); 
    };

    const handleSkillsHide = () => {
      setVisibleSkillsCount(initialSkillsCount);
    };


    // For Projects Section

    const filters = ['All', ...languages];
    const handleFilterChange = (filter) => {
      setActiveFilter(filter);
    };
    const filteredRepos = Array.isArray(repos) && repos.length > 0
    ? (activeFilter === 'All'
        ? repos
        : repos.filter((repo) =>
            repo.languages.some((lang) => {
              if (activeFilter === 'React.js') {
                return ['CSS', 'HTML', 'JavaScript'].includes(lang); // React.js replaced these
              }
              return lang.toLowerCase() === activeFilter.toLowerCase(); // Handle case for Python and other languages
            })
          )
      )
    : [];
  

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const token = process.env.REACT_APP_API_KEY;
        const response = await fetch('https://api.github.com/users/Bellix01/repos', {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        const reposData = await response.json();
        console.log('Fetched repos:', reposData);
  
        // Fetch languages for each repository
        const reposWithLanguages = await Promise.all(
          reposData.map(async (repo) => {
            try {
              const langResponse = await fetch(repo.languages_url);
              const langData = await langResponse.json();
              return { ...repo, languages: Object.keys(langData) }; // Add languages to repo object
            } catch (langError) {
              console.error(`Error fetching languages for ${repo.name}:`, langError);
              return { ...repo, languages: [] }; // Fallback to empty array if no languages
            }
          })
        );
  
        setRepos(reposWithLanguages);
  
        // Extract unique languages from all repos and filter out unwanted languages
        const excludedLanguages = ['Dockerfile', 'TypeScript','C++', 'CMake', 'Dart', 'Swift', 'C', 'Kotlin', 'Objective-C'];
        let uniqueLanguages = [
          ...new Set(reposWithLanguages.flatMap((repo) => repo.languages)),
        ].filter((lang) => !excludedLanguages.includes(lang)); // Filter out unwanted languages
  
        // Replace 'CSS', 'HTML', 'JavaScript' with 'React.js'
        uniqueLanguages = uniqueLanguages.map((lang) => {
          if (['CSS', 'HTML', 'JavaScript'].includes(lang)) {
            return 'React.js';
          }
          return lang;
        });
  
        uniqueLanguages = [...new Set(uniqueLanguages)]; 
        console.log('Unique languages:', uniqueLanguages);
        setLanguages(uniqueLanguages);
      } catch (error) {
        console.error('Error fetching repos:', error);
      }
    };
  
    fetchRepos();
  }, []);

  const initialCount = 6;
  const [visibleCount, setVisibleCount] = useState(6); // Initial number of visible projects

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + (filteredRepos.length - prevCount )); 
  };

  const handleHide = () => {
    setVisibleCount(initialCount); 
  };

  // For Contact Section

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset all errors
    setError({
      name: false,
      email: false,
      subject: false,
      message: false,
    });

    // Check if all fields are filled
    let formIsValid = true;

    if (name === '') {
      setError((prevError) => ({ ...prevError, name: true }));
      formIsValid = false;
    }

    if (email === '') {
      setError((prevError) => ({ ...prevError, email: true }));
      formIsValid = false;
    }

    if (subject === '') {
      setError((prevError) => ({ ...prevError, subject: true }));
      formIsValid = false;
    }

    if (message === '') {
      setError((prevError) => ({ ...prevError, message: true }));
      formIsValid = false;
    }

    const formData = {
      name,
      email,
      subject,
      message,
    };

    if (formIsValid) {
      
      // alert("Form submitted successfully!");
      fetch('http://127.0.0.1:5000/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data); 
         
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        })
        .catch((error) => {
          console.error('Error:', error); 
        });

    }
  };
    
    return (
  
      <div className="App">
        <NavBar />
        {/* Main content */}
        <main>
          <section id="about" className="section about-section">
            <div className="profile-card">
              <div className="profile-image-container">
                <img src={profilLogo} alt="Profile" className="profile-image" />
              </div>
              <h1 className="profile-name">Belhadj Ahmed Ammine</h1>
              <div className="profile-info">
              <div className="job-birthday-container">
                <p className="title-job">
                    <svg viewBox="0 0 24 24" strokeWidth="0" width="1em" height="1em" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 11H10V13H14V11Z" fill="currentColor"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z" fill="currentColor"></path>
                    </svg> 
                  <span className="text">{currentSkill}</span>
                </p>

                <p className="birthday">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" height={'1.2em'} width={'1.2em'} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                  </svg>

                  <span className="text">04-06-2001</span>
                </p>
                
              </div>

              <div className="location-resume-container">
               
                <p className="location">
                    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                        <path d="M854.6 289.1a362.49 362.49 0 00-79.9-115.7 370.83 370.83 0 00-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 00169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0022.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1zm0-617.2c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 551c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"></path>
                    </svg> 
                  <span className="text">AL Hoceima, Morocco</span>
                </p>
                <p className="resume">
                  <svg data-name="Layer 1"  width="1.4em" height="1.4em" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M424.44,147.8c0-.16,0-.33,0-.49a.5.5,0,0,1,0-.12l-.06-.41,0-.11a3.11,3.11,0,0,0-.11-.41.19.19,0,0,0,0-.07c-.05-.15-.1-.29-.16-.43v0a5.2,5.2,0,0,0-1.14-1.69L323,44a5.56,5.56,0,0,0-1.66-1.13l-.07,0-.35-.13-.15-.05-.29-.07-.24-.06-.22,0-.31-.05h0l-.49,0H128.24A40.71,40.71,0,0,0,87.56,83.06V428.94a40.71,40.71,0,0,0,40.68,40.67H383.76a40.71,40.71,0,0,0,40.68-40.67V147.8Zm-99.9-87,81.54,81.69H347A22.51,22.51,0,0,1,324.54,120Zm89.14,368.16a30,30,0,0,1-29.92,29.91H128.24a30,30,0,0,1-29.92-29.91V83.06a30,30,0,0,1,29.92-29.91H313.78V120A33.28,33.28,0,0,0,347,153.23h66.66Z"/><path d="M150.7,235.43h0a5.38,5.38,0,0,0,5.36-5.4l-.1-22.75a42.23,42.23,0,0,1,42-42.34h.17a42.23,42.23,0,0,1,42.17,42l.08,22.75a5.4,5.4,0,0,0,5.38,5.36h0a5.4,5.4,0,0,0,5.37-5.41l-.09-22.74A53,53,0,0,0,218,158.05a34.16,34.16,0,0,0,4.57-3.87,34.85,34.85,0,0,0-24.75-59.4h-.14a34.84,34.84,0,0,0-19.78,63.43,53,53,0,0,0-32.7,49.11l.09,22.75A5.39,5.39,0,0,0,150.7,235.43Zm47.05-129.88h.09a24.09,24.09,0,0,1,.1,48.17h-.1a24.09,24.09,0,0,1-.09-48.17Z"/><path d="M276.36,187.54a5.38,5.38,0,0,0,5.38,5.38H361.4a5.39,5.39,0,0,0,0-10.77H281.74A5.38,5.38,0,0,0,276.36,187.54Z"/><path d="M361.4,224.67H281.74a5.38,5.38,0,0,0,0,10.76H361.4a5.38,5.38,0,0,0,0-10.76Z"/><path d="M361.4,267.18H150.6a5.39,5.39,0,0,0,0,10.77H361.4a5.39,5.39,0,0,0,0-10.77Z"/><path d="M361.4,309.71H150.6a5.38,5.38,0,1,0,0,10.76H361.4a5.38,5.38,0,0,0,0-10.76Z"/><path d="M361.4,352.22H150.6a5.39,5.39,0,0,0,0,10.77H361.4a5.39,5.39,0,0,0,0-10.77Z"/>
                    <path d="M361.4,394.74H150.6a5.38,5.38,0,0,0,0,10.76H361.4a5.38,5.38,0,0,0,0-10.76Z"/>
                  </svg>
                  <span className="text">
                    <a href="https://drive.google.com/file/d/1Aw9H3clqrA7cW7VBlY44SBH6-fj26Met/view?usp=drive_link" target="_blank" rel="noopener noreferrer" >
                      resume
                    </a>
                  </span>
                </p>
              </div>
                <p className="bio">
                Motivated and detail-oriented Junior Data Scientist/Data Analyst with a strong foundation in data analysis, machine learning, deep learning and statistical modeling. Eager to apply theoretical knowledge to real-world problems and develop efficient, 
                data-driven solutions. Holds a Master's degree in Mobiquity & BigData from FST Tangier.
                </p>
                <button className="contact-button" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Get In Touch</button>
              </div>
              <div className="social-links">
                <a href="https://x.com/Bellix_gx" className="icon">
                    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                            <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0075-94 336.64 336.64 0 01-108.2 41.2A170.1 170.1 0 00672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 00-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 01-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 01-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path>
                    </svg> 
                </a>
                <a href="https://www.linkedin.com/in/belhadj1" className="icon">
                    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                            <path d="M847.7 112H176.3c-35.5 0-64.3 28.8-64.3 64.3v671.4c0 35.5 28.8 64.3 64.3 64.3h671.4c35.5 0 64.3-28.8 64.3-64.3V176.3c0-35.5-28.8-64.3-64.3-64.3zm0 736c-447.8-.1-671.7-.2-671.7-.3.1-447.8.2-671.7.3-671.7 447.8.1 671.7.2 671.7.3-.1 447.8-.2 671.7-.3 671.7zM230.6 411.9h118.7v381.8H230.6zm59.4-52.2c37.9 0 68.8-30.8 68.8-68.8a68.8 68.8 0 10-137.6 0c-.1 38 30.7 68.8 68.8 68.8zm252.3 245.1c0-49.8 9.5-98 71.2-98 60.8 0 61.7 56.9 61.7 101.2v185.7h118.6V584.3c0-102.8-22.2-181.9-142.3-181.9-57.7 0-96.4 31.7-112.3 61.7h-1.6v-52.2H423.7v381.8h118.6V604.8z"></path>
                    </svg> 
                </a>
                <a href="https://web.facebook.com/profile.php?id=100083564497747" className="icon">
                    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                        <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"></path>
                    </svg>
                </a>
                <a href='https://github.com/Bellix01'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"  width="1em" height="1em" fill="currentColor" stroke="currentColor" className='icon' strokeWidth="0">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                    </svg>
                </a>

                <a href="mailto:ahmedammine.belhadj@gmail.com">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="0" stroke="currentColor" height={'1em'} width={'1em'} className='icon'>
                    <path fillRule="evenodd" d="M23,20 L23,6 L12,15 L1,6 L1,20 L23,20 Z M12,12 L22,4 L2,4 L12,12 Z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
          {/* /* About Section Ends */ }

          {/* /* Skills Section Starts */ }
          <section id="skills" className="section skills-section">
            <h2>Skills</h2>
          <div className="skills-container">
            <div className="skills-grid" >
            {skillss.slice(0, visibleSkillsCount).map((skill, index) => (
            <div className="skill-card" key={index}>
              {skill.icon}
              <p>{skill.name}</p>
            </div>
          ))}

            </div>
          </div>
          <div className="show-more-container">
            {visibleSkillsCount < skillss.length && (
              <button className="show-hide-button" onClick={handleShowMoreSkills}>Show More</button>
            )}
            {visibleSkillsCount > initialSkillsCount && (
              <button className="show-hide-button" onClick={handleSkillsHide}>Hide</button>
            )}
          </div>
          </section>
          {/* /* Skills Sections Ends */}

          {/* /* Projects Section Starts */}
          <section id="experience" className="experience-section">
          <h2>EXPERIENCE</h2>
          <div className="timeline-card">
            <ul className="timeline">
              <li className="timeline-item">
                <div className="timeline-tail"></div>
                <div className="timeline-icon"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-date-row">
                    <span className="timeline-date">01/03/2024 - 01/07/2024</span>
                  </div>
                  <div className="timeline-company-row">
                    <a href="https://www.tangermedport.com/fr/" className="timeline-company">
                      <span className="company-icon"><img src={tmpaLogo} alt='tmpa logo' ></img></span> <span className="company-name">Tanger Med Port Authority</span>
                    </a>
                  </div>
                  <div className="timeline-role-row">
                    <strong><span className="timeline-role">Internship | Data Science</span></strong>
                  </div>
                  <div className="timeline-description-row">
                     <p className="timeline-description">
                        Provide predictions on truck transit times in the port of 
                        Tanger Med 
                      </p>
                  </div>
                </div>
              </li>

              <li className="timeline-item">
                <div className="timeline-tail"></div>
                <div className="timeline-icon"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-date-row">
                    <span className="timeline-date">01/07/2023 - 15/09/2023</span>
                  </div>
                  <div className="timeline-company-row">
                    <a href="https://www.dnb.com/business-directory/company-profiles.smart_automation_technologies.74739fde0d509827b0bc98f9a4018d60.html" className="timeline-company">
                    <span className="company-icon"><img src="https://cdn0.iconfinder.com/data/icons/business-economy-flat/64/company-64.png" alt='tmpa logo' ></img></span> <span className="company-name">SMART AUTOMATION TECHNOLOGIES</span>
                    </a>
                  </div>
                  <div className="timeline-role-row">
                    <strong><span className="timeline-role">Internship | Data Analysis </span></strong>
                  </div>
                  <div className="timeline-description-row">
                    <p className="timeline-description">
                    collecting and processing data from both entities (drivers 
                    and vehicles), and implemented a deep learning model for 
                    carrying out the project
                    </p>
                  </div>
                </div>
              </li>

              <li className="timeline-item">
                <div className="timeline-tail"></div>
                <div className="timeline-icon"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-date-row">
                    <span className="timeline-date">01/02/2022 - 30/06/2022</span>
                  </div>
                  <div className="timeline-company-row">
                    <a href="http://fso.ump.ma/" className="timeline-company">
                      <span className="company-icon"><img src={"//external-content.duckduckgo.com/ip3/fso.ump.ma.ico"} alt='fso logo' ></img></span> <span className="company-name">Faculty of Science</span>
                    </a>
                  </div>
                  <div className="timeline-role-row">
                    <strong><span className="timeline-role">Internship | Web Developer</span></strong>
                  </div>
                  <div className="timeline-description-row">
                    <p className="timeline-description">
                    Creation of an E-commerce website for the sale of 
                    electronic products using Snadbox Paypal for payment Processing.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </section>
            {/* /* Projects Section Ends*/}

            {/* /* Education Section Starts */}
            <section id="education" className="section education-section">
              <h2>Education</h2>
              <div className="edu-card">
                <ul className="edu-timeline">
                  <li className="edu-timeline-item">
                    <div className="edu-timeline-tail"></div>
                    <div className="edu-timeline-icon"></div>
                    <div className="edu-timeline-content-wrapper">
                      <div className="edu-timeline-date-row">
                        <span className="edu-timeline-date">2022 - 2024</span>
                      </div>
                      <div className="edu-timeline-school-row">
                        <a href="https://fstt.ac.ma/Portail2023/" className="edu-timeline-school">
                          <span className="school-icon"><img src="https://media-exp1.licdn.com/dms/image/C4D0BAQGBq_ur36LjtQ/company-logo_200_200/0/1560684518961?e=2159024400&v=beta&t=AXmSYzXNOQxy6K2AoA3BjauNxLVyB4AK1-TMcHWEdhk" alt="FST logo"></img></span> 
                          <span className="school-name">Faculty of Science and Technology</span>
                        </a>
                      </div>
                      <div className="edu-timeline-degree-row">
                        <strong><span className="edu-timeline-degree">Master in Mobiquity & BigData</span></strong>
                      </div>
                      <div className="edu-timeline-location-row">
                        <span className="edu-timeline-location">+ Location : Tangier</span>
                      </div>
                      <div className="edu-timeline-grade-row">
                        <span className="edu-timeline-grade">+ Moroccan Grading System (MGS) : 13.8/20</span>
                      </div>
                      <div className="edu-timeline-department-row">
                        <span className="edu-timeline-department"> + Department: Computer Science & Engineering</span>
                      </div>
                    </div>
                  </li>

                  <li className="edu-timeline-item">
                    <div className="edu-timeline-tail"></div>
                    <div className="edu-timeline-icon"></div>
                    <div className="edu-timeline-content-wrapper">
                      <div className="edu-timeline-date-row">
                        <span className="edu-timeline-date">2019 - 2022</span>
                      </div>
                      <div className="edu-timeline-school-row">
                        <a href="http://fso.ump.ma/" className="edu-timeline-school">
                          <span className="school-icon"><img src="//external-content.duckduckgo.com/ip3/fso.ump.ma.ico" alt="FSO logo"></img></span>
                          <span className="school-name">Faculty of Science</span>
                        </a>
                      </div>
                      <div className="edu-timeline-degree-row">
                        <strong><span className="edu-timeline-degree">Bachelor Degree in Mathematics & Computer Science</span></strong>
                      </div>
                      <div className="edu-timeline-location-row">
                        <span className="edu-timeline-location">+ Location : Oujda, Morocco</span>
                      </div>
                      <div className="edu-timeline-grade-row">
                        <span className="edu-timeline-grade">+ Moroccan Grading System (MGS) : 15.5/20</span>
                      </div>
                      <div className="edu-timeline-department-row">
                        <span className="edu-timeline-department">+ Department: Computer Science & Engineering</span>
                      </div>
                    </div>
                  </li>

                  <li className="edu-timeline-item">
                    <div className="edu-timeline-tail"></div>
                    <div className="edu-timeline-icon"></div>
                    <div className="edu-timeline-content-wrapper">
                      <div className="edu-timeline-date-row">
                        <span className="edu-timeline-date">2017 - 2019</span>
                      </div>
                      <div className="edu-timeline-school-row">
                        <a href="http://fso.ump.ma/" className="edu-timeline-school">
                          <span className="school-icon"><img src="https://img.icons8.com/?size=48&id=RWH5eUW9Vr7f&format=png" alt="High School logo"></img></span>
                          <span className="school-name">Ibnou Rouchd High School</span>
                        </a>
                      </div>
                      <div className="edu-timeline-degree-row">
                        <strong><span className="edu-timeline-degree">Baccalaureate in Physics Science, French option</span></strong>
                      </div>
                      <div className="edu-timeline-location-row">
                        <span className="edu-timeline-location">+ Location : AL Hoceima, Morocco</span>
                      </div>
                      <div className="edu-timeline-grade-row">
                        <span className="edu-timeline-grade">+ Moroccan Grading System (MGS) : 15.5/20</span>
                      </div>
                      <div className="edu-timeline-department-row">
                        <span className="edu-timeline-department">+ Group: Science</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

          {/* /* Education Section Ends */}

          {/* /* projects Section Starts */}
          <section id="projects" className="section projects-section">
            <h2>Projects</h2>
            <div className="filter-buttons">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="projects-grid">
            {filteredRepos.slice(0, visibleCount).map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <div className="project-card">
                  <h3 className="project-title">
                    <span className="icon-container">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="project-icon"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                        ></path>
                      </svg>
                    </span>
                    {repo.name}
                  </h3>
                  <p>{repo.description || 'No description available'}</p>
                  <div className="project-tags">
                    {repo.languages
                      .filter((lang) => !['Dockerfile', 'TypeScript', 'C++', 'CMake', 'Dart', 'Swift', 'C', 'Kotlin', 'Objective-C'].includes(lang))
                      .map((lang) => (['CSS', 'HTML', 'JavaScript'].includes(lang) ? 'React.js' : lang))
                      .slice(0, 3)
                      .map((lang, index) => (
                        <span key={index}>#{lang}</span>
                      ))}
                  </div>
                  {/* <div className="project-stats">
                    <div className="stat-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="rgba(163, 163, 163, 1)">
                        <path d="M6.516 14.323L5.026 20.775a.998.998 0 0 0 1.529 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454L12 4.454a.998.998 0 0 0-1.822 0l-2.558 5.461-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107z"></path>
                      </svg>
                      {repo.stargazers_count}
                    </div>
                    <div className="stat-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="rgba(163, 163, 163, 1)">
                        <path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 14.534 11 15v.163c-1.44.434-2.5 1.757-2.5 3.337 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.58-1.06-2.903-2.5-3.337V15c0-.466 0-1.171 2.354-2.065 2.298-.872 2.921-2.896 3.087-4.079C19.912 8.441 21 7.102 21 5.5 21 3.57 19.43 2 17.5 2S14 3.57 14 5.5c0 .911.402 1.726 1.036 2.285C14.741 8.357 14 9.119 12 9.119s-2.741-.762-3.036-1.334C9.598 7.226 10 6.411 10 5.5 10 3.57 8.43 2 6.5 2S3 3.57 3 5.5c0 1.602 1.088 2.941 2.559 3.355z"></path>
                      </svg>
                      {repo.forks_count}
                    </div>
                  </div> */}
                </div>
              </a>
            ))}
          </div>

          <div className="show-more-container">
            {visibleCount < filteredRepos.length && (
              <button className="show-hide-button" onClick={handleShowMore}>Show More</button>
            )}
            {visibleCount > initialCount && (
              <button className="show-hide-button" onClick={handleHide}>Hide</button>
            )}
          </div>
        </section>

          {/* /* projects Section Starts */}

          {/* /* Contact Section Starts */}
          <section id="contact" className="section contact-section">
            <h2>Contact</h2>
            <div className="contact-container">
              {/* Left Section */}
              <div className="contact-info">
                <h2>GET IN TOUCH</h2>
                <p>Fill in the form to start a conversation.</p>
                <ul>
                      <li>
                        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                              <path d="M854.6 289.1a362.49 362.49 0 00-79.9-115.7 370.83 370.83 0 00-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 00169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0022.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1zm0-617.2c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 551c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z"></path>
                        </svg>   
                       <span className='location-text'>Al Hoceima, Morocco</span> 
                    </li>
                    <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill= "rgba(163, 163, 163, 1)" ><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
                    </svg>
                      <span className='email-text'>ahmedammine.belhadj@gmail.com</span> 
                    </li>
                </ul>
              </div>
              
              {/* Right Section - Contact Form */}
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={error.name ? 'input-error' : ''}
                    />
                    {error.name && <span className="error-text">Please enter your name</span>}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={error.email ? 'input-error' : ''}
                    />
                    {error.email && <span className="error-text">Please enter your email</span>}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={error.subject ? 'input-error' : ''}
                    />
                    {error.subject && <span className="error-text">Please enter a subject</span>}
                  </div>

                  <div>
                    <textarea
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={error.message ? 'input-error' : ''}
                    />
                    {error.message && <span className="error-text">Please enter your message</span>}
                  </div>

                  <button type="submit">Send a message</button>
                </form>
              </div>
            </div>
          </section>

          {/* /* Contact Section Ends */}
        </main>
        <Footer />
      </div>
      
    );
  };
  
  export default App;
  
