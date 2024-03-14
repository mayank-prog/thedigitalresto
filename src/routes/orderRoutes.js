const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/:order_id', orderController.getOrder);
router.put('/:order_id', orderController.updateOrderStatus);
router.delete('/:order_id', orderController.deleteOrder);

module.exports = router;
