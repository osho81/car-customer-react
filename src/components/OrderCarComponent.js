import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function OrderCarComponent(props) {

    const { state } = useLocation();
    const { id } = state;


    return (
        <div>
            <p>
                Order car form, for car with id {id}
            </p>
        </div>
    );
}

export default OrderCarComponent;