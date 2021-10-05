import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

//importing components from components/index.js file
import { ChanellContainer, ChanellListContainer, Auth } from "./components";
import "./App.css";

const cookies = new Cookies();

const apiKey = "42ttr4jpkcyj";
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      image: cookies.get("avatarURL"),
      phoneNumber: cookies.get("phoneNumber"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}

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
