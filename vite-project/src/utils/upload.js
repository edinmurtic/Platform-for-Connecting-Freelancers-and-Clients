import axios from "axios";

const upload = async(file) => {
  const data = new FormData();
  data.append("file",file);
  data.append("upload_preset","myjobs");
  try{
    const res= await axios.post("https://api.cloudinary.com/v1_1/dc95uaa5l/image/upload",data);
    const {url}= res.data;

  }catch (err)
  {
    console.log(err);
  }

};
export default upload