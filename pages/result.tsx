import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'
import Head from "next/head";


export default function Result(){
    const [slug, setSlug] = useState(null)

    // const router = useRouter();
    //
    // const { data, error } = useSWR(
    //     router.query.session_id
    //       ? `/api/checkout/${router.query.session_id}`
    //         : null,
    //     (url) => fetch(url).then(res => res.json())
    // )
    useEffect(()=>{

        const slug = JSON.parse(localStorage.getItem('slug'));
        setSlug(slug)

    },[])

    console.log(slug)

    return(
        <div>
            <Head>
                <meta http-equiv="Refresh" content={`0; URL=https://btp-dev-psi.vercel.app/profiles/${slug}`}/>
            </Head>
            <h1>Payment success</h1>

        </div>
    )

}