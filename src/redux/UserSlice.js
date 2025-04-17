
import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({// isme 3 props hote hai
  name: 'usersaad',
  initialState: {
    data: []
  },
  reducers: {
    addUser(state, action) {
      state.data.push(action.payload); //push function use kiya hai
    },
    updateUser(state, action) {
      state.data[action.payload.index] = {
        ...state.data[action.payload.index],
        name: action.payload.name,
        address: action.payload.address,
        dob: action.payload.dob,
        age: action.payload.age,
        isMarried: action.payload.isMarried,
      };
    },
    deleteUser(state, action) {
      state.data.splice(action.payload, 1);//splice use kiya hai
    }
  }
});

export const { addUser, updateUser, deleteUser } = UserSlice.actions;
export default UserSlice.reducer;
