import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './article/article.css';

export default function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
      }, []);

    const handleLogin = () => {
        if (username === 'user' && password === 'pass') { // 간단한 유효성 검사
            localStorage.setItem('username', username);
            setIsLoggedIn(true);
        } else {
            alert('Invalid username or password');
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };
    
    return (
        <div>
          {isLoggedIn ? (
            <div>
              <h2>Welcome, {username}!</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
    );
}