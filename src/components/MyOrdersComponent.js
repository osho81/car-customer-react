import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPenToSquare, faTrash, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import OrderService from '../services/OrderService';
import { useKeycloak } from '@react-keycloak/web';


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

    const { keycloak, initialized } = useKeycloak()

    const navigate = useNavigate();

    // const [customerId, setCustomerId] = useState(); // Skip customer id
    const [customerEmail, setCustomerEmail] = useState(""); // use keycloak email

    const [myOrders, setMyOrders] = useState([]); // displayize with empty array

    // Sorting related variables
    const [orderNrArrow, setOrderNrArrow] = useState(faSortDown);
    const [firstRentalDayArrow, setFirstRentalDayArrow] = useState(faSortDown);
    const [lastRentalDayArrow, setLastRentalDayArrow] = useState(faSortDown);
    const [carIdArrow, setCarIdArrow] = useState(faSortDown);
    const [priceArrow, setPriceArrow] = useState(faSortDown);

    // Set selected order, to see details for
    const [selectedOrder, setSelectedOrder] = useState("");


    // Variables used for edit order form dialog (not necessary, but easier to follow)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Checkbox for cancel/UN-cancel
    const [cancelChoice, setCancelChoice] = useState(); // boolean for cancel choice 
    const [checkChoice, setCheckChoice] = useState(false); // boolean for current check mark, start empty/unchecked


    // Dates to display as placeholder for date picker
    const [displayStartDate, setDisplayStartDate] = useState("");
    const [displayEndDate, setDisplayEndDate] = useState("");

    // const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        if (initialized) {

            // setCustomerEmail(keycloak.tokenParsed.email); // Not needed
            const getMyOrders = () => {
                let customer = { email: (keycloak.tokenParsed.email) }; // Customer object body with only email field

                OrderService.getMyOrders(customer, keycloak.token).then((response) => {
                    // console.log(response.data);
                    setMyOrders(response.data);
                    // setIsLoading(false);
                }).catch(error => {
                    console.log(error);
                })
            }

            getMyOrders();

        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myOrders]) // If myOrders state changed, triggers useEffect 


    const viewOrderDetails = (e) => {
        const selectedOrderId = e.target.id; // Get id of clicked order row

        // // Reload updated myOrders
        // let customer = { id: customerId, email: customerEmail };
        let customer = { email: keycloak.tokenParsed.email }; // Object with only email field 
        OrderService.getMyOrders(customer, keycloak.token).then((response) => {
            response.data.map((order) => {
                // Match order id with selectedOrderId
                if (order.id === Number(selectedOrderId)) {
                    setSelectedOrder(order); // set backend fields to frontend selectedOrder 


                    //-------- EURO PRICE PART -------//
                    // Avoid using external exchange api key, if euro price already fetched
                    if (order.priceInEuro === 0) {
                        // Get latest price in euro and update order euro price here in frontend
                        // The java api endpoint deals with updating price in euro in backend/db
                        // Thus, this is temporary change in frontend, to not wait for backend update
                        OrderService.getPriceInEuro(order, keycloak.token).then((response) => {
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
            // Re-set the list of orders (optional step in this case):
            // setMyOrders(response.data);
        }).catch(error => {
            console.log(error);
        })

        // Open the dialog/modal using ID.showModal()
        window.orderDialog.showModal();
    }


    // In this case, it is rather cancel, than delete
    const cancelOrder = (e) => {
        const selectedOrderId = e.target.id; // Get id of clicked order row

        myOrders.map((order) => {
            if (order.id === Number(selectedOrderId)) {
                OrderService.cancelOrder(order, keycloak.token).then((response) => {
                    console.log("deleted order: ", response.data);
                }).catch(error => {
                    console.log(error);
                })
            }
        })

        // window.location.reload(); // Avoid reloading page

        // Update myOrder state, to reload useEffect
        let customer = { email: (keycloak.tokenParsed.email) }; // Customer object body with only email field
        OrderService.getMyOrders(customer, keycloak.token).then((response) => {
            setMyOrders(response.data);
        }).catch(error => {
            console.log(error);
        })

    }

    const editOrderForm = (e) => {
        const selectedOrderId = e.target.id;

        myOrders.map((order) => {
            if (order.id === Number(selectedOrderId)) {
                setSelectedOrder(order);
                setDisplayStartDate(order.firstRentalDay); // Date values to display
                setDisplayEndDate(order.lastRentalDay);
                // setCheckChoice(false); 
                setCancelChoice(Boolean(order.canceled));
            }
        })

        window.editOrderDialog.showModal();

    }

    const handleCheck = (e) => {
        // Set uncancel if is canceled, and vice versa
        if (selectedOrder.canceled && e.target.checked === true) {
            setCancelChoice(false); // Uncancel, if is canceled (true) & cancel box is checked
            setCheckChoice(true); // show checkbox as checked
        }
        if (!selectedOrder.canceled && e.target.checked === true) {
            setCancelChoice(true); //Cancel, if is NOT canceled (false) & cancel box is checked
            setCheckChoice(true); // show checkbox as checked
        }
        if (e.target.checked === false) {
            setCheckChoice(false); // show checkbox as UNchecked/empty
        }
    }


    const handleStartDate = (e) => {
        const start = e.target.value;
        let startString = start.toString();
        setStartDate(startString); // Date value to actually edit with

        // Display in date picker
        setDisplayStartDate(e.target.value);
    }

    const handleEndDate = (e) => {
        const end = e.target.value;
        let endString = end.toString();
        setEndDate(endString); // Date value to actually edit with

        // Display in date picker
        setDisplayEndDate(e.target.value);
    }

    const submitEditOrder = (e) => {
        const selectedOrderId = e.target.id;

        myOrders.map((order) => {
            if (order.id === Number(selectedOrderId)) {
                console.log("I found order", order);

                // When order is found, fix logic then send to update order backend endpoint

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

                // If canceled is unchanged, keep same value, else use new value
                // Logic of this is set in handleCheck function


                // Send in wihtout null values; java backend interpretes is as null
                // Since this is an update, also send order id
                // For UNchangable fields, send order current fields (carId etc), or null (price etc))
                let orderToUpdate = {
                    id: selectedOrderId, canceled: cancelChoice,
                    firstRentalDay: startDateAsDateType, lastRentalDay: endDateAsDateType, carId: order.carId
                };

                console.log(selectedOrder);


                OrderService.updateOrder(orderToUpdate, keycloak.token).then((response) => {
                    console.log("Updated order: ", response.data);
                }).catch(error => {
                    console.log(error);
                })

            }
        })

        setCheckChoice(false); // Check should be empty again (since uncancel/cancel string changes)

        // window.location.reload(); // Avoid reloading page

        // Update myOrder state, to reload useEffect
        let customer = { email: (keycloak.tokenParsed.email) }; // Customer object body with only email field
        OrderService.getMyOrders(customer, keycloak.token).then((response) => {
            setMyOrders(response.data);
        }).catch(error => {
            console.log(error);
        })
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
                                    <FontAwesomeIcon icon={carIdArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>
                                <span id='price' onClick={sortTable}>
                                    Price
                                    <FontAwesomeIcon icon={priceArrow} className="not-clickable-part ml-1" />
                                </span>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody className='text-xs'>
                        {/* fill this part dynamically with car list, one car object per table row: */}
                        {myOrders.map((order) => {
                            return (
                                // If canceled order, line-through order row: 
                                <tr key={order.id} className={order.canceled === true ? "line-through" : ""}>
                                    <td> {order.orderNr} </td>
                                    <td> {order.firstRentalDay} </td>
                                    <td> {order.lastRentalDay} </td>
                                    <td> {order.carId} </td>
                                    <td> {order.price} </td>
                                    <td>
                                        <span className='order-detail-btn mr-4' id={order.id} onClick={viewOrderDetails}>
                                            <FontAwesomeIcon icon={faInfoCircle} size="xl" className='not-clickable-part golden-color' />
                                        </span>
                                        <span className='order-update-btn mr-4' id={order.id} onClick={editOrderForm}>
                                            < FontAwesomeIcon icon={faPenToSquare} size="xl" className='not-clickable-part edit-color' />
                                        </span>
                                        {/* Show cancel button only if not canceled yet: */}
                                        <span className={order.canceled === true ? "order-delete-btn invisible" : "order-delete-btn visible"}
                                            id={order.id} onClick={cancelOrder}>
                                            < FontAwesomeIcon icon={faTrash} size="xl" className='not-clickable-part warning-color' />
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
                                    <td>Pickup</td>
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



            {/* Dialog form for selected order to update order: */}
            <dialog id="editOrderDialog" className="modal modal-bottom sm:modal-middle justify-center">
                <form method="dialog" className="modal-box font-semibold">

                    <h2 className="justify-center">Edit order {selectedOrder.orderNr}</h2>

                    {/* Render all details from slected car, into a form inputsY: */}
                    <div className="form-control w-full max-w-xs mt-6 space-y-2">

                        <input disabled type="text" placeholder={"Customer id: \t" + selectedOrder.customerId} className="input input-sm input-bordered w-full max-w-xs font-bold" />
                        <input disabled type="text" placeholder={"Car id: \t\t\t" + selectedOrder.carId} className="input input-sm input-bordered w-full max-w-xs font-bold" />

                        {/* Keep cancel as is or cancel/UN-cancel: */}
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">{selectedOrder.canceled === true ? "Uncancel? " : "Cancel? "}</span>
                                <input type="checkbox" 
                                    checked={checkChoice}
                                    // checked={false}
                                    // checked={cancelChoice}
                                    // checked="checked"
                                    // value={checkChoice}
                                    className="checkbox checkbox-warning" onChange={handleCheck} />
                            </label>
                        </div>

                        {/* Date picker (type='date'); value displayes current & default value */}
                        <label className="label">
                            <span className="label-text text-sm font-semibold">Pickup date: </span>
                        </label>
                        <input type="date" value={displayStartDate} onChange={handleStartDate} className="input input-sm input-bordered w-full max-w-xs" />

                        <label className="label">
                            <span className="label-text text-sm font-semibold">Return date: </span>
                        </label>
                        <input type="date" value={displayEndDate} onChange={handleEndDate} className="input input-sm input-bordered w-full max-w-xs" />

                    </div>

                    <div className="flex justify-center items-center p-5">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn mr-4">Cancel</button>
                        <button id={selectedOrder.id} className="btn btn-outline" onClick={submitEditOrder}>Edit</button>
                    </div>
                </form>
            </dialog>


        </div>

    );
}

export default MyOrdersComponent;