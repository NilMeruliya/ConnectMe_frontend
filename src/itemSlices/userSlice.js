import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ENDPOINT_AUTH = `${process.env.REACT_APP_BACKEND_ENDPOINT}/auth`;

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
    password: ""
  },
  status: "",
  error: "",
};

export const userRegister = createAsyncThunk('auth/register', async (values, {rejectWithValue}) => {

  try {
    const {data} = await axios.post(`${ENDPOINT_AUTH}/register`, {...values})
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  // can also be written as below as we have same key and value.
  // initialstate

  reducers: {
    logout: (state) => {
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
      state.status = "";
      state.error = ""
    },
  },

  extraReducers(builder){
    builder.addCase(userRegister.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(userRegister.fulfilled,  (state, action) => {
      state.status = 'succeeded'; //.status = initialState
      state.error = "";
      state.user = action.payload.user; //.user = initialState
    })
    .addCase(userRegister.rejected,  (state, action) => {
      state.status = 'failed'; //.status = initialState
      state.error = action.payload;
      
    })
  }
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
