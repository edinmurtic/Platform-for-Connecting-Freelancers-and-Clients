import React, { useReducer, useState } from 'react'
import './AddNew.css'
import { serviceReducer, INITIAL_STATE } from "../../reducers/serviceReducer";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { imageDb } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import getCurrentUser from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';


const AddNew = () => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    cover: "",
    images: [],
    desc: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    price: 0,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {

  console.log(e.target.value)
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1)
        return setError('You must upload at least one image');
     
      setLoading(true);
      setError(false);
      // const res = await fetch('/api/services/add', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     userRef: currentUser._id,
      //   }),
      // });
      
      try {
        console.log(formData);
        const body = {...formData, userRef: currentUser._id}

        await newRequest.post("/services/add", { ...body });
      } catch (err) {
        console.log(err);
      }



      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/service/${data._id}`);
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
            <label htmlFor="">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="design">Grafika i dizajn</option>
              <option value="web">Programiranje</option>
              <option value="animation">Konsalting</option>
              <option value="music">Video i animacija</option>
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
                {uploading ? 'Učitavanje...' : 'Učitaj'}
              </div>
              <button onClick={handleImageSubmit}>
                {uploading ? "Učitavanje" : "Učitaj"}
              </button>
            </div>
            <label htmlFor="">Opis</label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Kratki opisi za predstavljanje vaše usluge klijentima"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Kreiraj</button>
          </div>
          <div className="details">
                
            <label htmlFor="">Kratki opis</label>
           <textarea
              name="shortDesc"
              onChange={handleChange}
              id="shortDesc"
              placeholder="Kratak opis Vaše usluge"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="" >Vrijeme isporuke (e.g. 3 days)</label>
            <input type="number" id='deliveryTime' name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Broj revizija</label>
            <input
              type="number"
              name="revisionNumber"
              id='revisionNumber'
              onChange={handleChange}
            />
        
            <label htmlFor="">Cijena</label>
            <input type="number" onChange={handleChange} id='price' name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew