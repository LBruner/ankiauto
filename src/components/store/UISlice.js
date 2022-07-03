import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'notification', initialState: {
        activeNotification: null,
        showNotification: false,
        isWaiting: false,
        useDarkMode: false,
        timer: 0,
        fieldCount: 0
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
        toggleIsWaiting(state) {
            state.isWaiting = !state.isWaiting;
        },
        setTimer(state,action){
            state.timer = action.payload.timer;
        },
         setFieldCount(state,action){
            state.fieldCount = action.payload.fieldCount;
         }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;