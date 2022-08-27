import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  loading: false,
  count: 0,
};

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    setSpinnerStarted: (state, action) => {
      state.loading = true;
      ++state.count;
    },

    setSpinnerEnded: (state, action) => {
      --state.count;

      if (state.count === 0) {
        state.loading = false;
      }
    },
  },
});

export const { setSpinnerStarted, setSpinnerEnded } = spinnerSlice.actions;
export default spinnerSlice.reducer;
