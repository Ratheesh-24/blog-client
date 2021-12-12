import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import AddArticle from './pages/AddArticle'
import BlogDetail from './pages/BlogDetail';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route  exact path='/'><Home /></Route>
        <Route exact path='/login'><LoginPage /></Route>
        <Route exact path='/register'><Register /></Route>
        <Route exact path='/create'><AddArticle /></Route>
        <Route exact path='/blog/:id'><BlogDetail /></Route>
        <Route exact path="*"><ErrorPage/></Route>
      </Switch>
      
    </BrowserRouter>
  );
}

export default App;
