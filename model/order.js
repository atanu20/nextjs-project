




import mongoose from 'mongoose';

const orderSchemanew = new mongoose.Schema(
    {
        user: { type: String, required: true },

        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            phone: { type: String, required: true },


        },
        paymentMethod: { type: String, required: true, default: 'ONLINE' },
        paymentId: { type: String, required: true },

        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, required: true, default: false },
        isDelivered: { type: Boolean, required: true, default: false },
        date: {
            type: Date,
            default: Date.now
        }
    }

);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchemanew);
export default Order;

