import axios from "axios";

// Functions communicating with backend springBoot rest api endpoints
class CarService {

    getCarsList(bearerToken) { 
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.get("http://localhost:9090/api/v1/cars", config);
    }

    getCarById(carId, bearerToken) {
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` }
        };
        return axios.get("http://localhost:9090/api/v1/car/" + carId, config);
    }

    // TODO: 
    // - update Car
    // - delete Car

}

export default new CarService();
