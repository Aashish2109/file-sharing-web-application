import React, { createContext, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import SignUp from './components/signup';
import Logout from './components/logout';
import Error from './components/error';
import FileList from './components/filelist';
import { initialState,reducer } from './components/reducer/useReducer';

export const userContext = createContext();

function App() {
  const[state,dispatch]=useReducer(reducer,initialState);
  return (
    <userContext.Provider value={{ state,dispatch }}>
      <>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/filelist" element={<FileList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </>
    </userContext.Provider>
  );
}

export default App;
