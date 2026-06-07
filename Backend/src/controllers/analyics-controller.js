import { Product } from "../models/product-model.js"
import { Order } from "../models/order-model.js"
import { User } from "../models/user-model.js"

export const getAdminStates = async (req, res) => {
    try {
        const totalUser = await User.countDocuments({ role: "user" });
        const totalProduct = await Product.countDocuments({});
        const totalOrder = await Order.countDocuments({});

        const order = await Order.find({});
        const totalRevenu = order.reduce((acc, order) => acc + order.totalAmount, 0);



        res.status(200).json({
            success: true,
            message: "The States are generated successfully ",
            data: {
                totalOrder, totalProduct, totalUser, totalRevenu
            }
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Internal error : analitics states "
        })
    }
}