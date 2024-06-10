import express from 'express';
const router = express.Router()
import {  addOrderItems,
    getOrderById, 
    getOrders, 
    getMyOrders,
    updateOrderToPaid,
    updateOrderToDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').get(protect, admin, updateOrderToPaid)
router.route('/:id/deliver').get(protect, admin, updateOrderToDelivered)

export default router;