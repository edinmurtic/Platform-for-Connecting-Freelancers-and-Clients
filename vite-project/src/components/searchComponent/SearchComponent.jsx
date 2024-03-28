import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SearchComponent = () => {
  const [input,setInput] = useState("");
  const navigate =useNavigate();
  const handleSubmit=() =>
  {
    navigate(`/services?search=${input}`);
  }
  return (
    <div>  <Form inline>
    <Row>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Pretraži"
          className=" mr-sm-2"
          onChange={(e) => setInput(e.target.value)}
        />
      </Col>
      <Col xs="auto">
        <Button type="submit" onClick={handleSubmit}>Pronađi</Button>
      </Col>
    </Row>
  </Form></div>
  )
}

export default SearchComponent