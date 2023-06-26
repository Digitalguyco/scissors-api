import React, { useState } from 'react';
import api from './api';
import { useNavigate, Link } from 'react-router-dom';


function RegisterForm () {
    const [firstname, setfirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password1 === password2){
            var password = password2
            try {
                const response = await api.post('/auth/signup', {
                    firstname,
                    lastname,
                    email,
                    password
            });
            const { data } = response;
            console.log(data);
            setfirstName('');
            setlastName('');
            setEmail('');
            setPassword1('');
            setPassword2('');
            navigate('/login');
        } catch (error) {
           alert("Some fields are incomplete.")
        }
            
        }else{
            alert('password doesn\'t match')
        }
        
};
    return (
        <div className='wrapper text-center'>
        <div className='formImg'>

        </div>
        <form onSubmit={handleSubmit}>
        <div className='inputField'>
        <h2>Create an Account</h2>    
            <div class="mb-3">
                <input type="first_name" 
                value={firstname}
                onChange={(e) => setfirstName(e.target.value)}
                class="form-control" id="first_name" placeholder="First name"/>
            </div>
            <div class="mb-3">
                <input type="last_name" 
                value={lastname}
                onChange={(e) => setlastName(e.target.value)}
                class="form-control" id="last_name" placeholder="Last name"/>
            </div>
            <div class="mb-3">
                <input type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="form-control" id="email" placeholder="Email Address"/>
            </div>
            <div class="mb-3">
                <input type="password1" 
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                class="form-control" id="password1" placeholder="Password"/>
            </div>
            <div class="mb-3">
                <input type="password2" 
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                class="form-control" id="password1" placeholder="Confirm Password"/>
            </div>
            <button type="button" class="btn btn-primary" onClick={handleSubmit}>Register</button>
        </div>
        <div class='mb-3 text-center' id="regLink" >
            <p>Already have an account? <Link to ='/login'>Please Login</Link></p>
        </div>
        </form>
        </div>
        
    );
};

export default RegisterForm;