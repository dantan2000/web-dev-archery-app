import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header/>
          <Routes>
            {/* <Route path="/" element={<Header/>}/> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>

  );
}

export default App;
