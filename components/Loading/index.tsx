import { Col, Row, Spinner } from "react-bootstrap";

const Loading = () => {
   return (
      <Row className="mt-3 justify-content-center">
         <Col className="text-center" xs={12} md={4}>
            <Spinner animation="border" variant="primary" />
         </Col>
      </Row>
   );
};

export default Loading;
