import Service from "../models/service.model.js"
import Order from "../models/order.model.js"


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
          res.status(200).send("successful")
    } catch(err)
    {
        next(err);
    }
}



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
//   export const confirm = async (req, res, next) => {
//     try {
//       const orders = await Order.findOneAndUpdate(
//         {
//           payment_intent: req.body.payment_intent,
//         },
//         {
//           $set: {
//             isCompleted: true,
//           },
//         }
//       );
  
//       res.status(200).send("Order has been confirmed.");
//     } catch (err) {
//       next(err);
//     }
//   };