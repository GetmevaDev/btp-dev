import { Col, Button } from "react-bootstrap";

import React from "react";
import ReactionForComment from "./ReactionForComment";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import styles from "../styles/Profile.module.css";

export default function Comment({ comment, setCurrentComment }) {

    const nestedComments = (comment.children || []).map((comment) => {
        return <Comment comment={comment} setCurrentComment={setCurrentComment} />;
    });

    return (
        <>
            <div key={comment.id}>
                <strong>{comment.authorUser.username} :</strong>
                {comment.file ?
                <div className={styles.container_image}>
                    <LazyLoadImage

                        src={comment.file.url}
                        alt="Image"
                        style={{ objectFit: "cover" }}
                        effect="blur"
                    />
                </div> : null}
                <div>
                    <p>{comment.content}</p>
                </div>

            </div>
            <ReactionForComment comment={comment}/>
            <Button
                variant="info"
                size="sm"
                onClick={() => setCurrentComment(comment._id)}
                href="#comment_form"
                className="mb-2"
            >
                Reply
            </Button>


            <Col>{nestedComments}</Col>
        </>
    );
}
