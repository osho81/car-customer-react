import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CarService from '../services/CarService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faBackwardStep, faForwardStep } from "@fortawesome/free-solid-svg-icons";

function ViewCarDetailsComponent(props) {

    // id param (i.e. eventCarId from button click navigated to here)
    // const { id } = useParams(); // If get id from url path var

    const { state } = useLocation();
    const { id, backpath } = state; // If get id from navigate state



    const [selectedCar, setSelectedCar] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const getCarById = () => { // Use id extracted from useParams
            CarService.getCarById(id).then((response) => {
                console.log(response.data);
                setSelectedCar(response.data);
            }).catch(error => {
                console.log(error);
            })
        }

        getCarById();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])


    const goBack = () => {
        // Basic go back to browserns previous page
        // navigate(-1); // -1 goes back

        // Go back to specific page, e.g. after certain next/previous car clicks
        console.log(backpath);
        navigate(backpath);
    }

    const nextCar = () => {
        // const nextCarId = (Number(id) + 1);
        // navigate(`/car/${nextCarId}`);  // Go to car with this id + 1

        let nextCarId;
        CarService.getCarsList().then((response) => {
            if (response.data.length <= Number(id)) {
                nextCarId = 1; // restart from first car, if at last car
                CarService.getCarById(nextCarId).then((response) => {
                    setSelectedCar(response.data); // Set new car to render
                })
                navigate(`/car`, { state: { id: nextCarId, backpath: backpath } });
            } else {
                nextCarId = (Number(id) + 1);
                // Use navigate state, instead of url pathvar:
                CarService.getCarById(nextCarId).then((response) => {
                    setSelectedCar(response.data); // Set new car to render
                })
                // Rerender this component with new car; re-save backpath (to /allcars, /minicars etc)
                navigate(`/car`, { state: { id: nextCarId, backpath: backpath } });
            }
        }).catch(error => {
            console.log(error);
        })

        // Alternatively, use cars list (all cars, mini cars etc) to go through cars
    }

    const previousCar = () => {
        let previousCarId;
        CarService.getCarsList().then((response) => {
            console.log(response.data.length);
            if (Number(id) <= 1) {
                previousCarId = response.data.length; // restart from last car, if at first car
                CarService.getCarById(previousCarId).then((response) => {
                    setSelectedCar(response.data);
                })
                navigate(`/car`, { state: { id: previousCarId, backpath: backpath } });
            } else {
                previousCarId = (Number(id) - 1);
                CarService.getCarById(previousCarId).then((response) => {
                    setSelectedCar(response.data);
                })
                navigate(`/car`, { state: { id: previousCarId, backpath: backpath } });
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const orderCar = () => {
        navigate(`/ordercar`, { state: { id: id }} ); // Go to order form, with this id as state
    }


    // Disabled function, since customer should NOT be able to edit car (only admin)
    // const openUpdateCarForm = () => {
    //     // Instead of `path/${id}`, send in data as state, to fetch from other location
    //     navigate(`/updatecar`, { state: { id: id} });  
    // }



    return (
        <div className='mb-[8%]'>
            <div className="card w-[40%] bg-base-100 shadow-xl image-full ml-[30%] mt-[2%]" style={{ zIndex: '-1' }}>
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
            <div className="card-actions mt-[1%] ml-[30%] mr-[30%] flex justify-between">
                <button className="btn btn-outline back-btn" onClick={goBack} >
                    <FontAwesomeIcon icon={faBackward} />
                </button>

                <div className='space-x-4 w-[20%]'>
                    <button className="btn btn-outline edit-btn" onClick={previousCar}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </button>
                    <button className="btn btn-outline edit-btn" onClick={nextCar}>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </button>
                </div>

                <button className="btn btn-outline edit-btn" onClick={orderCar}>Rent</button>

                {/* Disabled button, since customer should NOT be able to edit car (only admin) */}
                {/* <button className="btn btn-outline edit-btn" onClick={openUpdateCarForm}>Edit</button> */}
             
            </div>
        </div>
    );
}

export default ViewCarDetailsComponent;