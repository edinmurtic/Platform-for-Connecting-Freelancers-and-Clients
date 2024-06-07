import  {useEffect, useState } from 'react'
import newRequest from "../../utils/newRequest"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { imageDb } from '../../firebase.js';
import {v4} from "uuid"
import { useNavigate, useParams  } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser.js';
import ReactQuill from 'react-quill';
import './UpdateUser.css'

const UpdateUser = () => {
    const currentUser = getCurrentUser();
    const navigate = useNavigate();
        const [img,setImg] = useState('')
    const [imgUrl,setImgUrl] =useState([])
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);

    const { id } = useParams();
    console.log("id:",id)
    const [formData, setFormData] = useState({
        fullName: "",
        professionalArea:"",
        username: "",
        password: "",
        email: "",
         img: "",
        country: "",
      //  isSeller: false,
        desc: "",
  
      });
      const handleClick = (e) =>{
        e.preventDefault()
        if(img !==null){
           const imgRef =  ref(imageDb,`files/${v4()}`)
           uploadBytes(imgRef,img).then(value=>{
               console.log(value)
               getDownloadURL(value.ref).then(url=>{
                   setImgUrl(data=>[...data,url])
                   setFormData((prev) => ({ ...prev, img: url }));
  
               })
           })
        }
       }
     
       
     
     useEffect(() => {
        const fetchListing = async () => {
          try {
            const response = await newRequest.get(`/users/${id}`);
            const data = response.data;
            if (data.success === false) {
              console.log(data.message);
              return;
            }
            setFormData(data);
          } catch (error) {
            console.error("Error fetching listing:", error);
          }
        };
      
        fetchListing();
      }, [id]); // Dodajte id kao zavisnost
     useEffect(() => {
        // Ovaj useEffect se pokreće svaki put kada se formData promijeni
        console.log("formData", formData);
      }, [formData]);
    
   
     const handleRemoveImage = () => {
        setFormData({
          ...formData,
          img: "",
        });
      };
    
      const handleChange2 = (content, delta, source, editor) => {
        setFormData({
          ...formData,
          desc: content 
        });
      };
      

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post(`/users/update/${id}`, { ...formData });
    } catch (err) {
      console.log(err);
    }
     navigate(`/users/${id}`)

  };
   const handleChange = (e) => {
    const { name, value, img } = e.target;
    if (name === 'img') {
      setImg(img[0]);
    } else {
        setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  return (
    <div className="add">
      <div className="container">
        <h1>Uredi korisnika</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Ime i prezime</label>
            <input
              type="text"
              name="fullName"
              id='fullName'
              placeholder="Vaše ime i prezime"
              onChange={handleChange}
              value={formData.fullName}

            />
           
           <label htmlFor="">Korisničko ime</label>
            <input
              type="text"
              name="username"
              id='username'
              placeholder="Vaše korisnicko ime"
              onChange={handleChange}
              value={formData.username}

            />
           <label htmlFor="">Lozinka</label>
            <input
              type="password"
              name="password"
              id='password'
              placeholder="Unesite vašu novu lozinku"
              onChange={handleChange}

            />
            <div className="images">
              <div className="imagesInputs">
                {/* <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                /> */}
                <label htmlFor="">Učitajte profilnu sliku</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImg(e.target.files[0])}                />
               
                
              </div>
              <button id='uplButton' onClick={handleClick}>
                {uploading ? "Učitavanje" : "Učitaj"}
              </button>
            </div>
            <div className="secondimage-row">
  {formData.img.length > 0 &&
   
      <div  className="secondimage-container" >
        <img
          src={formData.img}
          alt="listing image"
          style={{ width: '300px', height: '300px' }}
        />
        <button
          type="button"
          onClick={() => handleRemoveImage()}
          className="delete-button"
          id='delButton'

        >
          Obriši
        </button>
      </div>
    }
</div>
            
            <button id='addButton' onClick={handleSubmit}>Izmjeni</button>
          </div>
          <div className="details">
                
          <label htmlFor="">Opis</label>
          <ReactQuill name="desc" id='desc' placeholder="Kratak opis" style={{minHeight:"400px", marginBottom:"50px"}} theme="snow" className=' mb-16' value={formData.desc} onChange={handleChange2} />
          <label htmlFor="" >Stručna oblast</label>
            <input type="text" id='professionalArea' name="professionalArea" onChange={handleChange} value={formData.professionalArea}
 />
           
            <label htmlFor="" >Država</label>
            <input type="text" id='country' name="country" onChange={handleChange} value={formData.country}
 />
            <label htmlFor="">Broj telefona</label>
            <input
              type="text"
              name="phone"
              id='phone'
              onChange={handleChange}
              value={formData.phone}

            />
      
          </div>
        </div>
      </div>
    </div>
  );


}
export default UpdateUser;