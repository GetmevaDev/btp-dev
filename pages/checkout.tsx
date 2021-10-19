import {loadStripe} from "@stripe/stripe-js/pure";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { parseCookies } from "nookies";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function Checkout(){

    const { jwt } = parseCookies();
    


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        };

        const idProfile = JSON.parse(localStorage.getItem('id'));


        // DELETE request using axios inside useEffect React hook
        axios.delete(`${process.env.BACKEND_URL}/profiles/${idProfile}`, config)
            .then((res) => console.log('Delete successful'))
            .catch(e => console.log(e.response.data));
// empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    
    return(
        <div>
            <Head>
                <meta http-equiv="Refresh" content={`4; URL=https://btp-dev-psi.vercel.app/account/profile-edit/new`}/>
            </Head>
            <h1>Payment failed</h1>
        </div>
    )
}