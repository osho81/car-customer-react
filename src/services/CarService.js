import axios from "axios";

class CarService {

    getCarsList() {
        console.log("I am in getAllCars");
        return axios.get("http://localhost:9090/api/v1/cars");
    }

}

export default new CarService();
