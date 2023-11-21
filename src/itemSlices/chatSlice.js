import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CHAT_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}/chat`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}/message`;

const initialState = {
    status: "",
    error: "",
    conversations: [],
    activeConversation: {},
    messages: [],
    notifications: [],
    files: [],
  };

  // get all conversations

  export const getUserConversations = createAsyncThunk(
    "chat/all",
    async (token, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(CHAT_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data);
        return data;
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const openOrCreateUserConversations = createAsyncThunk(
    "chat/openorcreate",
    async (values, { rejectWithValue }) => {
      const {token, receiverId} = values;
      try {

        // here we are sending receiverId to the backend because we create a new conversation with the receiverId
        const { data } = await axios.post(CHAT_ENDPOINT, {receiverId}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data);
        return data;
      } catch (error) {
        
        return rejectWithValue(error.message);
      }
    }
  );

  export const getUserConversationMessages = createAsyncThunk(
    "chat/messages",
    async (values, { rejectWithValue }) => {
      const { token, chatId } = values;
      try {
        const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
        
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  // send messages from the input to the backend
  export const   sendUserMessage = createAsyncThunk(
    "message/send",
    async (values, { rejectWithValue }) => {
      const { token, message, chatId, files } = values;
      try {
        const { data } = await axios.post(
          MESSAGE_ENDPOINT,
          {
            message: message,
            chatId,
            files,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
      setActiveConversation: (state, action) => {
        state.activeConversation = action.payload;
      },
      updateMessagesAndChats: (state, action) => {
      
        //update messages
        let convo = state.activeConversation;
        if (convo._id === action.payload.chat._id) {
          state.messages = [...state.messages, action.payload];
        }
 
        //update conversations
        let chat = {
          ...action.payload.chat,
          latestMessage: action.payload,
        };
        let newChats = [...state.conversations].filter(
          (c) => c._id !== chat._id
        );
        newChats.unshift(chat);
        state.conversations = newChats;
      },

      addFiles: (state, action) => {
        state.files = [...state.files, action.payload];
      },

      clearFiles: (state, action) => {
        state.files = [];
      },

      removeFileFromFiles: (state, action) => {
        let index = action.payload;
        let files = [...state.files];
        let fileToRemove = [files[index]];
        state.files = files.filter((file) => !fileToRemove.includes(file));
      },
    },
    extraReducers(builder) {
      builder
        .addCase(getUserConversations.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getUserConversations.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.conversations = action.payload;
        })
        .addCase(getUserConversations.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
          console.log(action.payload);
        })
        .addCase(openOrCreateUserConversations.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(openOrCreateUserConversations.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.activeConversation = action.payload;
          state.files = [];
        })
        .addCase(openOrCreateUserConversations.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(getUserConversationMessages.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getUserConversationMessages.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.messages = action.payload;
        })
        .addCase(getUserConversationMessages.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload; 
        })
        .addCase(sendUserMessage.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(sendUserMessage.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.messages = [...state.messages, action.payload];

          // it automatically adds the new message to the active conversation and update the last message in the list of messages in the active conversation
          let chat = {
            ...action.payload.chat,
            latestMessage: action.payload,
          };
          let newChats = [...state.conversations].filter(
            (c) => c._id !== chat._id
          );
          newChats.unshift(chat);
          state.conversations = newChats;
          state.files = [];
        })
        .addCase(sendUserMessage.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });

  export const {
    setActiveConversation,
    updateMessagesAndChats,
    addFiles,
    clearFiles,
    removeFileFromFiles,
  } = chatSlice.actions;

  export default chatSlice.reducer;