import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Auth/Store";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", "true");
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    },
    checkAuth(state) {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";
      if (user && isAuthenticated) {
        state.isAuthenticated = true;
        state.user = user;
      }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
