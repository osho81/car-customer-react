import axios from "axios";

class OrderService {

    orderCar(carOrder, bearerToken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.post("http://localhost:9090/api/v1/ordercar", carOrder, config);
    }

    getMyOrders(customer, bearerToken) { // not just ustomer id, since backend requires object customer
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.post("http://localhost:9090/api/v1/myorders", customer, config);
    }

    getPriceInEuro(order, bearerToken) { // "Get".., means in this case, to update backend with price in euro 
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        // return axios.post("http://localhost:9090/api/v1/exchange", order);
        return axios.post("http://localhost:9090/api/v1/exchange", order, config);
        // { headers:{"Content-Type" : "application/json" }}
    }

    cancelOrder(order, bearerToken) { // In this case, it is rather cancel, than delete
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.put("http://localhost:9090/api/v1/cancelorder", order, config);
    }

    updateOrder(order, bearerToken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.put("http://localhost:9090/api/v1/updateorder", order, config);
    }

}

export default new OrderService();
