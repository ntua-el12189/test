import './App.css';
import Navbar from './components/Navbar';
import HighCharts  from './components/HighCharts';
import LineChart  from './components/LineChart';
import Matplot  from './components/Matplot';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import samplefiles from './pages/samplefiles';
import uploadfiles from './pages/uploadfiles';
import quotas from './pages/quotas';
import React, { useState, useEffect } from 'react';

import { useParams } from "react-router";

function App() {

    return (
	
		    <Router>
			  <Navbar />
			  <HighCharts />
			  <LineChart />
			  <Matplot />
			  <Routes>
				<Route path='/' exact component={Home} />
				<Route path='/samplefiles' component={samplefiles} />
				<Route path='/uploadfiles' component={uploadfiles} />
				<Route path='/quotas' component={quotas} />
		
			  </Routes>
			</Router>
			
		   
			 
    );
}

           
export default App;

