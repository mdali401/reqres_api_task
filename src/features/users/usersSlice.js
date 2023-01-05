import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        add: (state, action) => {
            state.users = action.payload
        }
    }
})

export const {add} = usersSlice.actions
export default usersSlice.reducer