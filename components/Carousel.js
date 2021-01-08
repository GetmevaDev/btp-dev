import React, { useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import styles from '../styles/Carousel.module.css'
import { Carousel, Button } from 'react-bootstrap'

const PersonCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}> 
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2021/01/79291590_817241632068751_1616192959374426112_o-1-500x400.jpg"
          alt="First slide"
        />
        <Carousel.Caption className={styles.carousel_info}>
          <h3>Sonia Kalendarov Iskhakov</h3>
          <p>Dec 7, 2019</p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2020/12/73095269_788033354989579_6766342858812162048_n-500x400.jpg"
          alt="Second slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Yashuo bat Emmoshalom Khaimova.</h3>
          <p>Nov 3, 2019</p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2020/12/76726982_789394898186758_6826330259013500928_n-500x400.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Pinkhas Abayevich Abramov Kobuli samarkandi</h3>
          <p>
          Nov 4, 2019
          </p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2020/12/74643550_790143164778598_2862350644834992128_n-500x400.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Dora Arono</h3>
          <p>
          Nov 5, 2019
          </p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2020/12/74670673_791873954605519_4168123524336058368_n-500x400.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Michael Moshiach Yagudaev Ben Leah Rafael</h3>
          <p>
          Nov 7, 2019
          </p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400"
          src="https://btpnecrology.com/wp-content/uploads/2020/12/73020292_791878164605098_5924343661784465408_n-500x400.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Shoshana bat Rachel Musaev</h3>
          <p>
          Nov 12, 2019
          </p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2020/12/76702363_795901997536048_7814971381967224832_o-500x400.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Semyon Yakubov</h3>
          <p>
          Nov 13, 2019
          </p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2020/12/74282097_796436004149314_4450050327311286272_n-500x400.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Bako ben Bahmal Yashayev</h3>
          <p>
          Nov 13, 2019
          </p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2020/12/74211404_796898687436379_4493034639182528512_o-500x400.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Yuriy Pinkhasov</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
          <Button variant="primary">Nov 16, 2019</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={styles.carousel_item}>
        <Image
          className={styles.carousel_img}
          width="500" height="400" 
          src="https://btpnecrology.com/wp-content/uploads/2020/12/74862781_799306490528932_2764663400393867264_o-500x400.jpg"
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_info}>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
          <Button variant="primary">View Profile</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default PersonCarousel