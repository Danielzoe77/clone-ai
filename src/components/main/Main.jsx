import React from "react";
import "./main.css";
import user from "../../assets/user-1.png";
import logo from "../../assets/my lo.png";
import gemini from "../../assets/gemini.png";
import send from "../../assets/send.png";
import mic from "../../assets/microphone.png";
import photo from "../../assets/photo.png";
import comment from "../../assets/comment.png";
import compass from "../../assets/compass.png";
import code from "../../assets/code.png";
import lightbulb from "../../assets/lightbulb.png";
import { Context } from "../../context/Context";
import { useContext } from "react";

const Main = () => {
  const {
    onSent,
    recentPrompts,
    showResult,
    loading,
    resulData,
    setResulData,
    setRecentPrompt,
    setInput,
    input,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={user} alt="userimage" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can i help you today</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest a workout routine wit various Ai tools</p>
                <img src={compass} alt="compassicon" />
              </div>
              <div className="card">
                <p>Suggest beautiful Ai tools to use for writting</p>
                <img src={lightbulb} alt="bulbicon" />
              </div>
              <div className="card">
                <p>Brainstormin sessions with various Ai tools Ai tools</p>
                <img src={comment} alt="messaege" />
              </div>
              <div className="card">
                <p>Believe in what God has made you God never made a failure</p>
                <img src={code} alt="codeicon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={user} alt="usericon" />
              <p>{recentPrompts}</p>
            </div>
            <div className="result-data">
              <img src={gemini} alt="geminiicon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p>{resulData}</p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={photo} alt="gallaeryicon" />
              <img src={mic} alt="micicon" />
            {input?<img onClick={() => onSent(input)}src={send} alt="sendicon" />:null}  
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, about people so double-check its
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
