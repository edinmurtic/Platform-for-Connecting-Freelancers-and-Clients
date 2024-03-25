import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const SearchComponent = () => {
  return (
    <div>  <Form inline>
    <Row>
      <Col xs="auto">
        <Form.Control
          type="text"
          placeholder="Pretraži"
          className=" mr-sm-2"
        />
      </Col>
      <Col xs="auto">
        <Button type="submit">Pronađi</Button>
      </Col>
    </Row>
  </Form></div>
  )
}

export default SearchComponent