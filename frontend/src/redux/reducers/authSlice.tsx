import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface IUser {
    userId: number;
    name: string;
    roleId: number
}

interface InitialState {
    user?: IUser | {}
}

const initialState: InitialState = {
    user: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        },
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { login } = authSlice.actions
  
  export default authSlice.reducer