import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
  status: "",
  error: "",
};

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
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
