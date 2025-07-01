import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  phoneNumber: string
  activeName: string
  compareList: number[]
  pan: string
  dob: string
  email: string
  gender: string
  personalName: string
  motherName: string
  fatherName: string
  maritalStatus: string
}

const initialState: UserState = {
  phoneNumber: '',
  activeName: '',
  compareList: [],
  pan: '',
  dob: '',
  email: '',
  gender: '',
  personalName: '',
  motherName: '',
  fatherName: '',
  maritalStatus: ''
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
    setUserProfile: (
      state,
      action: PayloadAction<{ pan: string; dob: string; email: string; gender: string }>
    ) => {
      state.pan = action.payload.pan
      state.dob = action.payload.dob
      state.email = action.payload.email
      state.gender = action.payload.gender
    },
    setAdditionalDetails: (
      state,
      action: PayloadAction<{
        personalName: string
        motherName: string
        fatherName: string
        maritalStatus: string
      }>
    ) => {
      state.personalName = action.payload.personalName
      state.motherName = action.payload.motherName
      state.fatherName = action.payload.fatherName
      state.maritalStatus = action.payload.maritalStatus
    },
    clearUserData: (state) => {
      state.phoneNumber = ''
      state.activeName = ''
      state.pan = ''
      state.dob = ''
      state.email = ''
      state.gender = ''
      state.personalName = ''
      state.motherName = ''
      state.fatherName = ''
      state.maritalStatus = ''
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
  setUserProfile,
  setAdditionalDetails,
  clearUserData,
  toggleCompare,
  clearCompare
} = userSlice.actions

export default userSlice.reducer
