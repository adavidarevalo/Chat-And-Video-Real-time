import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    status: string;
    error: string;
    user: {
        id: string;
        name: string;
        email: string;
        picture: string;
        status: string;
        token: string;
    } | null
}

const initialState: InitialState = {
    user: null,
    status: "",
    error: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
})

export const {} = userSlice.actions;

export default userSlice.reducer;