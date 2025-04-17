
const { configureStore } = require("@reduxjs/toolkit");
import UserReducer from './UserSlice'

const MyStore=configureStore({
    reducer:{
     user:UserReducer
    }
})

export default MyStore;
// ye redux ka store hota hai yaha slice aur slice ke andar action aur reducer dono hote hai
