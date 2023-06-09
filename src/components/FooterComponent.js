import React from 'react';
import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTruckPickup } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function FooterComponent(props) {

    return (


        <footer className="footer p-5 bg-neutral text-neutral-content fixed bottom-0 text-xs">
            <div className='ml-10'>
                <FontAwesomeIcon icon={faTruckPickup} bounce style={{ color: "#d4c419", }} size="2xl" />
                <p>Car Rentals Inc </p>
            </div>
            <div>
                <span className="footer-title text-xs">Contact & Social</span>
                <div className="grid grid-flow-col gap-8 ml-5">
                    <a href="mailto:support@support.com"><FontAwesomeIcon icon={faEnvelope} size="2xl" /></a>
                    <a href="https://github.com/osho81" className="text-muted" target={'_blank'} rel="noreferrer">
                        <FontAwesomeIcon icon={faGithub} size="2xl" />
                    </a>
                </div>
            </div>
        </footer>

    );
}

export default FooterComponent;