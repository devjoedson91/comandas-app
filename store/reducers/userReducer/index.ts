import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "@/types";
interface UserStore {
  user?: UserProps;
}

const initialState: UserStore = {
  user: {} as UserProps,
};

export const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserAction: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserAction } = userSlice.actions;

export default userSlice.reducer;
