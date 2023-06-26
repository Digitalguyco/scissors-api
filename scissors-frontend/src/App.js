import React from 'react';
import UrlShortenerForm from './UrlShortenerForm';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState} from 'react';
import RegisterForm from './RegisterForm';
import HistoryPage from './History';
import Login from './Login';
import AnalyticsPage from './Analytics'
import QrCodePage from './QrCode';
import Footer from './Footer';
import NavBar from './NavigationBar';
import Header from './Header';


function App() {

  const [userisauthenticated, setUser] = useState(false);
  
  const updateuserisauthenticated =  (value) => {
    setUser(value);
  }
  return (
    <Router>
      <NavBar userisauthenticated={userisauthenticated}   setUserauth={updateuserisauthenticated}/>
      <Routes>
        <Route path="/login" element={<Login userisauthenticated={userisauthenticated} setUserauth={updateuserisauthenticated} />} />
        <Route path="/register" element={<RegisterForm />}/>
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/shorten" element={<UrlShortenerForm />} />
        <Route path="/analytics/:short_url" element={<AnalyticsPage />} />
        <Route path="/:shortCode/qrcode" element={<QrCodePage />} />
       <Route path="/" element={<Header />} />
      </Routes>
  
      <Footer />
      
    </Router>


  );
}

export default App;
