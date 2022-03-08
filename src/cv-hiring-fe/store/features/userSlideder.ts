import { User } from "./../../data.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

export const userSlider = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserLoggedIn, setLoggedIn } = userSlider.actions;
export default userSlider.reducer;
