export const getUserConversationId = (user, users) => {
    return users[0]._id === user._id ? users[1]._id : users[0]._id;
  };
//   export const getUserConversationName = (user, users) => {
//     return users[0]._id === user._id ? users[1].name : users[0].name;
//   };
//   export const getUserConversationPicture = (user, users) => {
//     return users[0]._id === user._id ? users[1].picture : users[0].picture;
//   };