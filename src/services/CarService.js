import axios from "axios";

// Functions communicating with backend springBoot rest api endpoints
class CarService {

    getCarsList() { 
        console.log("I am in getAllCars");
        return axios.get("http://localhost:9090/api/v1/cars");
    }

    getCarById(carId) {
        console.log("I am in getById");
        return axios.get("http://localhost:9090/api/v1/car/" + carId);
    }

}

export default new CarService();
