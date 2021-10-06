import React from "react";
import { AddChannel } from "../assets";

const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel__list">
        <p className="team-channel__list__message">
          Connection Error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel__list">
        <p className="team-channel__list__message loading">
          {type === "team" ? "Channels" : "Messages"} loading ...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsEditing={setIsEditing}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setToggleContainer={setToggleContainer}
          type={type === "team" ? "team" : "messaging"}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
