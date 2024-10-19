import {configureStore} from '@reduxjs/toolkit'
import  helper from '../features/helper.js'

const store = configureStore({
    reducer : {
        helper : helper ,
    }
})

export default store ; 