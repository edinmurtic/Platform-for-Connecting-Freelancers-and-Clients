import React, { useEffect, useReducer, useState } from 'react'
import './UpdateService.css'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { imageDb } from '../../firebase.js';
import { useNavigate, useParams  } from 'react-router-dom';
import getCurrentUser from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateService = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id:",id)
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

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await newRequest.get(`/services/single/${id}`);
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

  // const handleChange = (e) => {

  // console.log(e.target.value)
  //     setFormData({
  //       ...formData,
  //       [e.target.id]: e.target.value,
  //     });
 
  // };

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
    console.log("desc",desc)

  };
  
  const handleChange3 = (content, delta, source, editor) => {
    setFormData({
      ...formData,
      shortDesc: content 
    });
    console.log("shortDesc",shortDesc)

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1)
        return setError('You must upload at least one image');
     
      setLoading(true);
      setError(false);
  
      const body = { ...formData, userRef: currentUser._id, isAdmin: currentUser.isAdmin};
      console.log("noviId:", id);
      const response = await newRequest.post(`/services/update/${id}`, body);
      
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      } else {
        navigate(`/services/${data._id}`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  





  return (
    <div className="add">
      <div className="container">
        <h1>Uredi servis</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Naslov</label>
            <input
              type="text"
              name="title"
              id='title'
              placeholder="npr. Radit ću nešto u čemu sam jako dobar"
              onChange={handleChange}
              value={formData.title}

            />
            <label htmlFor="">Kratak naslov</label>
            <input
              type="text"
              name="shortTitle"
              id='shortTitle'
              placeholder="npr. Radit ću nešto u čemu sam jako dobar"
              onChange={handleChange}
              value={formData.shortTitle}

            />
            <label htmlFor="">Category</label>
            <select name="category" id="category" onChange={(e)=>{handleCategoryChange(e);  handleChange(e);}} value={formData.category}
>
              <option value="Grafika i dizajn">Grafika i dizajn</option>
              <option value="Razvoj aplikacija">Razvoj aplikacija</option>
              <option value="IT konsalting">IT konsalting</option>
              <option value="Razvoj video igara">Razvoj video igara</option>
              <option value="Video i animacija">Video i animacija</option>
            </select>
            <label htmlFor="">Podkategorija servisa</label>
            <select name="subcategory" id="subcategory" value={formData.subcategory} onChange={handleChange}>
              {subCategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
            <div className="images">
              <div className="imagesInputs">
                {/* <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                /> */}
                <label htmlFor="">Učitaj slike</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                {console.log(uploading)}
                
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
            
            <button id='addButton' onClick={handleSubmit}>Izmjeni</button>
          </div>
          <div className="details">
                
          <div>
  <label htmlFor="desc">Opis servisa</label>
  <ReactQuill
    name="desc"
    id="desc"
    placeholder="Opis za predstavljanje vaše usluge klijentima"
    theme="snow"
    style={{ height: "400px" }}
    className="mb-16"
    value={formData.desc}
    onChange={handleChange2}

  />
</div>
<div style={{marginTop: "40px", marginBottom: "40px"}}>
  <label htmlFor="shortDesc">Kratak opis servisa</label>
  <ReactQuill
    name="shortDesc"
    id="shortDesc"
    placeholder="Kratki opisi za predstavljanje vaše usluge klijentima"
    theme="snow"
    style={{ height: "240px" }}
    onChange={handleChange3}
    className="mb-16"
    value={formData.shortDesc}
  />
</div>

           
            <label htmlFor="" >Vrijeme isporuke (npr. 3 dana)</label>
            <input type="number" id='deliveryTime' name="deliveryTime" onChange={handleChange} value={formData.deliveryTime}
 />
            <label htmlFor="">Broj revizija (npr. 2 besplatne revizije)</label>
            <input
              type="number"
              name="revisionNumber"
              id='revisionNumber'
              onChange={handleChange}
              value={formData.revisionNumber}

            />
        <label htmlFor="serviceStyle">{labels.serviceStyleLabel}</label>
            <input
              type="text"
              name="serviceStyle"
              id='serviceStyle'
              placeholder="unesi stil"
              onChange={handleChange}
              value={formData.serviceStyle}

            />
               <label htmlFor="serviceFormat">{labels.serviceFormatLabel}</label>
            <input
              type="text"
              name="serviceFormat"
              id='serviceFormat'
              placeholder="unesi format servisa"
              onChange={handleChange}
              value={formData.serviceFormat}

            />
            <label htmlFor="">Cijena (KM)</label>
            <input type="number" onChange={handleChange} id='price' name="price" value={formData.price}
 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateService