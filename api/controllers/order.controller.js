import Service from "../models/service.model.js"
import Order from "../models/order.model.js"

import Stripe from "stripe";

export const createOrder =async (req, res, next) => {
    try{

        // console.log("Service ID:", req.params.serviceId); // Log the service ID

        const service = await Service.findById(req.params.serviceId);
        // console.log("Service:", service); // Log the service object

        if (!service) {
            return res.status(404).send("Service not found");
        }


        const newOrder = new Order({
            serviceId: service._id,
            img: service.cover,
            title: service.title,
            buyerId: req.userId,
            sellerId: service.userId,
            price: service.price,
            payment_intent: "temporary",
          });
          await newOrder.save();
          res.status(200).send("successful");
          
    } catch(err)
    {
        next(err);
    }
}

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const service = await Service.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: service.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    serviceId: service._id,
    img: service.cover,
    title: service.title,
    buyerId: req.userId,
    sellerId: service.userId,
    price: service.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

 export const adminOrders = async (req, res, next) =>
 {
  try {
   
    const orders = await Order.find();
    res.send(orders);
  
 
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Greška prilikom dobijanja svih narudžbi' });
}
 }


 export const getOrders = async (req, res, next) => {
    
  try {
        const orders = await Order.find({
          ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
          isCompleted: true,
        });
        // console.log(orders.length)
        res.status(200).send(orders);
      } catch (err) {
        next(err);
      }
   };
   export const countOrders = async (req, res, next) => {
    try {
      const userId = req.query.userId;
      const isSeller = req.query.isSeller === 'true';
  

  
      const count = await Order.countDocuments({
        ...(isSeller ? { sellerId: userId } : { buyerId: userId }),
        isCompleted: true,
        isFinishedBuyer: true,
        isFinishedSeller: true,
      });
  
      res.status(200).send({ count });
    } catch (err) {
      next(err);
    }
  };
   export const confirm = async (req, res, next) => {
     try {
       const orders = await Order.findOneAndUpdate(
        {
           payment_intent: req.body.payment_intent,
         },
         {
           $set: {
             isCompleted: true,
           },
         }
       );
      
   

       res.status(200).send("Order has been confirmed.");
     } catch (err) {
       next(err);
     }
   };
   export const toggleFinishOrder = async (req, res) => {
    try {
      const  currentUserIsSeller  = req.body.isSeller
      const  orderId  = req.body.orderId

      const order = await Order.findById(orderId);

      if (!orderId) {
        return res.status(404).send("narudžba nije pronađena.");
      }
      if(currentUserIsSeller)
        {
          order.isFinishedSeller = true;
        }
      
      if(!currentUserIsSeller)
          {
            order.isFinishedBuyer = true;
          }
          await order.save();
      res.status(200).json({
        message: `Stanje order s ID-om ${orderId} uspješno promijenjeno.`
      });
    } catch (error) {
      console.error("Došlo je do greške prilikom promjene stanja narudžbe:", error);
      res.status(500).send("Došlo je do greške prilikom promjene stanja narudžbe.");
    }
  };
  export const getOrdersByBuyerAndService = async (req, res, next) => {
    try {
        const { buyerId, serviceId } = req.params;
  
        const orders = await Order.find({
            serviceId,
            buyerId,
            isCompleted: "true",
        });
        res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
};
  export const getOrdersByMonth = async (req, res, next) => {
    try {
      const ordersByMonth = await Order.aggregate([
        {
          $match: {
            $expr: {
              $or: [
                { $eq: ["$sellerId", req.userId] }, // Provjeravamo da li je trenutni korisnik prodavatelj
                { $eq: ["$buyerId", req.userId] } // Provjeravamo da li je trenutni korisnik kupac
              ]
            }, // Filtriramo narudžbe samo za trenutnog korisnika
            isCompleted: 'true' // Filtriramo završene narudžbe
          }
        },
        {
          $group: {
            _id: { $month: "$createdAt" }, // Grupiramo po mjesecu kreiranja narudžbe
            count: { $sum: 1 } // Brojimo koliko narudžbi ima u svakom mjesecu
          }
        },
        { $sort: { "_id": 1 } } // Sortiramo po mjesecu
      ]);
      res.status(200).json(ordersByMonth);

    } catch (err) {
      next(err);
    }
  };

  export const getTotalPricesByMonth = async (req, res, next) => {
    try {
      const totalPricesByMonth = await Order.aggregate([
        {
          $match: {
            isCompleted: "true" // Filtriramo završene narudžbe
          }
        },
        {
          $group: {
            _id: { $month: "$createdAt" }, // Grupiramo po mjesecu kreiranja narudžbe
            totalAmount: { $sum: "$price" } // Sumiramo cijene narudžbi u svakom mjesecu
          }
        },
        { $sort: { "_id": 1 } } // Sortiramo po mjesecu
      ]);
      res.status(200).json(totalPricesByMonth);
    } catch (err) {
      next(err);
    }
  };
  export const getTotalCount = async (req, res, next) => {
    try {
      // Dohvati ukupan broj narudžbi iz baze podataka
      const totalCount = await Order.countDocuments();
  
      // Vrati odgovor s ukupnim brojem narudžbi
      res.status(200).json({ totalCount });
    } catch (error) {
      // Uhvati i proslijedi grešku ako se dogodi
      next(error);
    }
  };
  export const getTotalEarningsLast7DaysAndToday = async (req, res, next) => {
    try {
      const lastMonth = new Date();
      lastMonth.setDate(lastMonth.getDate() -30)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const totalEarningsLastMonth = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: lastMonth }, 
            isCompleted: "true" 
          }
        },
        {
          $group: {
            _id: null, // Grupiramo sve narudžbe u jednu grupu
            totalAmount: { $sum: "$price" } // Sumiramo cijene narudžbi
          }
        }
      ]);

      const totalEarningsLast7Days = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: sevenDaysAgo }, // Filtriramo narudžbe kreirane u posljednjih 7 dana
            isCompleted: "true" // Samo završene narudžbe
          }
        },
        {
          $group: {
            _id: null, // Grupiramo sve narudžbe u jednu grupu
            totalAmount: { $sum: "$price" } // Sumiramo cijene narudžbi
          }
        }
      ]);

      const totalEarningsToday = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: today }, // Filtriramo narudžbe kreirane danas
            isCompleted: "true" // Samo završene narudžbe
          }
        },
        {
          $group: {
            _id: null, // Grupiramo sve narudžbe u jednu grupu
            totalAmount: { $sum: "$price" } // Sumiramo cijene narudžbi
          }
        }
      ]);

      // Dohvaćanje samo iznosa zarade iz rezultata
      const totalEarnings = {
        last7Days: totalEarningsLast7Days.length > 0 ? totalEarningsLast7Days[0].totalAmount : 0,
        today: totalEarningsToday.length > 0 ? totalEarningsToday[0].totalAmount : 0,
        lastmonth: totalEarningsLastMonth.length > 0 ? totalEarningsLastMonth[0].totalAmount : 0

      };
  
      res.status(200).json(totalEarnings);
    } catch (err) {
      next(err);
    }
  };
  export const handleStateOrder = async (req, res) => {
   
    try {
      const { orderId, newState } = req.body;
  
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).send("Narudžba nije pronađena.");
      }
  
      // Provjeri je li stanje valjano
      if (newState !== "Prihvaćena" && newState !== "Odbijena") {
        return res.status(400).send("Nevaljano stanje narudžbe.");
      }
  
      // Ažuriraj stanje narudžbe
      order.isOrderApproved = newState;
      await order.save();
      if (newState === "Prihvaćena") {
        await Service.findByIdAndUpdate(
          order.serviceId,
          { $inc: { sales: 1 } }
        );
      }
      res.status(200).json({
        message: `Stanje narudžbe s ID-om ${orderId} uspješno promijenjeno u ${newState}.`
      });
    } catch (error) {
      console.error("Došlo je do greške prilikom promjene stanja narudžbe:", error);
      res.status(500).send("Došlo je do greške prilikom promjene stanja narudžbe.");
    }
  };
  export const countUnprocessedOrders = async (req, res, next) => {
    try {
      const userId = req.userId;
      const isSeller = req.isSeller;
  
      // Kreiramo query objekat za pretragu
      const query = {
        isOrderApproved: "Neprocesirana",
        ...(isSeller ? { sellerId: userId } : { buyerId: userId }),
        isCompleted:"true"
      };

      // Brojimo dokumente koji odgovaraju query-ju
      const count = await Order.countDocuments(query);
  
      // Vraćamo broj narudžbi
      res.status(200).json({ count });
    } catch (err) {
      next(err);
    }
  };
  export const getApprovedOrders = async (req, res, next) => {
  try {
    const { userId, isSeller } = req; // Dohvaćamo userId i isSeller iz request objekta

    // Postavljamo filter na osnovu uloge korisnika (prodavatelj ili kupac) i isOrderApproved statusa
    const query = {
      ...(isSeller ? { sellerId: userId } : { buyerId: userId }), // Filtriramo prema ulozi korisnika
      isOrderApproved: "Prihvaćena", // Samo "Neprocesirane" narudžbe
      isCompleted: true, // Završene narudžbe
    };

    const approvedOrders = await Order.find(query);

    res.status(200).json(approvedOrders);
  } catch (err) {
    next(err); // Proslijeđujemo grešku dalje u slučaju da se dogodi
  }
};