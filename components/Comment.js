import { Col, Button } from "react-bootstrap";

import React from "react";
import ReactionForComment from "./ReactionForComment";


export default function Comment({ comment, setCurrentComment }) {

    const nestedComments = (comment.children || []).map((comment) => {
        return <Comment comment={comment} setCurrentComment={setCurrentComment} />;
    });

    return (
        <>
            <div key={comment.id}>
                <strong>{comment.authorUser.username} :</strong>
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
