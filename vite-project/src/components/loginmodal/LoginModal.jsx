import React, { useState, useEffect } from 'react';
import './LoginModal.css';
import newRequest from '../../utils/newRequest';
import { Link, useNavigate } from 'react-router-dom';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUser, setErrorUser] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.modal-1-modal') && !event.target.closest('.btn-success')) {
        toggleModal();
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const toggleModal = (e) => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorUser('');
    setErrorPassword('');

    try {
      const res = await newRequest.post('/auth/login', { username, password });
      localStorage.setItem('currentUser', JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      if (err.message === 'Request failed with status code 404') {
        setErrorUser(err.response.data);
      }
      if (err.message === 'Request failed with status code 400') {
        setErrorPassword(err.response.data);
      }
      console.log(err.response.data);
    }
  };

  return (
    <section className="page modal-1-page">
      <div className={`modal-1-overlay ${isOpen ? 'open' : ''}`}>
        <div className="modal-1-modal">
          <header>
            <h2>Prijavite se</h2>
            <h3>Isprobajte Klik.ba</h3>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="textbox">
              <input
                type="text"
                placeholder="Korisničko ime"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <span style={{ color: 'red', fontSize: '12px' }}>{errorUser}</span>

            <div className="textbox">
              <input
                type="password"
                placeholder="Šifra"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span style={{ color: 'red', fontSize: '12px' }}>{errorPassword}</span>
            <button className="signup-button" type="submit">
              <p>Prijava</p>
            </button>
          </form>
          <hr className="divider"/>
      <p>Nemate račun? <Link style={{color:"green"}}to="/register" onClick={(e) => toggleModal(e)}>Registirajte se</Link>.</p>
        </div>
      </div>
      <div className="container">
        <article>
        <button className="btn btn-success" type="button" onClick={(e) => toggleModal(e)}>
  Prijavi se
</button>
        </article>
      </div>
    </section>
  );
};

export default LoginModal;
