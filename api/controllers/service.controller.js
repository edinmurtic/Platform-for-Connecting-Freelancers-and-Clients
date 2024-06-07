import createError from "./utils/createError.js";
import Service from "../models/service.model.js"


export const updateService = async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.userId !== service.userId) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
};

export const toggleServiceActiveStatusById = async (req, res) => {
  try {
    const { serviceId } = req.body;

    // Pronađite servis po primljenom serviceId-u
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).send("Servis nije pronađen.");
    }

    // Promijenite stanje isActive servisa
    service.isActive = !service.isActive;
    await service.save();

    res.status(200).json({
      message: `Stanje servisa s ID-om ${serviceId} uspješno promijenjeno.`,
      isActive: service.isActive,
    });
  } catch (error) {
    console.error("Došlo je do greške prilikom promjene stanja servisa:", error);
    res.status(500).send("Došlo je do greške prilikom promjene stanja servisa.");
  }
};

export const toggleServiceActiveStatus = async (userId, isActive) => {
  try {
    // Pronađi sve servise korisnika koji trenutno nisu aktivni
    const services = await Service.find({ userId, isActive: !isActive });

    // Ažuriraj stanje svakog servisa
    for (const service of services) {
      service.isActive = isActive;
      await service.save();
    }

    return true; // Uspješno ažurirano
  } catch (error) {
    console.error("Došlo je do greške prilikom ažuriranja statusa aktivnosti servisa:", error);
    return false; // Neuspješno ažurirano
  }
};
export const createService = async(req, res, next) => {
if (!req.isSeller) return next(createError(403, 'Samo prodavaoci mogu kreirati novi servis'));

  const newService = new Service({
    userId: req.userId,
    ...req.body,
})
try {
    const savedService  = await newService.save ();
    res.status(201).json(savedService);
} catch (err) {
    next(err);
}
};
export const deleteService = async(req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service.userId !== req.userId)
      return next(createError(403, "Možes obrisati samo svoju uslugu!"));

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).send("Servis je obrisan!");
  } catch (err) {
    next(err);
  }
};

export const getService = async(req, res, next) => {
  try {
        const service = await Service.findById(req.params.id);
        if (!service) next(createError(404, "Servis nije pronađen!"));
        res.status(200).send(service);
      } catch (err) {
        next(err);
      }
};
export const getServices = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.category && { category: q.category }),
    ...(q.subcategory && { subcategory: q.subcategory }),

    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.revisionNumber && { revisionNumber: { $gt: q.revisionNumber } }),
    ...(q.deliveryTime && { deliveryTime: { $lte: q.deliveryTime } }), // Dodajemo filter za maksimalno vreme isporuke
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    ...(q.stars && { starNumber: { $gt: 0 }, $expr: { $gte: [{ $divide: ["$totalStars", "$starNumber"] }, parseInt(q.stars)] } })
    // ,isActive:true
  };
  if (q.isActive) {
    filters.isActive = q.isActive === 'true'; // Konvertujemo string 'true' u boolean vrijednost
  }
  try {
    const services = await Service.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(services);
  } catch (err) {
    next(err);
  }
};