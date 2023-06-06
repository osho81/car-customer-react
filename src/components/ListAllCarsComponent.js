import React, { useEffect, useState } from 'react';
// import BusImg from '/public/images/bus.jpg';
import CarService from '../services/CarService';

// In this component, all cars or cars by a specific type can be rendered
// In car-admin-react, these tasks were done in separate functions


function ListAllCarsComponent(props) {


    const [carsList, setCarsList] = useState([]);

    useEffect(() => {

        // Function that functions for All Cars only
        // const getCarsListList = () => {
        //     CarService.getCarsList().then((response) => {
        //         // console.log(response.data);
        //         setCarsList(response.data);
        //     }).catch(error => {
        //         console.log(error);
        //     })
        // }

        // Functions that works for all Cars and Cars By Type
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


    return (
        <div className='p-10'>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Car</th>
                            <th>Type</th>
                            <th>Price/day</th>
                            <th></th>
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
                                            <div className='w-[30%] min-w-[50px]'>
                                                <figure>
                                                    <img src={'/images/' + car.type + '.jpg'} alt="Picture of a random bus" className='rounded-lg border border-solid border-[#d4c419]' />
                                                </figure>
                                            </div>

                                            <div>
                                                {/* don't display car id in the overview  */}
                                                <div className="font-semibold"> {car.model.toUpperCase() + " " + car.modelYear}</div>
                                                <div className="font-semibold opacity-70">
                                                    <span className="badge badge-ghost badge-sm"> {car.regNr} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td> {car.type} </td>
                                    <td> {car.dailySek} </td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>
                            )
                        }
                        )}

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Car</th>
                            <th>Type</th>
                            <th>Price/day</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    );
}

export default ListAllCarsComponent;