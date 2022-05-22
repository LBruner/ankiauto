import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'notification', initialState: {
        activeNotification: null,
        showNotification: false,
        isWaiting: false,
        useDarkMode: false
    }, reducers: {
        showNotification(state, action) {
            state.showNotification = true;
            const {notification} = action.payload;
            state.activeNotification = notification;
        },
        hideNotification(state) {
            state.showNotification = false;
            state.activeNotification = null;
        },
        toggleIsWaiting(state, action) {
            state.isWaiting = !state.isWaiting;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;