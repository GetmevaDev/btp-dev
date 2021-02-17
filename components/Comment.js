import { Col, Button } from "react-bootstrap";

export default function Comment({ comment, setCurrentComment }) {
  const nestedComments = (comment.children || []).map((comment) => {
    return <Comment comment={comment} setCurrentComment={setCurrentComment} />;
  });

  return (
    <>
      <div key={comment.id}>
        <strong>{comment.authorUser.username} :</strong>
        <p>{comment.content}</p>
        <Col>{nestedComments}</Col>
      </div>
      <Button
        variant="info"
        size="sm"
        onClick={() => setCurrentComment(comment._id)}
        href="#comment_form"
        className="mb-2"
      >
        Reply
      </Button>
    </>
  );
}
