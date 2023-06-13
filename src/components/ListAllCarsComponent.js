import React, { useEffect, useState } from 'react';
// import BusImg from '/public/images/bus.jpg';
import CarService from '../services/CarService';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

// In this component, all cars or cars by a specific type can be rendered
// In car-admin-react, these tasks were done in separate functions
// For more comments, see car-admin-react 

function ListAllCarsComponent(props) { // props includes type from App.js route

    // Variables, declarations and updatable states

    const navigate = useNavigate();

    const currentLocation = useLocation();
    const currentPath = currentLocation.pathname; // Send as state, to optionally return here after car details

    const [carsList, setCarsList] = useState([]);

    // Sorting arrows, to change according to current sorting order
    const [regNrArrow, setRegNrArrow] = useState(faSortDown);
    const [modelBrandArrow, setModelBrandArrow] = useState(faSortDown);
    const [modelYearArrow, setModelYearArrow] = useState(faSortDown);
    const [typeArrow, setTypeArrow] = useState(faSortDown);
    const [dailySekArrow, setDailySekArrow] = useState(faSortDown);


    // Initial loadings
    useEffect(() => {

        // Functions that works for all Cars and Cars By Type
        setCarsList([]); // Empty eventual list
        const getCarsListList = () => {
            CarService.getCarsList().then((response) => {
                // If no type is specified in props, get all
                if (props.type === null) {
                    setCarsList(response.data);
                } else { // Else if specified type in props, get all cars of that type
                    response.data.map((car) => {
                        if (car.type === props.type.toString().toUpperCase()) {
                            setCarsList(prev => [...prev, car]);
                        }
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        }

        getCarsListList();


    }, [props])



    // Customized methods 

    const viewCarDetails = async (e) => {
        const eventCarId = await e.target.id; // Get id from clicked button (event target)
        // navigate(`/car/${eventCarId}`); // Note: backticks

        // Approach with navigate state, instead ofurl pathvar:
        console.log(currentPath);
        navigate(`/car`, { state: { id: eventCarId, backpath: currentPath } });
    }

    const sortTable = async (e) => {
        const currentId = await e.target.id;

        switch (currentId) {
            case "regNr":
                let sorted1;
                for (let i = 0; i < carsList.length - 1; i++) {
                    if (carsList[i].regNr.localeCompare(carsList[i + 1].regNr) == 1) {
                        sorted1 = false;
                        break;
                    } else {
                        sorted1 = true;
                    }
                }

                if (sorted1) {
                    setCarsList(carsList.sort((a, b) => b.regNr.localeCompare(a.regNr)));
                    setRegNrArrow(faSortUp);
                } else {
                    setCarsList(carsList.sort((a, b) => a.regNr.localeCompare(b.regNr)));
                    setRegNrArrow(faSortDown);
                }
                break;

            case "modelBrand":
                let sorted2;
                for (let i = 0; i < carsList.length - 1; i++) {
                    if (carsList[i].model.localeCompare(carsList[i + 1].model) == 1) {
                        sorted2 = false;
                        break;
                    } else {
                        sorted2 = true;
                    }
                }
                if (sorted2) {
                    setCarsList(carsList.sort((a, b) => b.model.localeCompare(a.model)));
                    setModelBrandArrow(faSortUp);
                } else {
                    setCarsList(carsList.sort((a, b) => a.model.localeCompare(b.model)));
                    setModelBrandArrow(faSortDown);
                }
                break;

            case "modelYear":
                let sorted3;
                for (let i = 0; i < carsList.length - 1; i++) {
                    if (carsList[i].modelYear > carsList[i + 1].modelYear) {
                        sorted3 = false;
                        break;
                    } else {
                        sorted3 = true;
                    }
                }

                if (sorted3) {
                    setCarsList(carsList.sort(function (a, b) { return b.modelYear - a.modelYear }));
                    setModelYearArrow(faSortUp);
                } else {
                    setCarsList(carsList.sort(function (a, b) { return a.modelYear - b.modelYear }));
                    setModelYearArrow(faSortDown);
                }
                break;

            case "type":
                let sorted4;
                for (let i = 0; i < carsList.length - 1; i++) {
                    if (carsList[i].type.localeCompare(carsList[i + 1].type) == 1) {
                        sorted4 = false;
                        break;
                    } else {
                        sorted4 = true;
                    }
                }
                if (sorted4) {
                    setCarsList(carsList.sort((a, b) => b.type.localeCompare(a.type)));
                    setTypeArrow(faSortUp);
                } else {
                    setCarsList(carsList.sort((a, b) => a.type.localeCompare(b.type)));
                    setTypeArrow(faSortDown);
                }
                break;

            case "dailySek":
                let sorted5;
                for (let i = 0; i < carsList.length - 1; i++) {
                    if (carsList[i].dailySek > carsList[i + 1].dailySek) {
                        sorted5 = false;
                        break;
                    } else {
                        sorted5 = true;
                    }
                }

                if (sorted5) {
                    setCarsList(carsList.sort(function (a, b) { return b.dailySek - a.dailySek }));
                    setDailySekArrow(faSortUp);
                } else {
                    setCarsList(carsList.sort(function (a, b) { return a.dailySek - b.dailySek }));
                    setDailySekArrow(faSortDown);
                }
                break;

        }

    }



    // Populate fetched data and render it (to screen)
    return (
        <div className='p-0 pt-10 sm:p-10 mb-6'>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-xs sm:text-lg'>
                        <tr>
                            <th className='carlist-car-head'>Car
                                <span id='regNr' className='ml-1 text-[8px] sm:ml-12 sm:text-xs' onClick={sortTable}>
                                    Reg. nr
                                    <FontAwesomeIcon icon={regNrArrow} className="not-clickable-part ml-1" />
                                </span>
                                <span id='modelBrand' className='ml-1 text-[8px] sm:ml-6 sm:text-xs' onClick={sortTable}>
                                    Brand
                                    <FontAwesomeIcon icon={modelBrandArrow} className="not-clickable-part ml-1" />
                                </span>
                                <span id='modelYear' className='ml-1 text-[8px] sm:ml-6 sm:text-xs' onClick={sortTable}>
                                    Year
                                    <FontAwesomeIcon icon={modelYearArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>
                                <span id='type' onClick={sortTable}>
                                    Type
                                    <FontAwesomeIcon icon={typeArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>
                                <span id='dailySek' onClick={sortTable}>
                                    Price/day
                                    <FontAwesomeIcon icon={dailySekArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {/* fill this part dynamically with car list, one car object per table row: */}
                        {carsList.map((car) => {
                            return (
                                <tr key={car.id}>
                                    <td className='min-w-[6rem] max-w-[8rem] whitespace-normal'>
                                        <div className="flex items-center space-x-6">
                                            {/* <div className="avatar">
                                                <div className="mask mask-squircle w-20 border-2 border-solid border-neutral-500">
                                                    <img src={'/images/' + car.type + '.jpg'} alt="Picture of a random bus" />
                                                </div>
                                            </div> */}
                                            {/* // Use figure instead of avatar: */}
                                            <div className='w-[30%] min-w-[50px]' style={{ zIndex: '-1', position: 'relative' }}>
                                                <figure>
                                                    <img src={'/images/' + car.type + '.jpg'} alt="Picture of the car" className='rounded-lg border border-solid border-[#d4c419]' />
                                                </figure>
                                            </div>

                                            <div>
                                                {/* don't display car id in the overview  */}
                                                <div className="font-semibold"> {car.model.toUpperCase() + " " + car.modelYear}</div>
                                                <div className="font-semibold opacity-70 -ml-2">
                                                    <span className="badge badge-ghost badge-sm"> {car.regNr} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td> {car.type} </td>
                                    <td> {car.dailySek} </td>
                                    <td>
                                        <span className='car-detail-btn' id={car.id} onClick={viewCarDetails}>
                                            <FontAwesomeIcon icon={faInfoCircle} size="2xl" className='not-clickable-part golden-color' />
                                        </span>
                                    </td>
                                </tr>
                            )
                        }
                        )}

                    </tbody>

                    {/* foot */}
                    <tfoot className='mb-[20%]'>
                        <tr>
                            <th>Car</th>
                            <th>Type</th>
                            <th>Price/day</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    );
}

export default ListAllCarsComponent;