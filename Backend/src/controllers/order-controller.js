import { Order } from "../models/order-model.js";
import { orderPlacedMail } from "../utils/mail/placed-oreder-mail.js";

export const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({});
        return res.status(200).json({
            success: true,
            message: "Admin get all orders",
            data: orders,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error: can't fetch order list",
        });
    }
};


/**
 * 
 * @name createOrderList
 * @description create order 
 * @access private
 */
export const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0 || !totalAmount || !shippingAddress || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: "Invalid order data",
            });
        }

        const order = new Order({
            user: req.user._id,
            items,
            shippingAddress,
            paymentMethod,
            totalAmount,
        });

        await order.save();

        const emailData = {
            customerName: req.user?.username || "Customer",
            orderId: order._id.toString(),
            orderDate: order.createdAt ? order.createdAt.toLocaleDateString() : new Date().toLocaleDateString(),
            deliveryAddress: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.pincode}, ${shippingAddress.country}`,
            items: items.map((item) => ({
                name: item.name || item.product || "Product",
                quantity: item.quantity,
                price: typeof item.price === "number" ? item.price.toFixed(2) : item.price,
            })),
            subtotal: typeof totalAmount === "number" ? totalAmount.toFixed(2) : totalAmount,
            shipping: order.shippingCost ? Number(order.shippingCost).toFixed(2) : "0.00",
            total: typeof totalAmount === "number" ? totalAmount.toFixed(2) : totalAmount,
        };

        orderPlacedMail(req.user.email, emailData).catch((emailErr) => {
            console.log("Order confirmation email failed:", emailErr);
        });

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error: can't create order",
        });
    }
};

export const getMyorderById = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for this user",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User orders fetched successfully",
            data: orders,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error: can't get order",
        });
    }
};

export const    updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        order.orderStatus = status;
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal error: can't update order status",
        });
    }
};
