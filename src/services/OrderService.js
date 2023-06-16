import axios from "axios";

class OrderService {

    orderCar(carOrder) {
        console.log("I am in createOrder");
        return axios.post("http://localhost:9090/api/v1/ordercar", carOrder);
    }

    getMyOrders(customer) { // Could work with just the id, but backend requires the object customer
        console.log("I am in getMyOrders");
        return axios.post("http://localhost:9090/api/v1/myorders", customer);
    }

    getPriceInEuro(order) { // "Get".., means in this case, to update backend with price in euro 
        console.log("I am in getPriceInEuro");
        // return axios.post("http://localhost:9090/api/v1/exchange", order);
        return axios.post("http://localhost:9090/api/v1/exchange", order, { headers:{"Content-Type" : "application/json" }});
    }

    cancelOrder(order) { // In this case, it is rather cancel, than delete
        console.log("I am in deleteOrder");
        return axios.put("http://localhost:9090/api/v1/cancelorder", order);
    }

    updateOrder(order) {
        console.log("I am in updateOrder");
        return axios.put("http://localhost:9090/api/v1/updateorder", order);
    }

}

export default new OrderService();
