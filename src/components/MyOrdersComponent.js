import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import OrderService from '../services/OrderService';


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
// numberOfDays X 
// priceInEuro X

function MyOrdersComponent(props) {

    const navigate = useNavigate();

    // Hardcode (logged in) customer id, until implemented keycloak token
    const [customerId, setCutomerId] = useState(1);

    const [myOrders, setMyOrders] = useState([]); // initialize with empty array

    // Sorting related variables
    const [orderNrArrow, setOrderNrArrow] = useState(faSortDown);
    const [firstRentalDayArrow, setFirstRentalDayArrow] = useState(faSortDown);
    const [lastRentalDayArrow, setLastRentalDayArrow] = useState(faSortDown);
    const [carIdArrow, setCarIdArrow] = useState(faSortDown);
    const [priceArrow, setPriceArrow] = useState(faSortDown);

    // Set selected order, to see details for
    const [selectedOrder, setSelectedOrder] = useState("");


    useEffect(() => {
        console.log("I am in useEffect");

        const getMyOrders = () => {
            let customer = { id: customerId }; // Customer object body with id 

            OrderService.getMyOrders(customer).then((response) => {
                // console.log(response.data);
                setMyOrders(response.data);
            }).catch(error => {
                console.log(error);
            })
        }

        getMyOrders();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])


    const viewOrderDetails = (e) => {
        const selectedOrderId = e.target.id; // Get id of clicked order row

        // // Reload updated myOrders
        let customer = { id: customerId };
        OrderService.getMyOrders(customer).then((response) => {
            response.data.map((order) => {
                // Match order id with selectedOrderId
                if (order.id === Number(selectedOrderId)) {
                    setSelectedOrder(order); // set backend fields to frontend selectedOrder 

                    // Avoid using external exchange api key, if europ price already fetched
                    if (order.priceInEuro === 0) { 
                        // Get latest price in euro and update order euro price here in frontend
                        // The java api endpoint deals with updating price in euro in backend/db
                        // Thus, this is temporary change in frontend, to not wait for backend update
                        OrderService.getPriceInEuro(order).then((response) => {
                            setSelectedOrder(order => ({
                                ...order, // Set the whole body and...
                                ... { priceInEuro: response.data.order.priceInEuro } // ... update field
                            })); 
                            // setSelectedOrder(order, { priceInEuro: response.data.order.priceInEuro });
                        }).catch(error => {
                            console.log(error);
                        })
                    }
                }
            })

            setMyOrders(response.data);
        }).catch(error => {
            console.log(error);
        })

        // Open the dialog/modal using ID.showModal()
        window.orderDialog.showModal();


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
                <table className="table table-zebra">
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

            {/* Dialog box for selected order to see details for: */}
            <dialog id="orderDialog" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">

                    <h2 className="justify-center">Order {selectedOrder.orderNr} details</h2>

                    {/* Render all details from slected car, into a two-column table BODY: */}
                    <div className="overflow-x-auto text-left">
                        <table className='table table-zebra text-xs'>
                            <tbody id='order-details-table'>
                                <tr>
                                    <td>Order Id </td>
                                    <td> {selectedOrder.id} </td>
                                </tr>
                                <tr >
                                    <td>Order number </td>
                                    <td> {selectedOrder.orderNr} </td>
                                </tr>
                                <tr>
                                    <td>Canceled</td>
                                    <td> {selectedOrder.canceled == true ? "Yes" : "No"} </td>
                                </tr>
                                <tr>
                                    <td>Order/update time</td>
                                    <td> {selectedOrder.orderOrUpdateTime} </td>
                                </tr>
                                <tr>
                                    <td>Start</td>
                                    <td> {selectedOrder.firstRentalDay} </td>
                                </tr>
                                <tr>
                                    <td>Return</td>
                                    <td> {selectedOrder.lastRentalDay} </td>
                                </tr>
                                <tr>
                                    <td>Number of days</td>
                                    <td> {selectedOrder.numberOfDays} </td>
                                </tr>
                                <tr>
                                    <td>Customer ID</td>
                                    <td> {selectedOrder.customerId} </td>
                                </tr>
                                <tr>
                                    <td>Car ID</td>
                                    <td> {selectedOrder.carId} </td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td> {selectedOrder.price} </td>
                                </tr>
                                <tr>
                                    <td>Price in Euro</td>
                                    <td> {selectedOrder.priceInEuro} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}

export default MyOrdersComponent;