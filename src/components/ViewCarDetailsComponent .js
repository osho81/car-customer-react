import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarService from '../services/CarService';

function ViewCarDetailsComponent(props) {

    // id param (i.e. eventCarId from button click navigated to here)
    const { id } = useParams();

    const [selectedCar, setSelectedCar] = useState("");

    useEffect(() => {

        const getCarById = () => { // Use id extracted from useParams
            CarService.getCarById(id).then((response) => {
                console.log(response.data);
                setSelectedCar(response.data);
            })
        }

        getCarById();

    }, [props])


    return (
        <div>
            <div className="card w-[60%] bg-base-100 shadow-xl image-full ml-[20%] mt-[2%]" style={{zIndex:'-1', position:'relative'}}>
                <figure>
                    <img src={'/images/' + selectedCar.type + '.jpg'} alt="Picture of the car" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title justify-center">Car {selectedCar.regNr} details</h2>

                    {/* Render all details from slected car, into a two-column table BODY: */}
                    <div className="overflow-x-auto text-left">
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Car Id </td>
                                    <td> {selectedCar.id} </td>
                                </tr>
                                <tr >
                                    <td>Registration number </td>
                                    <td> {selectedCar.regNr} </td>
                                </tr>
                                <tr>
                                    <td>Model brand</td>
                                    <td> {selectedCar.model} </td>
                                </tr>
                                <tr>
                                    <td>Model year</td>
                                    <td> {selectedCar.modelYear} </td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td> {selectedCar.type} </td>
                                </tr>
                                <tr>
                                    <td>Cost/day</td>
                                    <td> {selectedCar.dailySek} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Edit</button>
                        <button className="btn btn-primary">BAck</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCarDetailsComponent;