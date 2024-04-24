import User from "../models/user.model.js"
import Service from "../models/service.model.js";
import { toggleServiceActiveStatus } from "./service.controller.js"; // Importajte funkciju za ažuriranje stanja servisa


export const toggleUserActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).send("Korisnik nije pronađen.");
    }
    
    // Obrnuti trenutni status aktivnosti korisnika
    user.isActive = !user.isActive;
    await user.save();
    
    // Ažuriraj stanje svih servisa korisnika
    const updatedServices = await toggleServiceActiveStatus(id, user.isActive);
    
    res.status(200).json({ 
      message: `Status aktivnosti korisnika ${user.username} i svih njegovih usluga uspješno ažuriran.`,
      isActive: user.isActive,
      updatedServices: updatedServices // Možete vratiti ažurirane servise ako je potrebno
    });
  } catch (error) {
    console.error("Došlo je do greške prilikom ažuriranja statusa aktivnosti korisnika:", error);
    res.status(500).send("Došlo je do greške prilikom ažuriranja statusa aktivnosti korisnika.");
  }
};

export const deleteUser = async (req, res) => {
  try {
    // Pronalazimo korisnika koji se briše po ID-u
    const user = await User.findById(req.params.id);
    
    // Proveravamo da li je korisnik pronađen
    if (!user) {
      return res.status(404).send("Korisnik nije pronađen.");
    }
    
    // Brišemo korisnika
    await User.findByIdAndDelete(req.params.id);
    
    // Vraćamo odgovor da je korisnik uspešno obrisan
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