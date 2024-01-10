import React, { useEffect, useState } from "react";
import Inbox from "./Inbox";
import Chat from "./Chat";
import Profiles from "./Profiles";
import Toggle from "./Toggle";
import { io } from "socket.io-client";
import { Toaster } from "sonner";
import bgimg from "../assets/bgimg.png";
const Home = () => {
  const [messagesData, setmessagesData] = useState([null]);
  const [userData, setUserData] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth <= 1150);
    };

    checkWindowSize();

    window.addEventListener("resize", checkWindowSize);

    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);

  return (
    <>
      <Toaster richColors duration={5000} position="top-center" />
      {isMobile ? (
        <span className="h-[90vh] w-full flex items-center justify-center text-center relative">
          <p className="z-10 w-[90%] font-poppins font-medium  text-xl bg-white dark:bg-indigo-950 dark:text-white p-2 py-4 shadow-xl shadow-slate-300 dark:shadow-slate-500 rounded-lg">
            Dear mobile users, our web app is currently on a desktop-only
            vacation due to a time inconsistency situation. Your screens deserve
            a holiday too! Stay tuned, and we might bring the sun to your mobile
            shores in the future. 🌞💻
          </p>
          <img
            src={bgimg}
            alt="Background Image"
            className="absolute -z-1 top-1 blur-[6px] h-screen"
          />
        </span>
      ) : (
        <div className="w-screen m-auto flex items-center justify-center dark:bg-cyan-950 dark:text-white">
          <Inbox
            setmessagesData={setmessagesData}
            setUserData={setUserData}
            // UserArray={UserArray}
          />
          <Chat
            setmessagesData={setmessagesData}
            messagesData={messagesData}
            userData={userData}
          />
          <Profiles />
        </div>
      )}
    </>
  );
};

export default Home;
