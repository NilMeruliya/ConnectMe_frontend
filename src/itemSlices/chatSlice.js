import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CHAT_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}/chat`;
// const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;

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
  

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
      setActiveConversation: (state, action) => {
        state.activeConversation = action.payload;
      },
    //   updateMessagesAndConversations: (state, action) => {
    //     //update messages
    //     let convo = state.activeConversation;
    //     if (convo._id === action.payload.conversation._id) {
    //       state.messages = [...state.messages, action.payload];
    //     }
    //     //update conversations
    //     let conversation = {
    //       ...action.payload.conversation,
    //       latestMessage: action.payload,
    //     };
    //     let newConvos = [...state.conversations].filter(
    //       (c) => c._id !== conversation._id
    //     );
    //     newConvos.unshift(conversation);
    //     state.conversations = newConvos;
    //   },
    //   addFiles: (state, action) => {
    //     state.files = [...state.files, action.payload];
    //   },
    //   clearFiles: (state, action) => {
    //     state.files = [];
    //   },
    //   removeFileFromFiles: (state, action) => {
    //     let index = action.payload;
    //     let files = [...state.files];
    //     let fileToRemove = [files[index]];
    //     state.files = files.filter((file) => !fileToRemove.includes(file));
    //   },
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
    //     .addCase(open_create_conversation.pending, (state, action) => {
    //       state.status = "loading";
    //     })
    //     .addCase(open_create_conversation.fulfilled, (state, action) => {
    //       state.status = "succeeded";
    //       state.activeConversation = action.payload;
    //       state.files = [];
    //     })
    //     .addCase(open_create_conversation.rejected, (state, action) => {
    //       state.status = "failed";
    //       state.error = action.payload;
    //     })
    //     .addCase(getConversationMessages.pending, (state, action) => {
    //       state.status = "loading";
    //     })
    //     .addCase(getConversationMessages.fulfilled, (state, action) => {
    //       state.status = "succeeded";
    //       state.messages = action.payload;
    //     })
    //     .addCase(getConversationMessages.rejected, (state, action) => {
    //       state.status = "failed";
    //       state.error = action.payload;
    //     })
    //     .addCase(sendMessage.pending, (state, action) => {
    //       state.status = "loading";
    //     })
    //     .addCase(sendMessage.fulfilled, (state, action) => {
    //       state.status = "succeeded";
    //       state.messages = [...state.messages, action.payload];
    //       let conversation = {
    //         ...action.payload.conversation,
    //         latestMessage: action.payload,
    //       };
    //       let newConvos = [...state.conversations].filter(
    //         (c) => c._id !== conversation._id
    //       );
    //       newConvos.unshift(conversation);
    //       state.conversations = newConvos;
    //       state.files = [];
    //     })
    //     .addCase(sendMessage.rejected, (state, action) => {
    //       state.status = "failed";
    //       state.error = action.payload;
    //     });
    },
  });

  export const {
    setActiveConversation,
    // updateMessagesAndConversations,
    // addFiles,
    // clearFiles,
    // removeFileFromFiles,
  } = chatSlice.actions;

  export default chatSlice.reducer;