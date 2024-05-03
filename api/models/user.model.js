import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName:
    {
      type: String,
      required: true,
    },
    username:
     {
       type: String,
       required: true,
       unique: true,
     },
    email:
    {
      type: String,
      required: true,
      unique: true,
    },
    password:
    {
      type: String,
      required: true,
    },
    img:
    {
      type: String,
      required: false,
    },
    country:
    {
      type: String,
      required: false,
    },
    phone:
     {
       type: String,
       required: true,
     },
    desc:
     {
       type: String,
       required: false,
     },
    isSeller:
     {
       type: Boolean,
       default: false,
     },
     isActive:
     {
      type:Boolean,
      default: true
     }
  },
  {
    timestamps: true,

  },
);
export default mongoose.model('User', userSchema);
