import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarService from '../services/CarService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";

function ViewCarDetailsComponent(props) {

    // id param (i.e. eventCarId from button click navigated to here)
    const { id } = useParams();

    const [selectedCar, setSelectedCar] = useState("");

    const navigate = useNavigate();

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


    const goBack = () => {
        navigate(-1); // -1 goes back to previous page
    }

    const openUpdateCarForm = () => {
        // Instead of `path/${id}`, send in data as state, to fetch from other location
        navigate(`/updatecar`, { state: { id: id} });  
    }



    return (
        <div className='mb-[8%]'>
            <div className="card w-[50%] bg-base-100 shadow-xl image-full ml-[25%] mt-[2%]" style={{ zIndex: '-1' }}>
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

                </div>
            </div>
            <div className="card-actions mt-[1%] ml-[25%] mr-[25%] flex justify-between">
                <button className="btn btn-outline back-btn" onClick={goBack} >
                    <FontAwesomeIcon icon={faBackwardStep} />
                </button>
                <button className="btn btn-outline edit-btn" onClick={openUpdateCarForm}>Edit</button>
            </div>
        </div>
    );
}

export default ViewCarDetailsComponent;