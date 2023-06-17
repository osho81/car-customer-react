import React, { useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useKeycloak } from '@react-keycloak/web';

function AdminInfoComponent(props) {

    const { keycloak, initialized } = useKeycloak()

    useEffect(() => { // Get customer with aquired

        if (initialized) {
            // During dev, to see keycloak details
            const updateKeycl = () => {
                keycloak.updateToken(30).then(function () {
                    console.log(keycloak);
                    console.log(keycloak.realmAccess.roles.includes("user") ? "yes" : "no");
                }).catch(function () {
                    console.log('Failed to refresh token');
                });
            }

            const loadKeycl = () => {
                keycloak.loadUserProfile()
                    .then(function (profile) {
                        // console.log(JSON.stringify(profile, null, "  "));
                        console.log(typeof profile);
                    }).catch(function () {
                        console.log('Failed to load user profile');
                    });
            }
            loadKeycl();
            updateKeycl();
        }


        // eslint-disable-line react-hooks/exhaustive-deps
    }, [keycloak]) // rerenders component/reloads data if keycloak changes



    return (
        <div className="card-body p-10">
            <h2 className="card-title sm:justify-center">Customer details</h2>

            {/* Render all details from slected car, into a two-column table BODY: */}
            <div className="overflow-x-auto sm:ml-[25%]">
                <table className='table'>
                    <tbody>
                        <tr>
                            <td>User name</td>
                            <td>{keycloak.tokenParsed.preferred_username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{keycloak.tokenParsed.email}</td>
                        </tr>
                        <tr>
                            <td>First name</td>
                            <td>{keycloak.tokenParsed.given_name}</td>
                        </tr>
                        <tr>
                            <td>Last name</td>
                            <td>{keycloak.tokenParsed.family_name}</td>
                        </tr>
                    </tbody>
                </table>

                <br></br>
            </div>
                <h2 className="sm:justify-center">Current keycloak token</h2><br></br>

                <textarea className='resize-y rounded-md select-all sm:w-[50%] sm:h-[100px] sm:ml-[25%]'>
                    {keycloak.token}
                </textarea>

        </div>


    );
}

export default AdminInfoComponent;
