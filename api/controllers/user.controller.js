import User from "../models/user.model.js"
import Service from "../models/service.model.js";
import { toggleServiceActiveStatus } from "./service.controller.js"; // Importajte funkciju za ažuriranje stanja servisa
import bcrypt from "bcrypt";


export const updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(errorHandler(404, 'User not found!'));
  }


  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 5);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};


export const toggleUserActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).send("Korisnik nije pronađen.");
    }
    
    user.isActive = !user.isActive;
    await user.save();
    
    const updatedServices = await toggleServiceActiveStatus(id, user.isActive);
    
    res.status(200).json({ 
      message: `Status aktivnosti korisnika ${user.username} i svih njegovih usluga uspješno ažuriran.`,
      isActive: user.isActive,
      updatedServices: updatedServices 
    });
  } catch (error) {
    console.error("Došlo je do greške prilikom ažuriranja statusa aktivnosti korisnika:", error);
    res.status(500).send("Došlo je do greške prilikom ažuriranja statusa aktivnosti korisnika.");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).send("Korisnik nije pronađen.");
    }
    
    await User.findByIdAndDelete(req.params.id);
    
    res.status(200).send("Korisnik je uspešno obrisan.");
  } catch (error) {
    console.error("Došlo je do greške prilikom brisanja korisnika:", error);
    res.status(500).send("Došlo je do greške prilikom brisanja korisnika.");
  }
};




export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
}
export const getAllUser = async (req, res, next) => {

  try {
   
      const users = await User.find();
      res.send(users);
    
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Greška prilikom dobijanja korisnika' });
  }
}

export const getTotalUserCount = async (req, res, next) => {
  try {
    const totalCount = await User.countDocuments();
    res.status(200).json({ totalCount });
  } catch (error) {
  next(error); }
};