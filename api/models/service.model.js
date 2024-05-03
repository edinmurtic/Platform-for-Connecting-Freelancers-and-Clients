import mongoose from 'mongoose';

const { Schema } = mongoose;
const serviceShema = new Schema(
  {
    userId:
        {
          type: String,
          required: true,
        },
    title:
        {
          type: String,
          required: true,
        },
   shortTitle:
     {
       type: String,
      // required: true,
    },
     desc:
        {
          type: String,
          required: true,
        },
   shortDesc:
   {
    type: String,
    // required: true,
   },
    totalStars:
        {
          type: Number,
          default: 0,
        },
    starNumber:
        {
          type: Number,
          default: 0,
        },
    category:
        {
          type: String,
          required: true,
        },
      subcategory: 
      { 
        type: String,
        // required: true,
      },
    price:
        {
          type: Number,
          required: true,
        },
    cover:
        {
          type: String,
          required: true,
        },
    images:
        {
          type: [String],
          required: true,
        },
    deliveryTime:
        {
          type: Number,
          required: true,
        },
    revisionNumber:
        {
          type: Number,
          required: true,
        },
    sales:
        {
          type: Number,
          default: 0,
        },
    serviceStyle: 
        {
          type: String,
        },
    serviceFormat:
        {
          type: String,
        },
    warrantyInfo:
        {
          type: String,
        },
    isActive:
     {
      type: Boolean,
      default: true
     }
  },
  {
    timestamps: true,

  },
);
export default mongoose.model('Service', serviceShema);
