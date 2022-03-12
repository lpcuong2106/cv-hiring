import { Setting, User } from "./../../data.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setting?: Setting;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  setting: undefined,
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
    setSettingWebsite: (state, action: PayloadAction<Setting>) => {
      state.setting = action.payload;
    },
  },
});

export const { setUserLoggedIn, setLoggedIn, setSettingWebsite } =
  userSlider.actions;
export default userSlider.reducer;
