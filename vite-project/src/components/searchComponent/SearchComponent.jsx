import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate(`/services?search=${input}`);
    window.location.reload(); // Refresh page

  }

  return (
    <Form onSubmit={handleSubmit} >
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Pretraži"
            className="mr-sm-2"
            onChange={(e) => setInput(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Pronađi</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchComponent;
