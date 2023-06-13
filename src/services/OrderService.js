import axios from "axios";

class OrderService {

    orderCar(carOrder) {
        console.log("I am in createOrder");
        return axios.post("http://localhost:9090/api/v1/ordercar", carOrder);
    }

    getMyOrders(customer) { // Could work with just the id, but backend requires the object customer
        console.log("I am in createOrder");
        return axios.post("http://localhost:9090/api/v1/myorders", customer);
    }

    getPriceInEuro(order) {
        console.log("I am in getPriceInEuro");
        return axios.post("http://localhost:9090/api/v1/exchange", order, { headers: { 'Content-Type': 'application/json' } });
    }

}

export default new OrderService();
