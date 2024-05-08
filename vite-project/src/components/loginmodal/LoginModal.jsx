import React, { useState } from 'react'
import './LoginModal.css' 
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
const LoginModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => setIsOpen(!isOpen);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate =useNavigate();
    const handleSubmit = async (e)=>
    { e.preventDefault();
        try{
            const res=await newRequest.post("/auth/login", {username,password})
            localStorage.setItem('currentUser',JSON.stringify(res.data));
            navigate("/")
        }catch(err){
            setError(err.response.data);
            console.log(err.response.data);

        }
    }
    
    return (
      <section className="page modal-1-page">
        <div
          className={`modal-1-overlay ${isOpen ? "open" : ""}`}
        >
          <div className="modal-1-modal">
            <header>
              <h2>Prijavite se</h2>
              <h3>Isprobajte PronađiPosao</h3>
            </header>
            <form onSubmit={handleSubmit}>
              <div className="textbox">
                <input type="text" placeholder="Korisničko ime"  value={username} onChange={e=>setUsername(e.target.value)}/>
              </div>
              <div className="textbox">
                <input type="password" placeholder="Šifra"  value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button
                className="signup-button"
                type="submit"
                onClick={toggleModal}
              >
                <p>Prijava</p>
              </button>
            </form>
            <p>Podaci o kreditnoj kartici nisu potrebni</p>
          </div>
        </div>
          <div className="container">
            <article>
              <button
                className=" btn primary"
                type="button"
                onClick={toggleModal}
              >
               Pridruži se
              </button>
            </article>

          </div>
      </section>
    );
}

export default LoginModal