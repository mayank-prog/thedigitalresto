const Order = require('../models/orderModel');

const orderController = {
    createOrder: async (req, res) => {
        try {
            let uniqueOrderId;
            let isUnique = false;

            // Generate a random 5-digit number
            while (!isUnique) {
                uniqueOrderId = Math.floor(10000 + Math.random() * 90000); 
                // Generate a 5-digit number
                const existingOrder = await Order.findOne({ order_id: uniqueOrderId });
                if (!existingOrder) {
                    isUnique = true;
                }
            }
            const order = new Order({
                order_id: uniqueOrderId,
                restroId: req.body.restroId,
                order_status:req.body.order_status,
                order_type: req.body.order_type,
                address: req.body.address,
                items: req.body.items
            });
        
            await order.save();
            res.status(201).json({ order_id: order.order_id });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getOrder: async (req, res) => {
        try {
            const order = await Order.findOne({ order_id: req.params.order_id });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateOrderStatus: async (req, res) => {
        try {
            const { order_id } = req.params;
            const { order_status } = req.body;
            const order = await Order.findOneAndUpdate({ order_id }, { order_status }, { new: true });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const { order_id } = req.params;
            const order = await Order.findOneAndDelete({ order_id });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(204).end();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = orderController;
