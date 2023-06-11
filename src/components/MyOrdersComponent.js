import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import CarService from '../services/CarService';


// Order object fields from backend (X = don't display in my orders table)
// id X
// orderNr  
// canceled X
// orderOrUpdateTime X
// firstRentalDay
// lastRentalDay
// customerId  X
// carId 
// price
// numberofDays X 
// priceInEuro X

function MyOrdersComponent(props) {

    // Hardcode (logged in) customer id, until implemented keycloak token
    const [customerId, setCutomerId] = useState(1);

    const [myOrders, setMyOrders] = useState([]); // initialize with empty array

    // Sorting related variables
    const [orderNrArrow, setOrderNrArrow] = useState(faSortDown);
    const [firstRentalDayArrow, setFirstRentalDayArrow] = useState(faSortDown);
    const [lastRentalDayArrow, setLastRentalDayArrow] = useState(faSortDown);
    const [carIdArrow, setCarIdArrow] = useState(faSortDown);
    const [priceArrow, setPriceArrow] = useState(faSortDown);


    useEffect(() => {

        const getMyOrders = () => {
            let customer = { id: customerId };

            CarService.getMyOrders(customer).then((response) => {
                console.log(response.data);
                setMyOrders(response.data);
            }).catch(error => {
                console.log(error);
            })
        }

        getMyOrders();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    const viewOrderDetails = (e) => {
        console.log("Let order details open in an alert/modal");
    }


    const sortTable = async (e) => {
        const currentId = await e.target.id;

        switch (currentId) {
            case "orderNr":
                let sorted1;
                for (let i = 0; i < myOrders.length - 1; i++) {
                    if (myOrders[i].orderNr.localeCompare(myOrders[i + 1].orderNr) == 1) {
                        sorted1 = false;
                        break;
                    } else {
                        sorted1 = true;
                    }
                }

                if (sorted1) {
                    setMyOrders(myOrders.sort((a, b) => b.orderNr.localeCompare(a.orderNr)));
                    setOrderNrArrow(faSortUp);
                } else {
                    setMyOrders(myOrders.sort((a, b) => a.orderNr.localeCompare(b.orderNr)));
                    setOrderNrArrow(faSortDown);
                }
                break;

            case "firstRentalDay":
                let sorted2;
                for (let i = 0; i < myOrders.length - 1; i++) {

                    let startDate = new Date(myOrders[i].firstRentalDay);
                    let nextStartDate = new Date(myOrders[i + 1].firstRentalDay);

                    if (startDate > nextStartDate) {
                        sorted2 = false;
                        break;
                    } else {
                        sorted2 = true;
                    }
                }

                if (sorted2) {
                    setMyOrders(myOrders.sort(function (a, b) {
                        let startDateA = new Date(a.firstRentalDay);
                        let startDateB = new Date(b.firstRentalDay);

                        return startDateB - startDateA;
                    }));
                    setFirstRentalDayArrow(faSortUp);
                } else {
                    setMyOrders(myOrders.sort(function (a, b) {
                        let startDateB = new Date(b.firstRentalDay);
                        let startDateA = new Date(a.firstRentalDay);

                        return startDateA - startDateB;
                    }));
                    setFirstRentalDayArrow(faSortDown);
                }
                break;

            case "lastRentalDay":
                let sorted3;
                for (let i = 0; i < myOrders.length - 1; i++) {

                    // Convert to comparable dates
                    let endDate = new Date(myOrders[i].lastRentalDay);
                    let nextEndDate = new Date(myOrders[i + 1].lastRentalDay);

                    if (endDate > nextEndDate) {
                        sorted3 = false;
                        break;
                    } else {
                        sorted3 = true;
                    }
                }

                if (sorted3) {
                    setMyOrders(myOrders.sort(function (a, b) {

                        // Convert to comparable dates
                        let endDateA = new Date(a.lastRentalDay);
                        let endDateB = new Date(b.lastRentalDay);

                        return endDateB - endDateA;
                    }));
                    setLastRentalDayArrow(faSortUp);
                } else {
                    setMyOrders(myOrders.sort(function (a, b) {
                        let endDateB = new Date(b.lastRentalDay);
                        let endDateA = new Date(a.lastRentalDay);

                        return endDateA - endDateB;
                    }));
                    setLastRentalDayArrow(faSortDown);
                }
                break;


            case "carId":
                let sorted4;
                for (let i = 0; i < myOrders.length - 1; i++) {
                    if (myOrders[i].carId > myOrders[i + 1].carId) {
                        sorted4 = false;
                        break;
                    } else {
                        sorted4 = true;
                    }
                }

                if (sorted4) {
                    setMyOrders(myOrders.sort(function (a, b) { return b.carId - a.carId }));
                    setCarIdArrow(faSortUp);
                } else {
                    setMyOrders(myOrders.sort(function (a, b) { return a.carId - b.carId }));
                    setCarIdArrow(faSortDown);
                }
                break;

            case "price":
                let sorted5;
                for (let i = 0; i < myOrders.length - 1; i++) {
                    if (myOrders[i].price > myOrders[i + 1].price) {
                        sorted5 = false;
                        break;
                    } else {
                        sorted5 = true;
                    }
                }

                if (sorted5) {
                    setMyOrders(myOrders.sort(function (a, b) { return b.price - a.price }));
                    setPriceArrow(faSortUp);
                } else {
                    setMyOrders(myOrders.sort(function (a, b) { return a.price - b.price }));
                    setPriceArrow(faSortDown);
                }
                break;

        }

    }

    return (
        <div className='p-0 pt-10 sm:p-5'>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-xs sm:text-md'>
                        <tr>
                            <th>
                                <span id='orderNr' onClick={sortTable}>
                                    Order nr
                                    <FontAwesomeIcon icon={orderNrArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>
                                <span id='firstRentalDay' onClick={sortTable}>
                                    Pickup
                                    <FontAwesomeIcon icon={firstRentalDayArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>
                                <span id='lastRentalDay' onClick={sortTable}>
                                    Return
                                    <FontAwesomeIcon icon={lastRentalDayArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>
                                <span id='carId' onClick={sortTable}>
                                    Car ID
                                    <FontAwesomeIcon icon={lastRentalDayArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>
                                <span id='price' onClick={sortTable}>
                                    Price
                                    <FontAwesomeIcon icon={lastRentalDayArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody className='text-xs'>
                        {/* fill this part dynamically with car list, one car object per table row: */}
                        {myOrders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <td> {order.orderNr} </td>
                                    <td> {order.firstRentalDay} </td>
                                    <td> {order.lastRentalDay} </td>
                                    <td> {order.carId} </td>
                                    <td> {order.price} </td>
                                    <td>
                                        <span className='order-detail-btn' id={order.id} onClick={viewOrderDetails}>
                                            <FontAwesomeIcon icon={faInfoCircle} size="2xl" className='not-clickable-part golden-color' />
                                        </span>
                                    </td>
                                </tr>
                            )
                        }
                        )}

                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Order nr</th>
                            <th>Pickup</th>
                            <th>Return</th>
                            <th>Car ID</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </div>
    );
}

export default MyOrdersComponent;