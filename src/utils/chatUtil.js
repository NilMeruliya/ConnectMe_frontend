export const getUserConversationId = (user, users) => {

  // it checks if the user in the list is the same as the user logged in
    return users[0]._id === user._id ? users[1]._id : users[0]._id;
  };
  export const getUserConversationName = (user, users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
  };
  export const getUserConversationPicture = (user, users) => {
    return users[0]._id === user._id ? users[1].picture : users[0].picture;
  };



  export const checkOnlineStatus = (onlineUsers, user, users) => {
    let chatId = getUserConversationId(user, users);
    let check = onlineUsers.find((u) => u.userId === chatId);
    return check ? true : false;
  };
  