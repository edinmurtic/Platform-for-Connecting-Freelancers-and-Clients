import React, { useReducer, useState } from 'react';
import './AddNew.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { imageDb } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNew = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    shortTitle: "",
    category: "",
    subcategory: "",
    cover: "",
    images: [],
    desc: "",
    shortDesc: "",

    serviceStyle: "",
    serviceFormat:"",
    deliveryTime: 0,
    revisionNumber: 0,
    price: 0,
  });
  console.log("formData:",formData)
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [labels, setLabels] = useState({
    serviceStyleLabel: "Stil servisa",
    serviceFormatLabel: "Format servisa",
  });
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.images.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            images: formData.images.concat(urls),
            cover: urls[0]

          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = imageDb;
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    let serviceStyleLabel = "serviceStyle";
    let serviceFormatLabel = "serviceFormat";
    let subCategoriesForCategory = [];
    if (selectedCategory === "Grafika i dizajn") {
      serviceStyleLabel = "Unesi stil";
      serviceFormatLabel = "Format dokumenta";
      subCategoriesForCategory = ["Logo i brend dizajn", "UX dizajn", "3D dizajn"];
    } else if (selectedCategory === "Razvoj aplikacija") {
      serviceStyleLabel = "Unesi programski jezik";
      serviceFormatLabel = "Format dokumenta";
      subCategoriesForCategory = ["Razvoj internet aplikacija", "Razvoj desktop aplikacija", "Razvoj mobilnih aplikacija"];
    } 
    else if (selectedCategory === "IT konsalting") {
      serviceStyleLabel = "Unesi  jezik";
      serviceFormatLabel = "Format dokumenta";
      subCategoriesForCategory = ["Sajber sigurnost i zastita podataka", "Infrastruktura i mreže", "Agilno upravljanje projektima"];
    } 
    else if (selectedCategory === "Razvoj video igara") {
      serviceStyleLabel = "Unesi programski jezik";
      serviceFormatLabel = "Format dokumenta";
      subCategoriesForCategory = ["PC video igre", "Mobilne video igre", "VR igre","Scenarij za video igre"];
    } 
    else if (selectedCategory === "Video i animacija") {
      serviceStyleLabel = "Unesi programski jezik";
      serviceFormatLabel = "Format dokumenta";
      subCategoriesForCategory = ["Uređivanje i postprodukcija videa", "AI video umjetnost", "Animacija"];
    } 
    setFormData({
      ...formData,
      serviceStyle: "",
      serviceFormat: "",
    });
  
    setLabels({
      serviceStyleLabel,
      serviceFormatLabel,
    });

    setSubCategories(subCategoriesForCategory);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleChange2 = (content, delta, source, editor) => {
    setFormData({
      ...formData,
      desc: content 
    });
  };
  const handleChange3 = (content, delta, source, editor) => {
    setFormData({
      ...formData,
      shortDesc: content 
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1)
        return setError('You must upload at least one image');
     
      setLoading(true);
      setError(false);
      const body = { ...formData, userRef: currentUser._id };
      await newRequest.post("/services/add", { ...body });
      setLoading(false);
      navigate(`/users/${currentUser._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Dodaj novi servis</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Naslov</label>
            <input
              type="text"
              name="title"
              id='title'
              placeholder="npr. Radit ću nešto u čemu sam jako dobar"
              onChange={handleChange}
            />
            <label htmlFor="">Kratak naslov</label>
            <input
              type="text"
              name="shortTitle"
              id='shortTitle'
              placeholder="npr. Radit ću nešto u čemu sam jako dobar"
              onChange={handleChange}
            />
            <label htmlFor="">Kategorija servisa</label>
            <select name="category" id="category" onChange={(e)=>{handleCategoryChange(e);  handleChange(e);}} >

            <option value="Grafika i dizajn">Grafika i dizajn</option>
              <option value="Razvoj aplikacija">Razvoj aplikacija</option>
              <option value="IT konsalting">IT konsalting</option>
              <option value="Razvoj video igara">Razvoj video igara</option>
              <option value="Video i animacija">Video i animacija</option>
            </select>
            <label htmlFor="">Podkategorija servisa</label>
            <select name="subcategory" id="subcategory" onChange={handleChange}>
              {subCategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
           
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Učitaj slike</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />                {console.log(uploading)}

              </div>
              <button id='uplButton' onClick={handleImageSubmit}>
                {uploading ? "Učitavanje" : "Učitaj"}
              </button>
            </div>
            <div className="image-row">
  {formData.images.length > 0 &&
    formData.images.map((url, index) => (
      <div key={url} className="image-container">
        <img
          src={url}
          alt="listing image"
          style={{ width: '290px', height: '290px' }}
        />
        <button
          type="button"
          onClick={() => handleRemoveImage(index)}
          className="delete-button"
          id='delButton'
        >
          Obriši
        </button>
      </div>
    ))}
</div>
            
            <button id='addButton' onClick={handleSubmit}>Kreiraj servis</button>
          </div>
          <div className="details">
            <label htmlFor="">Opis servisa</label>
            <ReactQuill style={{ marginBottom: "20px"}} name="desc" id='desc' placeholder="Opis za predstavljanje vaše usluge klijentima" theme="snow" className='h-36 mb-16'  onChange={handleChange2} />
            <label htmlFor="shortDesc">Kratak opis servisa</label>
            <ReactQuill style={{ marginBottom: "20px"}} name="shortDesc" id='shortDesc' placeholder="Kratki opisi za predstavljanje vaše usluge klijentima" theme="snow" className='h-36 mb-16'  onChange={handleChange3} />
            
            <label htmlFor="" >Vrijeme isporuke (npr. 3 dana)</label>
            <input type="number" id='deliveryTime' name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Broj revizija (npr. 2 besplatne revizije)</label>
            <input
              type="number"
              name="revisionNumber"
              id='revisionNumber'
              onChange={handleChange}
            />
 <label htmlFor="serviceStyle">{labels.serviceStyleLabel}</label>
            <input
              type="text"
              name="serviceStyle"
              id='serviceStyle'
              placeholder="serviceStyle"
              onChange={handleChange}
            />
               <label htmlFor="serviceFormat">{labels.serviceFormatLabel}</label>
            <input
              type="text"
              name="serviceFormat"
              id='serviceFormat'
              placeholder="serviceFormat"
              onChange={handleChange}
            />
            <label htmlFor="">Cijena (KM)</label>
            <input type="number" min="0" onChange={handleChange} id='price' name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew