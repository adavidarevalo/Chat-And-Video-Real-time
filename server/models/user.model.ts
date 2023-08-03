import { Schema, model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  picture: boolean;
  status: string;
  matchPasswords(password: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'This email is already in use'],
      lowercase: [true, 'Please provide a valid email'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    picture: {
      type: String,
      default: process.env.DEFAULT_PICTURE,
    },
    status: {
      type: String,
      default: process.env.DEFAULT_STATUS,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long'],
      maxlegnth: [128, 'Password must be at least 128 characters long'],
      validate: [
        validator.isStrongPassword,
        'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character',
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User = model<UserDocument>('User', userSchema);
