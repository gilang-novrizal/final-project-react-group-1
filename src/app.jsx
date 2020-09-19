import React from 'react'
import {Route} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Navbar from "./component/navbar"

import Home from "./pages/homepage"
import Category from "./pages/categoryPage"
import Register from "./pages/register"
import Login from "./pages/login"
import Account from './pages/account'
import Verification from './pages/verification'

import {userKeepLogin} from './action'

const App = () =>{
    const dispatch = useDispatch()
    React.useEffect(()=> {
        dispatch(userKeepLogin())
    }, [])
    return(
        <div>
            <Navbar/>
            <Route path="/" component={Home} exact/>
            <Route path="/Kategori" component={Category}/>
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/Akun" component={Account} />
            <Route path="/Verifikasi" component={Verification} />
        </div>
    )
}

export default App