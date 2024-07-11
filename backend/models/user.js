import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import * as argon2 from "argon2";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String, required: true,
    },
    email: {
      type: String, required: true,
    },
    password: {
      type: String, required: true,
    },
    bio: {
      type: String, default: 'Available',
    },
    profilePic: {
      type: String,
      default:
        'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    credits:{
      type: Number , default : 0 
    },
    lastPayment: {
      type: String,
    },
    premium: {
      type: Boolean, default: false,
    },
  },
  
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign(
      { id: this._id, email: this.email },
      process.env.SECRET,
      {
        expiresIn: '24h',
      }
    );
    console.log(token)
    return token;
  } catch (error) {
    console.log('error while generating token');
  }
};

userSchema.methods.addCredits = function (credits,receipt) {
  try {
    this.lastPayment = receipt
    this.credits += credits
    return this.save();
  } catch (error) {
    console.log('error while adding credits');
  }
};

userSchema.methods.subtractCredits = function (amount) {
  try {
    if ( this.credits >= amount ){

      this.credits -= amount

    }else{ return null }
    return this.save();
  } catch (error) {
    console.log('error while adding credits');
  }
};

userSchema.methods.checkCredits = function (amount) {
  try {
    if ( this.credits >= amount ){

      return true

    }else{ return false }
  } catch (error) {
    console.log('error while checking credits');
  }
};


const userModel = mongoose.model('User', userSchema);
export default userModel;
