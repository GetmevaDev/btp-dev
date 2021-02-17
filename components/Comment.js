import { Col } from "react-bootstrap";

export default function Comment({ comment }) {
    const nestedComments = (comment.children || []).map(comment => {
      return <Comment comment={comment} />;
    });
  
    return (
      <div key={comment.id}>
        <strong>{comment.authorUser.fullName} :</strong>
        <p>{comment.content}</p>
        <Col>
          {nestedComments}
        </Col>
      </div>
    );
  }

