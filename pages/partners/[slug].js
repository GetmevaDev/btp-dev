import React, {useState, useEffect} from "react";
import Head from "next/head";
import Link from "next/link";
import {
    Container,
    Row,
    Col,
    Card,
    ListGroup,
} from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from "../../styles/categories.module.css"


export default function Partner({ data }){

    return (
        <section style={{
            padding: "20px 0",
        }}>
            <Container>
                <Row>
                    <Col md={4} lg={3} >
                        <LazyLoadImage
                            width="235"
                            height="235"
                            src={data.image
                                ? data.image.url
                                : "https://via.placeholder.com/500x500.png"}
                            alt="Image"
                            style={{
                                objectFit: "cover",
                                margin: '0 auto'
                            }}
                            effect="blur"
                        />
                    </Col>
                    <Col md={8} lg={9}>
                        <h1>{data.Name}</h1>
                        <h5 style={{
                            marginBottom: 20,
                        }}>{data.resource_category.Category}</h5>
                        <ul className={styles.listData}>
                            <li><span>Phone</span>{data.Phone ? <a href={`tel:${data.Phone}`}>{data.Phone}</a> : ""}</li>
                            <li><span>Email</span>{data.Email ? <a href={`mailto:${data.Email}`}>{data.Email}</a> : ""}</li>
                            <li><span>Address</span>{data.Address ? <a href={`${data.LinkAddress}`}>{data.Address}</a> : ""}</li>
                            <li><span>Website</span>{data.Website ? <a href={`${data.Website}`}>{data.Website}</a> : ""}</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </section>
    )

}



export async function getStaticPaths() {
    const { data } = await axios.get(
        `${process.env.BACKEND_URL}/partners?_limit=10000`
    );

    const paths = data.map((partners) => `/partners/${partners.slug}`);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const partners = await axios
        .get(`${process.env.BACKEND_URL}/partners?slug=${params.slug}`)
        .then(({ data }) => data)
        .catch((e) => null);

    return {
        props: {
            data: partners ? partners[0] : partners,
        },
        revalidate: 60, // In seconds
    };
}