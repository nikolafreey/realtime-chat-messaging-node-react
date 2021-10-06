import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from ".";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";

const cookies = new Cookies();

const Sidebar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <img src={HospitalIcon} alt="Hospital" width="30" />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Lougout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessageFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const logout = () => {
  cookies.remove("token");
  cookies.remove("userId");
  cookies.remove("username");
  cookies.remove("fullName");
  cookies.remove("avatarURL");
  cookies.remove("hashedPassword");
  cookies.remove("phoneNumber");

  window.location.reload();
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <Sidebar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="team"
              setToggleContainer={setToggleContainer}
              isCreating={isCreating}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessageFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              type="messaging"
              isCreating={isCreating}
              setIsEditing={setIsEditing}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setToggleContainer={setToggleContainer}
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>
      <div
        className="channel-list__container-responsive"
        style={{ left: toggleContainer ? "0%" : "-89%", background: "#005fff" }}
      >
        <div
          className="channel-list__container-toggle"
          onClick={() => setToggleContainer((prevToggle) => !prevToggle)}
        >
          <ChannelListContent
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
            setToggleContainer={setToggleContainer}
          />
        </div>
      </div>
    </>
  );
};

export default ChannelListContent;
