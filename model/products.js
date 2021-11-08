import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 1},
    comment: { type: String, required: true },
    date:{
        type:Date,
        default:Date.now
    }
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
   
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
