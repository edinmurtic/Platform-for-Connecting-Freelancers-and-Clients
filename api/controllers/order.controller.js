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