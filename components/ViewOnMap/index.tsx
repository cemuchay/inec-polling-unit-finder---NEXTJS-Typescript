import { Row, Col, Button } from "react-bootstrap";

const ViewOnMap = ({ searchQuery }: { searchQuery: string }) => {
   return (
      <Row className="mt-3 justify-content-center">
         <Col xs={12} md={4}>
            <Button
               className="w-100 text-center"
               onClick={() =>
                  window.open(
                     `https://www.google.com/maps/search/?api=1&query=${searchQuery}`,
                     "_blank"
                  )
               }
               variant="primary"
            >
               See pooling unit on Google Maps
            </Button>
         </Col>
      </Row>
   );
};

export default ViewOnMap;
