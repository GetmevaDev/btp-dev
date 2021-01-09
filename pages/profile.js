import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Profile.module.css";

export default function Profile() {
  return (
    <section class="py-5">
      <Head>
        <title>BTP Necrology | Sonia Kalendarov Iskhakov</title>
      </Head>
      <Container>
        <Row>
          <Col mr={{ span: 7, offset: 3 }}>
            <h5 className={styles.profile_h5}>In Loving Memory Of</h5>
            <h1 className={styles.profile_h1}>Sonia Kalendarov Iskhakov</h1>
            <h2 className={styles.profile_h2}>Соня Календаров Исхакова</h2>

            <div className={styles.profile_image}>
              <img
                width="100%"
                height="100%"
                src="https://btpnecrology.com/wp-content/uploads/2021/01/79291590_817241632068751_1616192959374426112_o-1-640x640.jpg"
                alt="img"
              />
            </div>
            <div className={styles.profile_dates}>- Dec 7, 2019</div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 13, offset: 0 }}>
            <div className={styles.profile_description}>
              It is with a heavy heart and deep sorrow that I am writing this,
              but I regret to inform you of the passing of our beloved
              grandmother, mother, aunt, sister Sonia Kalendarov Iskhakov. She
              has passed about an hour ago. Funeral will be on December 8th,
              which would have been her 76th birthday and instead of celebrating
              and rejoicing her birthday we will be crying with pain in our
              hearts putting her to rest. May her soul Rest In Peace. Funeral
              will be taken place in Israel-address is Tel Aviv Kiriyat Shalom
              Beit Keneset Yohananov Cohen Shmuel. Time is not certain. Please
              call Nadia at 053‑284‑2665 for updated funeral arrangements.{" "}
            </div>
            <div className={styles.funeral_date}>
              <span>Pominki Date:</span> Jan 7 2020
            </div>

            <div className={styles.comment_reply_title}>
              <h1>Leave a Comment</h1>
              <p>
                You must be <a href="#">logged in</a> to post a comment.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}