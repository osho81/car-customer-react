import axios from "axios";

// Functions communicating with backend springBoot rest api endpoints
class CarService {

    // Get all cars
    getCarsList() { 
        console.log("I am in getAllCars");
        return axios.get("http://localhost:9090/api/v1/cars");
    }

    // Get specific car by id 
    getCarById(carId) {
        console.log("I am in getById");
        return axios.get("http://localhost:9090/api/v1/car/" + carId);
    }

    orderCar(carOrder) {
        console.log("I am in createOrder");
        return axios.post("http://localhost:9090/api/v1/ordercar", carOrder);
    }

    getMyOrders(customer) { // Could work with just the id, but backend requires the object customer
        console.log("I am in createOrder");
        return axios.post("http://localhost:9090/api/v1/myorders", customer);
    }

}

export default new CarService();
