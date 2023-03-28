import React, { useState, useContext } from 'react';
import { BrowserRouter, Link, Router } from 'react-router-dom';
import './Header.css';
import { useHistory } from 'react-router-dom'
import DisplayCard from './../card/DisplayCard';
import MyAppContext from '../MyAppContext';

export default function Header(props) {

  const { state, dispatch } = useContext(MyAppContext);

  let history = useHistory();
  const [search, setSearch] = useState([]);
  const [searchbycategory, setsearchbycategory] = useState([])

  function hideFunctions() {
    document.getElementById("hidethis").style.display = "none";
  }

  const SeachHandle = () => {

    document.getElementById("hidethis").style.display = "block";
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=1KMPHCBIOe3hOjJwCJQX49sRc6cM0oIm&q=${searchbycategory}`)
      .then(res => res.json())
      .then(data1 => {
        console.log(data1.data);
        setSearch(data1.data)
      })
    history.push("/Search");
  }
  //const history = useHistory();
  const deletingToken = async () => {

    localStorage.clear();
    dispatch({
      type: "LogInStatus",
      value: {
        isLoggedIn: false,
      },
    });
    await state.isLoggedIn;
    history.push('/login');

    // localStorage.removeItem('token');
    // localStorage.removeItem('email');
    // // props.loginStatus.false;
    // history.push("/login");

  }


  return (
    <div>

      <div>
        <nav className="navbar navbar-expand-lg navbar-dark nav-background-color">
          <div className="container-fluid">
            <img src="/catlogo.gif" width="50px" height="50px" />
            <Link data-testid="brandname" className="navbar-brand" to="/"> <span className="giphyspan">GIPHER</span> </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <Link to="/reaction" onClick={hideFunctions} className="nav-link Reaction">Reactions</Link>
                </li>
                <li className="nav-item">
                  <Link to="/entertainment" onClick={hideFunctions} className="nav-link Entertainment">Entertainment</Link>
                </li>

                <li className="nav-item">
                  <Link to="/sports" onClick={hideFunctions} className="nav-link Sports">Sports</Link>
                </li>
                <li className="nav-item">
                  <Link to="/stickers" onClick={hideFunctions} className="nav-link Stickers">Stickers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/artist" onClick={hideFunctions} className="nav-link Artists">Artist</Link>
                </li>

              </ul>
              <ul className="navbar-nav ml-auto">
                <div className="input-group">
                  <div className="form-outline">
                    <input id="search_input" onChange={(e) => setsearchbycategory(e.target.value)} type="search" id="form1" className="form-control mysearchcolor" required />
                    {/* <Link to="/search" className="nav-link" data-testid="navlinktologin"><i className="fas fa-search"></i> </Link> */}
                  </div>
                  <button id="search-button" onClick={SeachHandle} type="button" className="btn btn-xs shadow-none">
                    <i className="fas fa-search"></i>
                  </button>
                </div>

                {
                  state.isLoggedIn ? <>
                    <li className="nav-item">
                      <Link to="/userprofile" onClick={hideFunctions} className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" onClick={deletingToken} className="nav-link"  >Logout</Link>
                    </li>
                   </> : <>
                      <li className="nav-item">
                        <Link to="/login" onClick={hideFunctions} className="nav-link"  >Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/register" onClick={hideFunctions} className="nav-link" >Register</Link>
                      </li>
                    </>

                }
              </ul>
            </div>
          </div>
        </nav>

      </div>

      <div className="container" id="hidethis">
        <div className="row">
          {
            search.map(item => <DisplayCard Poster={item.images.original.url} id={item.id}  />)
          }
        </div>
      </div>

    </div>
  )
}