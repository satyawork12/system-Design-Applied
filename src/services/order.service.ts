import { addOrderItemType, CreateOrderType, OrderItemType } from "../validation/order.validation";
import { pool } from "../config/database"
import { addOrderItems } from "../repositories/orderItem.repository";
import { addOrder, OrderStatus } from "../repositories/order.repository";
import { getProductByIds } from "../repositories/product.repository";


export class OrderService {

    async createOrder(data: CreateOrderType) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN')
            //first we need to create order because orderItem table is referenced by order_id

            //first we need to calculate the total amount because order table need it
            const productsItem: OrderItemType[] = data.items;
            const productsId: string[] = [];

            productsItem.forEach((item) => {
                productsId.push(item.product_id);
            })


            const productsWithPrice = await getProductByIds(productsId, client)
            const priceByProductId = new Map(
                productsWithPrice.map((product) => [product.id, product.price])
            );
            const totalPrice = productsItem.reduce((acc, item) => {
                const productPrice = priceByProductId.get(item.product_id);
                if(productPrice === undefined){
                    throw new Error(`Product with id ${item.product_id} not found`);
                }
                return acc + (productPrice * item.quantity);
            },0);
            //     addOrder()
            const order = await addOrder({
                user_id: data.user_id,
                totalAmount: totalPrice.toString(),
                status: OrderStatus.PENDING
            }, client)
            const orderId = order.id;
            const orderItemsWithPrice : addOrderItemType[] = productsItem.map((item) => ({ 
                ...item,
                unit_price: priceByProductId.get(item.product_id).toString(),
            }))
            await addOrderItems(orderId,orderItemsWithPrice, client)
            await client.query('COMMIT');

        }
        catch (error) {
            await client.query('ROLLBACK'); 
            throw error;
        } finally {
            client.release();
        }


    }
}