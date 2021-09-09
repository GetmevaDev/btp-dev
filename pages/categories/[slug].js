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



export default function ListUseful({ partners }){
    return(
      <section className="py-5">
          <Head>
              <title>{`BTP Necrology | ${partners.Category}`}</title>
          </Head>
          <Container>
              <div className={styles.blockImage}>
                  <h1>{partners.Category}</h1>
              </div>
              <ul style={{
                  marginTop: 20
              }}>
                  {
                      partners.partners.map(item => (
                          <li key={item.id} className={'row col-12'} style={{
                              padding: 15,
                              borderBottom: '1px solid #ddd',
                          }}>

                                  <LazyLoadImage
                                      width="80"
                                      height="80"
                                      src={item.image
                                          ? item.image.url
                                          : "https://via.placeholder.com/500x400.png"}
                                      alt="Image"
                                      style={{
                                          objectFit: "cover",
                                          borderRadius: '50%'
                                      }}
                                      effect="blur"
                                  />
                                  <div className="row flex-column justify-content-center ml-2">
                                      <h3 className={styles.namePartners}>
                                          <Link href={`/partners/${item.slug}`}>
                                              {item.Name}
                                          </Link>
                                      </h3>
                                      <p style={{
                                          marginBottom: 0
                                      }}>
                                          {partners.Category}
                                      </p>
                                  </div>


                          </li>
                      ))
                  }

              </ul>

          </Container>




      </section>
    )

}


export async function getStaticPaths() {
    const { data } = await axios.get(
        `${process.env.BACKEND_URL}/resource-categories?_limit=10000`
    );

    const paths = data.map((categories) => `/categories/${categories.slug}`);

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    const partners = await axios
        .get(`${process.env.BACKEND_URL}/resource-categories?slug=${params.slug}`)
        .then(({ data }) => data)
        .catch((e) => null);

    return {
        props: {
            partners: partners ? partners[0] : partners,
        },
        revalidate: 60, // In seconds
    };
}