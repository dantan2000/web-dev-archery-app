import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventDetails from './components/Event/EventDetails';
import Header from './components/Header';


function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header/>
          <Routes>
            <Route path="/events/:eid" element={<EventDetails/>}/>
            {/* <Route path="/" element={<Header/>}/> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>

  );
}

export default App;
