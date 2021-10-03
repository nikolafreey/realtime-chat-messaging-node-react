import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

//importing components from components/index.js file
import { ChanellContainer, ChanellListContainer, Auth } from "./components";
import "./App.css";

const apiKey = "42ttr4jpkcyj";

const client = StreamChat.getInstance(apiKey);

const authToken = false;

const App = () => {
  if (!authToken) return <Auth />;

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChanellListContainer />
        <ChanellContainer />
      </Chat>
    </div>
  );
};

export default App;
