import React, { useEffect } from 'react'
import Cart from './Pages/Cart'
import Home from './Pages/Home'
import Login from './Pages/Login'
import ProductPage from './Pages/ProductPage'
import Register from './Pages/Register'
import SingleProductPage from './Pages/SingleProductPage'
import "./app.css"
import {
 BrowserRouter as Router,
 Switch,
 Route,
 Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux'

const App = () => {
 const userState = useSelector((state) => { return state.user });
 console.log(userState);

 // storing the current user so that we can get persist the user on reloads
 useEffect(() => {
  localStorage.setItem("user", JSON.stringify(userState.currentUser))
 }, [userState.currentUser])

 console.log(JSON.parse(localStorage.getItem("user")))

 return (
  <Router>
   <Switch>
    <Route exact path="/">
     {userState.currentUser ? <Home /> : <Login />}
    </Route>
    <Route path="/products/:category">
     <ProductPage />
    </Route>
    <Route path="/product/:id">
     <SingleProductPage />
    </Route>
    <Route path="/cart">
     <Cart />
    </Route>
    <Route path="/login">
     {userState.currentUser ? <Redirect to="/" /> : <Login />}
    </Route>
    <Route path="/register">
     <Register />
    </Route>
   </Switch>
  </Router>

  // <ProductPage />
  // <SingleProductPage />
  // <Register />
  // <Login />
  // <Cart />
 )
}

export default App