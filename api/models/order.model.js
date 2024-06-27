import mongoose from 'mongoose';

const { Schema } = mongoose;
const orderShema = new Schema(
  {
    serviceId:
        {
          type: String,
          required: true,
        },
    img:
        {
          type: String,
          required: false,
        },
    title:
        {
          type: String,
          required: true,
        },
    price:
        {
          type: Number,
          required: true,
        },
    sellerId:
        {
          type: String,
          required: true,
        },
    buyerId:
        {
          type: String,
          required: true,
        },
    isCompleted:
        {
          type: String,
          default: false,
        },
    isOrderApproved:
        {
          type: String,
          enum: ['Neprocesirana', 'Prihvaćena', 'Odbijena'],
          default: 'Neprocesirana'
        },
    isFinishedSeller:
        {
          type: Boolean,
          default: false,
        },
        isFinishedBuyer:
        {
          type: Boolean,
          default:false,
        },
    payment_intent:
        {
          type: String,
          required: true,
        },
  },
  {
    timestamps: true,

  },
);
export default mongoose.model('Order', orderShema);
