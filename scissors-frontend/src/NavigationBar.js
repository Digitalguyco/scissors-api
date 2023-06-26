import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './authService';


const Navbar = (props) => {
    const [currentUser, setCurrentUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = AuthService.getCurrentUser();
                setCurrentUser(user);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                
            }
        };
        fetchUser();
    }, [props.userisauthenticated]);

    const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    props.setUserauth(false)
    navigate('/login');
  };


    return (
      <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm " id="mainNav">
      <div className="container px-5">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/" className="navbar-brand fw-bold">Scissors</Link>            
              </li>
               
      </ul>
      {currentUser ? (
          <>
            
                <Link to="/history" className="nav-link fw-bold">History</Link>
              

            
            <button onClick={handleLogout} className='btn btn-white'>Logout</button>
            
            <button className='btn btn-primary rounded-pill px-3 mb-2 mb-lg-0'>
             <span class="d-flex align-items-center">
                            <i class="bi-chat-text-fill me-2"></i>
                            <span > <Link to="/shorten" className="nav-link text-white">Cut Url</Link></span>
                        </span>
           
            </button>
          </>
        ) : ( 
          
             <button className='btn btn-primary rounded-pill px-3 mb-2 mb-lg-0'>
             <span class="d-flex align-items-center">
                            <span > <Link to="/login" className="nav-link text-white">Try now</Link></span>
                        </span>
           
            </button>
          
          
        )}
        
        </div>
    </div>
        </nav>
    );
}
export default Navbar;