import { User } from "./../../data.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlider = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserLoggedIn } = userSlider.actions;
export default userSlider.reducer;
