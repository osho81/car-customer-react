import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CarService from '../services/CarService';


// UNUSED COMPONENT SINCE CUSTOMER SHOULD NOT BE ABLE TO CHANGE CAR!


function UpdateCarComponent(props) {

    // const { id } = useParams(); // Get current/selected car id

    const { state } = useLocation();
    const { id } = state; // Get id sent in as state from navigation method

    const [selectedCar, setSelectedCar] = useState("");

    useEffect(() => {

        const getCarById = () => { // Use id extracted from useParams
            CarService.getCarById(id).then((response) => {
                setSelectedCar(response.data);


            })
        }

        getCarById();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])


    const handleRegNr = (e) => {
        setSelectedCar({...selectedCar, regNr: e.target.value}) // Update certain field, shortcut approach
    };
    const handleDailySek = (e) => {
        setSelectedCar({...selectedCar, dailySek: e.target.value}) // Update certain field, shortcut approach
    };
    const handleType = (e) => {
        setSelectedCar({...selectedCar, type: e.target.value}) // Update certain field, shortcut approach
    };

    

    return (
        <div>
            <div className="card w-[50%] bg-base-100 shadow-xl ml-[25%]">
                <div className="card-body">
                    <h2 className="card-title text-sm justify-center">Update car with registration number
                        <div className="font-semibold opacity-70 -ml-2">
                            <span className="badge badge-ghost badge-lg"> {selectedCar.regNr} </span>
                        </div>
                    </h2>

                    {/* Form here in the card body */}

                    <div>

                        {/* SEE form input examples at https://daisyui.com/components/input/ */}

                    </div>





{/* 
                    <input
                        value={selectedCar.regNr}
                        type="text"
                        onChange={handleRegNr}
                    
                    />
                    <input
                        value={selectedCar.dailySek}
                        type="text"
                        onChange={handleDailySek}
                   
                    />
                    <input
                        value={selectedCar.type}
                        type="text"
                        onChange={handleType}
                   
                    /> */}


                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCarComponent;