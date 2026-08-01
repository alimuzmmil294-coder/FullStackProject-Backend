import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of product is requiered...."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is requiered...."],
  },
  category: {
    type: String,
    required: [true, "Category is requiered...."],
  },
  price: {
    type: Number,
    required: [true, "Price is requiered...."],
    min: [0, "Price can't be negative..."],
  },
  images: {
    type: [String],
    default: [],
  },
  stock: {
    type: Number,
    required: [true, "Please provide product stock quantity...."],
    min: [0, "Product can't be negative..."],
    default: 0,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [ture, "Product must belong to a seller..."],
  },
},{
    timestamps:true
});

export const Product = await mongoose.model("products", productSchema);
