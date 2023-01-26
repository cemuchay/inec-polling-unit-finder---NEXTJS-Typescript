import { SetStateAction } from "react";
import { Row, Col, FloatingLabel, Form } from "react-bootstrap";

const FormSelect = ({
   controlid,
   label,
   value,
   datatestid,
   required,
   stateChanger,
   disabled,
   list,
}: {
   label: string;
   controlid: string;
   datatestid: string;
   value: string;
   required?: boolean;
   stateChanger?: React.Dispatch<SetStateAction<string>>;
   disabled?: boolean;
   list: Array<string>;
}) => {
   return (
      <Row className="justify-content-center">
         <Col xs={12} md={4}>
            <FloatingLabel
               className=" pb-3"
               controlId={controlid}
               label={label}
               data-testid={datatestid}
            >
               <Form.Select
                  aria-label={label}
                  onChange={(e) =>
                     stateChanger ? stateChanger(e.target.value) : null
                  }
                  value={value}
                  required={required}
                  disabled={disabled}
               >
                  <option value="">Choose {label}</option>
                  {list.map((state, index) => (
                     <option key={index} value={state}>
                        {state}
                     </option>
                  ))}
               </Form.Select>
            </FloatingLabel>
         </Col>
      </Row>
   );
};

export default FormSelect;
