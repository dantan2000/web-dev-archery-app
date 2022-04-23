import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import CurrUserContext from './contexts/CurrUserContext';
=======
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventDetails from './components/Event/EventDetails';
import Header from './components/Header';

>>>>>>> selin

function App() {
  // State for the current user
  // Undefined if the user is not logged in,
  // has an _id, username, bio, favorited_comps_by_id if the user is logged in
  const [currUser, setCurrUser] = useState(undefined);

  return (
    <CurrUserContext.Provider value={{currUser, setCurrUser}}>
      <BrowserRouter>
        <div className="container">
          <Header/>
          <Routes>
            <Route path="/events/:eid" element={<EventDetails/>}/>
            {/* <Route path="/" element={<Header/>}/> */}
          </Routes>
        </div>
      </BrowserRouter>
    </CurrUserContext.Provider>

  );
}

export default App;
