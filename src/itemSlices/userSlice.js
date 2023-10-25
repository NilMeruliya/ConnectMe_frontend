import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ENDPOINT_AUTH = `${process.env.REACT_APP_BACKEND_ENDPOINT}/auth`;

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
    password: ""
  }
};

export const userRegister = createAsyncThunk('auth/register', async (values, { rejectWithValue }) => {

  try {
    console.log("before")
    const {data} = await axios.post(`${ENDPOINT_AUTH}/register`, {...values});
    console.log("check data here");
    console.log(data);
    return data;
  } catch (error) {
    console.log(`register error`);
    console.log(error.response);
    return rejectWithValue(error?.response?.data?.error)
  }
})

export const userLogin = createAsyncThunk('auth/login', async (values, { rejectWithValue }) => {

  try {
    const {data} = await axios.post(`${ENDPOINT_AUTH}/login`, {...values})
    return data;
  } catch (error) {
    console.log(`login error, ${error}`);
    return rejectWithValue(error.response.data.message)
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  // can also be written as below as we have same key and value.
  // initialstate

  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = ""
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    }
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
    .addCase(userLogin.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(userLogin.fulfilled,  (state, action) => {
      state.status = 'succeeded'; //.status = initialState
      state.error = "";
      state.user = action.payload.user; //.user = initialState
    })
    .addCase(userLogin.rejected,  (state, action) => {
      state.status = 'failed'; //.status = initialState
      state.error = action.payload;
    })
  }
});

export const {logout, changeStatus} = userSlice.actions;

export default userSlice.reducer;
