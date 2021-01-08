import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Row, Col, Media } from 'react-bootstrap'
import styles from '../styles/Resources.module.css'

export default function Resources() {
    return (
        <>
          <Head><title>BTP Necrology | Resources</title></Head>
          <Header />
          <main className='py-4'>
          <Container fluid>
            <Row>
              <Col md={{ span: 3, offset: 1 }}>
                <h1>Resources</h1>	
              </Col>
             </Row>
       <Row>
          <Col md={{ span: 3, offset: 1 }} xs lg="10">
          <ul>
            <hr/>
            <Media as="li" className={styles.media}>
              <Link href='https://btpnecrology.com/resource-categories/catering/'>Catering</Link>
            </Media>
            <hr/>
            <Media as="li" className={styles.media}>
              <Link href='https://btpnecrology.com/resource-categories/doctors/'>Doctors</Link>
            </Media>
            <hr/>
            <Media as="li" className={styles.media}>
              <Link href='https://btpnecrology.com/resource-categories/funeral-homes/'>Funeral Homes</Link>
            </Media>
            <hr/>
            <Media as="li" className={styles.media}>
              <Link href='https://btpnecrology.com/resource-categories/rabbi/'>Rabbi</Link>
            </Media>
            <hr/>
            <Media as="li" className={styles.media}>
             <Link href='https://btpnecrology.com/resource-categories/stones/'>Stones</Link>	
            </Media>
            <hr/>
          </ul>
          </Col>		
        </Row>
          </Container>
          </main>
          <Footer />
        </>
    )
}