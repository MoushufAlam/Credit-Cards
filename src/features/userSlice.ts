import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  phoneNumber: string
  activeName: string
  compareList: number[]
}

const initialState: UserState = {
  phoneNumber: '',
  activeName: '',
  compareList: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{ phoneNumber: string; activeName: string }>
    ) => {
      state.phoneNumber = action.payload.phoneNumber
      state.activeName = action.payload.activeName
    },
    clearUserData: (state) => {
      state.phoneNumber = ''
      state.activeName = ''
    },
    toggleCompare: (state, action: PayloadAction<number>) => {
      const id = action.payload
      if (state.compareList.includes(id)) {
        state.compareList = state.compareList.filter(item => item !== id)
      } else {
        state.compareList.push(id)
      }
    },
    clearCompare: (state) => {
      state.compareList = []
    }
  }
})

export const {
  setUserData,
  clearUserData,
  toggleCompare,
  clearCompare
} = userSlice.actions

export default userSlice.reducer
