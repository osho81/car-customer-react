import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CarService from '../services/CarService';
import OrderService from '../services/OrderService';
import { useKeycloak } from '@react-keycloak/web';

function OrderCarComponent(props) {

    const {keycloak, initialized} = useKeycloak() 

    const navigate = useNavigate();

    const { state } = useLocation();
    const { id } = state;

    const [selectedCar, setSelectedCar] = useState("");

    // Selectable fields of order (rest are fixed at backend or is default)
    // const [email, setEmail] = useState(""); // Email is unused 
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    useEffect(() => {

        // Get car that is about to be ordered
        const getCarById = () => { // Use extracted id
            CarService.getCarById(id, keycloak.token).then((response) => {
                setSelectedCar(response.data);


            })
        }
        getCarById();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])


    // Methods handling inputs
    // const handleEmail = (e) => { setEmail(e.target.value); }

    const handleStartDate = (e) => {
        const start = e.target.value;
        let startString = start.toString();
        setStartDate(startString);
        // Or simply: 
        // setStartDate(e.target.value);
    }

    const handleEndDate = (e) => {
        const end = e.target.value;
        let endString = end.toString();
        setEndDate(endString);
        // Or simply: 
        // setEndDate(e.target.value);
    }

    const submitCarOrder = (e) => {


        // Backend order fields: 
        // orderNr - null/backend; canceled - false; orderOrUpdateTime - null; 
        // firstRentalDay &  lastRentalDay - use input from this component
        // customerId - hard coded untill keycloak token is enabled for this
        // carId - use extracted carid in this component
        // price - 0; numberofDays - null; priceInEuro - null (these fields are calculated at backend) 

        // Fix rental date logic
        let startDateAsDateType = new Date(startDate); // Make dates comparable & reassignable
        let endDateAsDateType = new Date(endDate);
        let today = new Date();
        today.setDate(today.getDate());

        // Making sure start day is maximum same date as end day:
        if (startDateAsDateType > endDateAsDateType) {
            // startDateAsDateType = endDate;
            endDateAsDateType = startDateAsDateType;
        }
        // If start has passed (or no start date is chosen), make today start day:
        if (startDateAsDateType < today || startDate == "") {
            startDateAsDateType = today;
        }
        // If end has passed make today start & end day:
        if (endDateAsDateType < today || endDate == "") {
            // startDateAsDateType = today;
            endDateAsDateType = startDateAsDateType;
        }

        // Send in all fields (don't use this approach)
        // let carOrder = { orderNr: null, canceled: false, orderOrUpdateTime: null, firstRentalDate: startDate, lastRentalDate: endDate, 
        //     customerId: 1, carId: id, price: 0, numberOfDays: null, priceInEuro: null };

        // Send in wihtout null values; java backend interpretes is as null
        let carOrder = { firstRentalDay: startDateAsDateType, lastRentalDay: endDateAsDateType, customerId: 1, carId: id, price: 0 };


        OrderService.orderCar(carOrder, keycloak.token).then((response) => {
            navigate('/allcars', { replace: true }); // Go to car list overview
        }).catch(error => {
            console.log(error)
        });

    }


    return (
        <div className='flex flex-col justify-center items-center p-10'>


            <h2 className='justify-center flex flex-row font-semibold'>
                {String(selectedCar.model).toUpperCase() + " " + selectedCar.modelYear}; Reg. Nr:
                <div className="font-semibold opacity-70">
                    <span className="badge badge-ghost badge-lg font-bold"> {selectedCar.regNr} </span>
                </div>
            </h2>

            <div className="form-control w-full max-w-xs mt-6 space-y-2">
                {/* <label className="label">
                    <span className="label-text text-sm font-semibold">Email address: </span>
                </label>
                <input type="text" value={email} placeholder="Enter email here" onChange={handleEmail} className="input input-sm input-bordered w-full max-w-xs" /> */}

                {/* Date picker (type='date'); value displayes current & default value */}
                <label className="label">
                    <span className="label-text text-sm font-semibold">Pickup date: </span>
                </label>
                <input type="date" value={startDate} onChange={handleStartDate} className="input input-sm input-bordered w-full max-w-xs" />

                <label className="label">
                    <span className="label-text text-sm font-semibold">Return date: </span>
                </label>
                <input type="date" value={endDate} onChange={handleEndDate} className="input input-sm input-bordered w-full max-w-xs" />

            </div>

            <button className="btn btn-outline mt-4" onClick={submitCarOrder}>Rent</button>

        </div>
    );
}

export default OrderCarComponent;