import  {useEffect, useState } from 'react'
import newRequest from "../../utils/newRequest"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { imageDb } from './firebase'
import {v4} from "uuid"
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate =useNavigate();
    const [img,setImg] = useState('')
    const [imgUrl,setImgUrl] =useState([])
    const handleClick = () =>{
      if(img !==null){
         const imgRef =  ref(imageDb,`files/${v4()}`)
         uploadBytes(imgRef,img).then(value=>{
             console.log(value)
             getDownloadURL(value.ref).then(url=>{
                 setImgUrl(data=>[...data,url])
                 setUser((prev) => ({ ...prev, img: url }));

             })
         })
      }
     }

  //    useEffect(()=>{
  //     listAll(ref(imageDb,"files")).then(imgs=>{
  //         console.log(imgs)
  //         imgs.items.forEach(val=>{
  //             getDownloadURL(val).then(url=>{
  //                 setImgUrl(data=>[...data,url])
  //             })
  //         })
  //     })
  // },[])
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
       img: "",
      country: "",
      isSeller: false,
      desc: "",

    });
    
   const handleSeller = (e) =>
   {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked}
    })
   }
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/auth/register", { ...user });
      console.log(img);
    } catch (err) {
      console.log(err);
    }
    navigate("/")

  };
   const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Ako je promjena na polju slike, postavi sliku u useState i preskoči postavljanje u objekat korisnika
    if (name === 'img') {
      setImg(files[0]);
    } else {
      // Za sve ostale promjene, ažuriraj objekat korisnika
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
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
              <h2 className="fw-bold mb-5">Kreirajte Vaš račun</h2>
              <form onSubmit={handleSubmit}>
             
              <div className="form-outline mb-4">
                <input type="text" name="username"  className="form-control" onChange={handleChange} />
                  <label className="form-label" htmlFor="form3Example3">Korisničko ime</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="email" name="email"  className="form-control" onChange={handleChange} />
                  <label className="form-label" htmlFor="form3Example3">E-mail adresa</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" name="password" className="form-control" onChange={handleChange}/>
                  <label className="form-label" >Lozinka</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="file" name="img" className="form-control" onChange={(e) => setImg(e.target.files[0])} />
                  <button onClick={handleClick}>Učitaj sliku</button>
               
                  {/* <label className="form-label" >Učitaj sliku</label> */}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" name="country"  className="form-control" onChange={handleChange} />
                      <label className="form-label" >Država</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                    <input type="text" name="phone"  className="form-control" onChange={handleChange} />
                      <label className="form-label" >Broj telefona</label>
                    </div>
                  </div>
                  
                </div>
                <div className="form-outline mb-4">
                  <textarea className='form-control' name="desc" rows="3" onChange={handleChange}></textarea>
                  <label className="form-label" >Kratak opis</label>
                </div>
                <div className="form-outline mb-4">
                  <input className='form-check-input' type="checkbox" role="switch" onChange={handleSeller} />
                  <label className="form-check-label" >Aktiviraj račun kao prodavaoc</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">
                  Registriraj se!
                </button>
              
               
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-5 mb-lg-0">
          <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4" alt="" />
        </div>
      </div>
    </div>
  </section>  )
}

export default Register