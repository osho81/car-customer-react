import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CarService from '../services/CarService';

function UpdateCarComponent(props) {

    // const { id } = useParams(); // Get current/selected car id

    const { state } = useLocation();
    const { id } = state; // Get id sent in as state from navigation method

    const [selectedCar, setSelectedCar] = useState("");

    useEffect(() => {

        const getCarById = () => { // Use id extracted from useParams
            CarService.getCarById(id).then((response) => {
                console.log(response.data);
                setSelectedCar(response.data);
            })
        }

        getCarById();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    return (
        <div>
            <div className="card w-[50%] bg-base-100 shadow-xl ml-[25%]">
                <div className="card-body">
                    <h2 className="card-title">Update car with registration nr {selectedCar.regNr} </h2>
                    
                    {/* Form here in the card body
                     */}


                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCarComponent;