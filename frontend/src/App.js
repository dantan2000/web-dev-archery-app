import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import CurrUserContext from './contexts/CurrUserContext';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/Search';
import HomePage from './components/HomePage';
import EventDetails from './components/Event/EventDetails';
import LoginPage from './components/LoginPage';
import ScorecardDetails from './components/Scorecard/ScorecardDetails';
import EditProfilePage from './components/ProfilePage/EditProfilePage';
import NotFound from './components/NotFound';

function App() {
  // State for the current user
  // Undefined if the user is not logged in,
  // has an _id, username, bio, favorited_comps_by_id if the user is logged in
  const [currUser, setCurrUser] = useState(undefined);

  return (
    <CurrUserContext.Provider value={{ currUser, setCurrUser }}>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' exact={true} element={<HomePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path='/edit_profile/' element={<EditProfilePage />} />
            <Route path='/scorecard/:sid' element={<ScorecardDetails />} />
            <Route path='/edit_scorecard/:sid' element={<ScorecardDetails />} />
            <Route path="/events/:eid" element={<EventDetails />} />
            <Route path='/sign:type' element={<LoginPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CurrUserContext.Provider>

  );
}

export default App;
