import { useState } from "react";
import "./Login.css"; // Učitavanje stila iz style.css datoteke
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
const Login = () => {

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
    <section className="text-center text-lg-start">
    <style>{`
      .cascading-right {
        margin-right: -50px;
      }

      @media (max-width: 991.98px) {
        .cascading-right {
          margin-right: 0;
        }
      }
    `}</style>

    <div className="container py-4">
      <div className="row g-0 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card cascading-right" style={{
            background: 'hsla(0, 0%, 100%, 0.55)',
            backdropFilter: 'blur(30px)'
          }}>
            <div className="card-body p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Login</h2>
              <form onSubmit={handleSubmit}>
                  <div className="col-md-12 mb-4 ">
                    <div className="form-outline">
                      <input type="text" id="form3Example1" className="form-control" value={username} onChange={e=>setUsername(e.target.value)} />
                      <label className="form-label" htmlFor="form3Example1">Korisničko ime</label>
                    </div>
                  </div>
                 
                
                
                <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                  <label className="form-label" htmlFor="form3Example4">Lozinka</label>
                </div>
               
                <button type="submit" className="btn btn-primary btn-block mb-4">
                Prijava
                </button>
                <div className="text-center">
                  <p>or sign up with:</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>
                  {error && error}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-5 mb-lg-0">
          <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt="" />
        </div>
      </div>
    </div>
  </section> 
  
  );
};

export default Login;
