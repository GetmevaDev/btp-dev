import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

export default function PrivacyPolicy() {
  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Privacy Policy</title>
      </Head>

      <Container>
        <Row>
          <Col>
            <h1>Privacy Policy</h1>
            <h3>Who we are</h3>
            <p>Our website address is: https://btpnnecrology.com/.</p>
            <h3>What personal data we collect and why we collect it</h3>
            <h4>Comments</h4>
            <p>
              When visitors leave comments on the site we collect the data shown
              in the comments form, and also the visitor’s IP address and
              browser user agent string to help spam detection.
            </p>
            <p>
              An anonymized string created from your email address (also called
              a hash) may be provided to the Gravatar service to see if you are
              using it. The Gravatar service privacy policy is available here:
              https://automattic.com/privacy/. After approval of your comment,
              your profile picture is visible to the public in the context of
              your comment.
            </p>
            <h4>Media</h4>
            <p>
              If you upload images to the website, you should avoid uploading
              images with embedded location data (EXIF GPS) included. Visitors
              to the website can download and extract any location data from
              images on the website.
            </p>
            <h4>Contact forms</h4>
            <h4>Cookies</h4>
            <p>
              If you leave a comment on our site you may opt-in to saving your
              name, email address and website in cookies. These are for your
              convenience so that you do not have to fill in your details again
              when you leave another comment. These cookies will last for one
              year.
            </p>
            <p>
              If you have an account and you log in to this site, we will set a
              temporary cookie to determine if your browser accepts cookies.
              This cookie contains no personal data and is discarded when you
              close your browser.
            </p>
            <p>
              When you log in, we will also set up several cookies to save your
              login information and your screen display choices. Login cookies
              last for two days, and screen options cookies last for a year. If
              you select &#8220;Remember Me&#8221;, your login will persist for
              two weeks. If you log out of your account, the login cookies will
              be removed.
            </p>
            <p>
              If you edit or publish an article, an additional cookie will be
              saved in your browser. This cookie includes no personal data and
              simply indicates the post ID of the article you just edited. It
              expires after 1 day.
            </p>
            <h4>Embedded content from other websites</h4>
            <p>
              Articles on this site may include embedded content (e.g. videos,
              images, articles, etc.). Embedded content from other websites
              behaves in the exact same way as if the visitor has visited the
              other website.
            </p>
            <p>
              These websites may collect data about you, use cookies, embed
              additional third-party tracking, and monitor your interaction with
              that embedded content, including tracking your interaction with
              the embedded content if you have an account and are logged in to
              that website.
            </p>
            <h4>Analytics</h4>
            <h3>Who we share your data with</h3>
            <h3>How long we retain your data</h3>
            <p>
              If you leave a comment, the comment and its metadata are retained
              indefinitely. This is so we can recognize and approve any
              follow-up comments automatically instead of holding them in a
              moderation queue.
            </p>
            <p>
              For users that register on our website (if any), we also store the
              personal information they provide in their user profile. All users
              can see, edit, or delete their personal information at any time
              (except they cannot change their username). Website administrators
              can also see and edit that information.
            </p>
            <h3>What rights you have over your data</h3>
            <p>
              If you have an account on this site, or have left comments, you
              can request to receive an exported file of the personal data we
              hold about you, including any data you have provided to us. You
              can also request that we erase any personal data we hold about
              you. This does not include any data we are obliged to keep for
              administrative, legal, or security purposes.
            </p>
            <h3>Where we send your data</h3>
            <p>
              Visitor comments may be checked through an automated spam
              detection service.
            </p>
            <h3>Your contact information</h3>
            <h3>Additional information</h3>
            <h4>How we protect your data</h4>
            <h4>What data breach procedures we have in place</h4>
            <h4>What third parties we receive data from</h4>
            <h4>
              What automated decision making and/or profiling we do with user
              data
            </h4>
            <h4>Industry regulatory disclosure requirements</h4>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
