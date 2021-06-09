import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";

import './App.css';


import Header from "./components/Header";
import DetailUser from "./views/DetailUser";
import Home from "./views/Home";
import Footer from "./components/Footer";

import { DataProvider } from "./context/DataContext";


function App() {
  return (
    <>
    <Router>
      <Header />
        <Switch>
          <DataProvider>
            <Route path='/' exact component={Home}/>
            <Route path='/detalles/:id' component={DetailUser}/>
          </DataProvider>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
