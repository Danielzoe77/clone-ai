import React, { useContext, useState } from "react";
import "./sidebar.css";
import logo from "../../assets/my lo.png";
import user from "../../assets/user-1.png";
import menu from "../../assets/menu.png";
import message from "../../assets/message.png";
import plus from "../../assets/plus.png";
import settings from "../../assets/settings.png";
import question from "../../assets/question.png";
import history from "../../assets/history.png";


import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompts,newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompts(prompt);
     await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={menu}
          alt="menuicon"
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={plus} alt="plusicon" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry" key={`${item}-${index}`}>
                  <img src={message} alt="messageicon" />
                  <p>{item.slice(0, 20)}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={question} alt="questionicon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={history} alt="historyicon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={settings} alt="settingicon" />

          {/* using this teneray operator usestate extended is false so its hidden */}
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
