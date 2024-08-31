import React from "react";
import './Homepage.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import homepageFeaturedImage from "../../assets/homepage_featured_img.jpg";

const Homepage = () => {
    return (
        <div className="homepage">
                <Header />
            <div className="home-featured-section">
                <div className="featured-section-left">
                    <h2 className="">All Your Banking Needs <br /> Within a Few Taps</h2>
                   <a href="/signup"><button> Create Account </button></a> 
                </div>
                <div className="featured-section-right">
                    <img src={homepageFeaturedImage} alt="" />
                </div>
                
            </div>
            <div className="how-it-works">
                    <h2>How Nano works?</h2>
                    <div className="steps">
                    <div className="how-it-works-steps">
                        <h3>1. <br/> Account Creation</h3>
                        <p>Simply follow the steps mentioned and create an account with Nano just in minutes. Hassle free process and lightning speed activation</p>
                    </div>
                    <div className="how-it-works-steps">
                    <h3>2. <br/> Setup Beneficiaries</h3>
                        <p>Find accounts on Nano and setup them as Beneficiaries to send/recieve payments from them seamlessly.</p>
                    </div>
                    <div className="how-it-works-steps">
                    <h3>3. <br/> Start Using Nano</h3>
                        <p>Well that's it. As simple as that. You can start sending/reciving money from your Beneficiaries and deposit money to your account.</p>
                    </div>
                    </div>
            </div>
            <div className="features">
                 <h2>What you get from a Novo account?</h2>
                 <div className="features-box">
                    <div className="feature">
                    <svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 576 512"><path fill="#244282" d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z"/></svg>
                        <h3>Effortless Money Management</h3>
                        <p>Simply follow the steps mentioned and create an account with Nano just in minutes. Hassle free process and lightning speed activation</p>
                    </div>
                    <div className="feature">
                    <svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 640 512"><path fill="#244282" d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64H337.9c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64h64V320zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"/></svg>
                    <h3>Setup Beneficiaries</h3>
                        <p>Need to send money in a flash? Nano's instant fund transfer feature has you covered. Whether you're splitting bills with friends or sending money to family, enjoy lightning-fast transactions with Nano's secure platform.</p>
                    </div>
                    <div className="feature">
                    <svg xmlns="http://www.w3.org/2000/svg" height="60" width="60" viewBox="0 0 512 512"><path fill="#244282" d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/></svg>   
                    <h3>24X7 Account Access</h3>
                        <p>Your banking needs don't adhere to a schedule, and neither does Nano. Enjoy round-the-clock access to your account, whether you're at home, on the go, or halfway around the world.</p>
                    </div>
                    </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Homepage;