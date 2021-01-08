import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import { Container, Row, Col, Card, Button, CardDeck, Media} from 'react-bootstrap';
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <>
          <Head><title>BTP Necrology | Некролог האבל Nachruf</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossorigin="anonymous"
          />
          </Head>
          <Header />
          <main className='py-4'>
          <Container>
            <Carousel />
            </Container>

            <Container className={styles.useful}>
            <h1 className={styles.useful_links}>Useful Links</h1>
              <Row>
                <Col>
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
                </Col>
                <Col>
                <hr/>
                <Media as="li" className={styles.media}>
              <Link href='https://btpnecrology.com/resource-categories/rabbi/'>Rabbi</Link>
            </Media>
            <hr/>
            <Media as="li" className={styles.media}>
             <Link href='https://btpnecrology.com/resource-categories/stones/'>Stones</Link>	
            </Media>
            <hr/>
                </Col>
              </Row>
            </Container>



            <Container>
              <Row>
              <Col>
              <CardDeck className={styles.carddeck}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://btpnecrology.com/wp-content/uploads/2021/01/79291590_817241632068751_1616192959374426112_o-1-500x400.jpg" />
            <Card.Body>
            <Card.Title>Sonia Kalendarov Iskhakov</Card.Title>
            <Card.Text>
            Dec 7, 2019
            </Card.Text>
          </Card.Body>
          <Button variant="primary">View Profile</Button>
          </Card>
          <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://btpnecrology.com/wp-content/uploads/2020/12/73095269_788033354989579_6766342858812162048_n-500x400.jpg" />
            <Card.Body>
            <Card.Title>Yashuo bat Emmoshalom Khaimova</Card.Title>
            <Card.Text>
            Nov 3, 2019
            </Card.Text>
          </Card.Body>
          <Button variant="primary">View Profile</Button>
          </Card>
          <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://btpnecrology.com/wp-content/uploads/2020/12/76726982_789394898186758_6826330259013500928_n-500x400.jpg" />
            <Card.Body>
            <Card.Title>Pinkhas Abayevich Abramov Kobuli samarkandi</Card.Title>
            <Card.Text>
            Nov 4, 2019
            </Card.Text>
          </Card.Body>
          <Button variant="primary">View Profile</Button>
          </Card>
          <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://btpnecrology.com/wp-content/uploads/2020/12/74643550_790143164778598_2862350644834992128_n-500x400.jpg" />
            <Card.Body>
            <Card.Title>Dora Aronov</Card.Title>
            <Card.Text>
            Nov 5, 2019
            </Card.Text>
          </Card.Body>
          <Button variant="primary">View Profile</Button>
          </Card>
          </CardDeck>
          </Col>
          </Row>
          </Container>
          </main>
          <Footer />
        </>
    )
}



