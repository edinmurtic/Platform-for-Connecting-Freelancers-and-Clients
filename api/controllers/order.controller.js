import Service from "../models/service.model.js"
import Order from "../models/order.model.js"

import Stripe from "stripe";

export const createOrder =async (req, res, next) => {
    try{

        console.log("Service ID:", req.params.serviceId); // Log the service ID

        const service = await Service.findById(req.params.serviceId);
        console.log("Service:", service); // Log the service object

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

 export const getOrders = async (req, res, next) => {
      try {
        const orders = await Order.find({
          ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
          isCompleted: true,
        });
  
        res.status(200).send(orders);
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
      // //  await Service.updateOne(
      // //   { _id: order.serviceId },
      // //   { $inc: { sales: 1 } } // Increment sales count by 1
      // // );
      // // console.log("_id",_id)
      // // console.log("sales",sales)

       res.status(200).send("Order has been confirmed.");
     } catch (err) {
       next(err);
     }
   };
   export const toggleFinishOrder = async (req, res) => {
    try {
      const { orderId } = req.body;
      const order = await Order.findById(orderId);

      if (!orderId) {
        return res.status(404).send("narudžba nije pronađen.");
      }
  
      order.isFinished = true;
      await order.save();

      res.status(200).json({
        message: `Stanje order s ID-om ${orderId} uspješno promijenjeno.`,
        isFinished: order.isFinished,
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

      console.log("ordersByMonth",ordersByMonth)
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
            createdAt: { $gte: lastMonth }, // Filtriramo narudžbe kreirane u posljednjih 7 dana
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
      console.log("totalEarningsLastMonth:", totalEarningsLastMonth);

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
      console.log("totalEarningsLast7Days:", totalEarningsLast7Days);

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
      console.log("totalEarningsToday:", totalEarningsToday);

      // Dohvaćanje samo iznosa zarade iz rezultata
      const totalEarnings = {
        last7Days: totalEarningsLast7Days.length > 0 ? totalEarningsLast7Days[0].totalAmount : 0,
        today: totalEarningsToday.length > 0 ? totalEarningsToday[0].totalAmount : 0,
        lastmonth: totalEarningsLastMonth.length > 0 ? totalEarningsLastMonth[0].totalAmount : 0

      };
  
      res.status(200).json(totalEarnings);
      console.log("totalEarnings:", totalEarnings);
    } catch (err) {
      next(err);
    }
  };
  