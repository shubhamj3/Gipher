import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Stickers from './components/category/Stickers';
import Artist from './components/category/Artist';
import Sports from './components/category/Sports';
import Entertainment from './components/category/Entertainment';
import Reaction from './components/category/Reaction';
import Search from './components/category/Search'
import Userprofile from './components/userprofile/Userprofile';

import MyAppContext from './components/MyAppContext';
import reducer, { initialState } from './AppReducer';

// import onSubmit  from './components/login/Login';
import Editprofile from './components/editprofile/Editprofile';
import LikedGifs from './components/likedgifs/LikedGifs';
import AnimatedBg from "react-animated-bg";
import './App.css';


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [status, setStatus] = useState(false);
  // function loginStatusFunction(stat) {
  //   setStatus(stat);
  // }

  return (
    <div>  
      {/* <AnimatedBg
        // style={{background: "linear-gradient([45deg, #FE6B8B 30%, #FF8E53 90%);"}}
        colors={['rgb(106, 57, 171)',
        'rgb(151, 52, 160)',
        'rgb(197, 57, 92)',
        'rgb(231, 166, 73)',
        'rgb(181, 70, 92)']}
        duration={0.5}
        delay={2}
        timingFunction="ease-out"
        className="section-styles"
      > */}
      <Router>
      <MyAppContext.Provider value={{ state, dispatch }}>
      <Header />
     
      <Route exact path ="/" component={Dashboard}/> 
      <Route exact path ="/dashboard" component={Dashboard}/>
      <Route exact path ="/stickers" component={Stickers}/> 
      <Route exact path ="/artist" component={Artist}/> 
      <Route exact path ="/sports" component={Sports}/> 
      <Route exact path ="/entertainment" component={Entertainment}/> 
      <Route exact path ="/reaction" component={Reaction}/> 
      <Route exact path ="/login" component={Login}/>  {/* //{() => onSubmit.isLoggedIn ? <Login />: <Redirect to ="/login"/>} */}
      <Route exact path ="/register" component={Register}/> 
      <Route exact path ="/userprofile" component={Userprofile}/> 
      <Route exact path="/Search" component={Search}/>
      <Route exact path="/editprofile" component={Editprofile}/>
      <Route exact path="/likedgifs" component={LikedGifs}/>
      <Footer/>
      </MyAppContext.Provider>
      </Router>
      
      {/* </AnimatedBg> */}
    </div>
  );
};
export default App;
