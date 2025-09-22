import { useRef, useState } from 'react';

// import components
import cv from '../assets/files/cv.pdf';
import DownloadButton from '../common/components/DownloadButton/DownloadButton';
import IconButton from '../common/components/IconButton/IconButton';
import InputField from '../common/components/InputField/InputField';
import Loader from '../common/components/Loader/Loader';
import SubmitButton from '../common/components/SubmitButton/SubmitButton';
import TextAreaField from '../common/components/TextAreaField/TextAreaField';

// import icons
import { AiFillGithub, AiFillHtml5, AiFillLinkedin, AiOutlineEye } from "react-icons/ai";
import { BiLogoCss3, BiLogoGmail, BiLogoJava, BiLogoJavascript } from "react-icons/bi";
import { BsGit, BsPuzzle } from "react-icons/bs";
import { FaMobileAlt, FaReact } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { TbBrandCpp } from "react-icons/tb";

//import images
import Ataa from '../assets/images/Ataa.png';
import Elzero from '../assets/images/Elzero.png';
import GlobalShare from '../assets/images/GlobalShare.png';
import Kasper from '../assets/images/Kasper.png';
import Leon from '../assets/images/Leon.png';
import SokoNumber from '../assets/images/SokoNumber.png';

// import style
import clsx from 'clsx';
import style from './App.module.css';

const skills = [
  { name: 'HTML 5', icon: <AiFillHtml5 size="25px" color="white" />, cssName: "html" },
  { name: 'CSS 3', icon: <BiLogoCss3 size="25px" color="white" />, cssName: "css" },
  { name: 'Java Script', icon: <BiLogoJavascript size="25px" color="white" />, cssName: "java-script" },
  { name: 'React', icon: <FaReact size="25px" color="white" />, cssName: "react" },
  { name: 'Responsive Design', icon: <FaMobileAlt size="25px" color="white" />, cssName: "responsive" },
  { name: 'Git', icon: <BsGit size="25px" color="white" />, cssName: "git" },
  { name: 'Java', icon: <BiLogoJava size="25px" color="white" />, cssName: "java" },
  { name: 'C++', icon: <TbBrandCpp size="25px" color="white" />, cssName: "cpp" },
  { name: 'Problem Solving', icon: <BsPuzzle size="25px" color="white" />, cssName: "problem-solving" }
];

const projects = [
  {
    name: 'Global Share',
    description: 'The Global Share ERP System is an innovative web-based application designed to streamline volunteer recruitment, management, and reward systems...',
    image: GlobalShare
  },
  {
    name: `Ata'a`,
    description: "Ataa is a web application built with React for managing and organizing the operations of a charity organization...",
    image: Ataa
  },
  {
    name: 'SoKo Number',
    description: 'Soko Number is a puzzle game built with the React framework...',
    image: SokoNumber
  },
  {
    name: 'Leon',
    description: 'Leon is a modern and responsive HTML and CSS design template...',
    image: Leon
  },
  {
    name: 'Kasper',
    description: 'Kaspar is a modern and responsive HTML and CSS design template...',
    image: Kasper
  },
  {
    name: 'Elzero',
    description: 'Elzero is a stylish and interactive HTML, CSS, and JavaScript design template...',
    image: Elzero
  },
];

function App() {
  const form = useRef();
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ fixed: no nested function
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form.current);
    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (res.ok) {
        alert("✅ Message saved successfully!");
        form.current.reset();
      } else {
        alert("❌ Failed to save message.");
      }
    } catch (err) {
      alert("⚠️ Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.app}>
      {/* Navbar */}
      <div className={style.nav}>
        <a className={style.logo}>
          <FaReact color='var(--primary-main)' size='50px' />
          <h5>N SATISH</h5>
        </a>
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#Projects">Projects</a></li>
          <li><a href="#Contact">Contact</a></li>
        </ul>
        <div className={style["menu-icon"]}>
          <input id='checkbox' className={style["checkbox2"]} type="checkbox" />
          {/* ✅ fixed: htmlFor instead of for */}
          <label
            className={`${style.toggle} ${style.toggle2}`}
            htmlFor="checkbox"
            onClick={() => setMenu(!menu)}
          >
            <div className={`${style.bars} ${style.bar4}`}></div>
            <div className={`${style.bars} ${style.bar5}`}></div>
            <div className={`${style.bars} ${style.bar6}`}></div>
          </label>
        </div>
      </div>

      {menu === true && (
        <ul className={style.menu}>
          <li><a href="#Home">Home</a></li>
          <li><a href="#About">About</a></li>
          <li><a href="#Projects">Projects</a></li>
          <li><a href="#Contact">Contact</a></li>
        </ul>
      )}

      {/* Home */}
      <div id='Home' className={style.home}>
        <div className={style["home-content"]}>
          <h1>HEY, I'M N SATISH</h1>
          <p>I am a 3rd Year B.Tech CSE (Honours) student, passionate about building modern and efficient web applications...</p>
          <a href={cv} download="cv-PDF-document" target="_blank" rel="noopener noreferrer">
            <DownloadButton>Download CV</DownloadButton>
          </a>
        </div>
        <div className={style["scroll-icon"]}>
          <div className={style["scroll-down"]}>
            <div className={style.chevrons}>
              <div className={style["chevron-down"]}></div>
              <div className={style["chevron-down"]}></div>
            </div>
          </div>
        </div>
        <div className={style["contact-nav"]}>
          <a className={style.github} target="_blank" href='https://github.com/SATII2004'>
            <AiFillGithub size="30px" color='black' />
          </a>
          <a className={style.linkedin} target="_blank" href='https://www.linkedin.com/in/nsatish20/'>
            <AiFillLinkedin size="30px" color='black' />
          </a>
          <a className={style.gmail} target="_blank" href="mailto:2300030457cse3@gmail.com?subject=SendMail&body=Description">
            <BiLogoGmail size="30px" color='black' />
          </a>
        </div>
      </div>

      {/* About */}
      <div id='About' className={style.about}>
        <div className={style.container}>
          <h2 className={style.title}>About Me</h2>
          <p>Here you will find more information about me, what I do, and my current skills...</p>
          <div className={style["about-content"]}>
            <div className={style["about-info"]}>
              <h3>Get to know me!</h3>
              <p>
                I'm a <span>3rd Year B.Tech CSE (Honours) Student</span> passionate about building modern Web Applications...
              </p>
            </div>
            <div className={style["my-skill"]}>
              <h3>My Skills</h3>
              <div className={style.skills}>
                {skills.map((skill, index) => (
                  <div key={`skill${index}`} className={`${style.skill} ${style[skill.cssName]}`}>
                    <div className={style["skill-name"]}>{skill.name}</div>
                    <div className={style["skill-icon"]}>{skill.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div id='Projects' className={style.projects}>
        <div className={style.container}>
          <h2 className={style.title}>Projects</h2>
          <p>Here you will find some of the personal projects...</p>
          <div className={style["projects-list"]}>
            {projects.map((project, index) => (
              <div key={`project${index}`} className={style.project}>
                <div className={style["project-image"]}>
                  <img src={project.image} alt="Project" />
                </div>
                <div className={style["project-info"]}>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className={style["project-buttons"]}>
                    <IconButton
                      width="170px"
                      height="50px"
                      backgroundColor="var(--primary-main)"
                      color="white"
                      link={project.link}
                      icon={<AiOutlineEye size="25px" color='white' />}
                    >
                      Live Demo
                    </IconButton>
                    <IconButton
                      width="100px"
                      height="50px"
                      backgroundColor="black"
                      color="white"
                      link={project.github}
                      icon={<AiFillGithub size="25px" color='white' />}
                    >
                      Github
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id='Contact' className={style.contact}>
        <div className={style.container}>
          <h2 className={style.title}>Contact</h2>
          <p>Feel free to Contact me by submitting the form below...</p>
          <form
            ref={form}
            onSubmit={sendEmail}
            className={clsx({ [style['inactive-form']]: loading })}
          >
            <InputField width="700px" height="40px" name="name" placeholder="Enter Your Name" label="Name" type="text" />
            <InputField width="700px" height="40px" name="email" placeholder="Enter Your Email" label="Email" type="email" />
            <TextAreaField width="700px" height="250px" name="message" placeholder="Enter Your Message" label="Message" type="text" />
            <SubmitButton
              icon={<RiSendPlaneFill size="20px" color='white' />}
              width="200px"
              height="60px"
              color="white"
              backgroundColor="var(--primary-main)"
            >
              Submit
            </SubmitButton>
            {loading && (
              <div className={style.loader}>
                <Loader />
              </div>
            )}
          </form>
        </div>
      </div>

      {/* footer */}
      <div className={style.footer}>
        <div className={style.container}>
          <div className={style["footer-info"]}>
            <div>
              <h3>N SATISH</h3>
              <p>I am a 3rd Year B.Tech CSE (Honours) student...</p>
            </div>
            <div className={style.social}>
              <h3>Social</h3>
              <div>
                <a className={style.git} target="_blank" href='https://github.com/SATII2004'>
                  <AiFillGithub size="30px" color='white' />
                </a>
                <a className={style.linkedin} target="_blank" href='https://www.linkedin.com/in/nsatish20/'>
                  <AiFillLinkedin size="30px" color='white' />
                </a>
                <a className={style.gmail} target="_blank" href="mailto:230003047cse3@gmail.com?subject=SendMail&body=Description">
                  <BiLogoGmail size="30px" color='white' />
                </a>
              </div>
            </div>
          </div>
          <div className={style["copy-right"]}>
            © Copyright 2025. Made by <span>N SATISH</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
