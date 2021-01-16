import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

export default function Howitworks() {
  return (
    <section className="py-3">
      <Head>
        <title>BTP Necrology | How It Works</title>
      </Head>

      <Container fluid>
        <Row>
          <Col>
            <video controls width="100%">
              <source
                src="https://btpnecrology.com/wp-content/uploads/2020/07/Placeholder-Video-real-video-will-load-here.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>How It Works</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
