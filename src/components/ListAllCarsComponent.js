import React, { useEffect } from 'react';
// import BusImg from '/public/images/bus.jpg';
import CarService from '../services/CarService';

function ListAllCarsComponent(props) {


    useEffect(() => {

        const getAllCarsList = () => {
            CarService.getAllCars().then((response) => {
                console.log(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
        console.log("I am in useEffect");

        getAllCarsList();


    }, [])


    return (
        <div className='p-10'>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>


                    <tbody>
                        {/* fill this part dynamically with car list  */}

                        <tr>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 border-2 border-solid border-neutral-500">
                                            <img src='/images/sedan.jpg' alt="Picture of a random bus" />

                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Car name</div>
                                        <div className="text-sm opacity-70">type</div>
                                        <div className="text-sm opacity-70">reg. nr</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                            </td>
                            <td>Purple</td>
                            <th>
                                <button className="btn btn-ghost btn-xs">details</button>
                            </th>
                        </tr>


                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            {/* <th></th> */}
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    );
}

export default ListAllCarsComponent;