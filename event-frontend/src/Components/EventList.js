import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Card, ListGroup, Row, Col } from "react-bootstrap";

function EventList() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchDataWithFilters = async () => {
    try {
      let url = new URL("http://localhost:8000/api/list");
      const params = new URLSearchParams({
        ...(category && { category }),
        ...(location && { location }),
        ...(startDate && { start: startDate }),
        ...(endDate && { end: endDate })
      });
      url.search = params.toString();

      let result = await fetch(url);
      result = await result.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data with filters:", error);
    }
  };

  useEffect(() => {
    fetchDataWithFilters(); // Fetch all events initially
  }, []);

  return (
    <div>
      <Header />
      <div style={{ margin: "20px" }}>
        <select style={{ marginRight: "10px" }} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Business">Business</option>
          <option value="Comedy">Comedy</option>
          <option value="Sports">Sports</option>
        </select>
        <select style={{ marginRight: "10px" }} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select A City</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Kolkata">Kolkata</option>
        </select>
        <input style={{ marginRight: "10px" }} type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input style={{ marginRight: "10px" }} type="date" onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={fetchDataWithFilters}>Apply Filters</button>
      </div>
      <h1>Events List</h1>
      <h2>Events Happening Around You...</h2>
      <br/>
      <Row xs={1} md={2} lg={3} className="g-4 justify-content-center" style={{ margin: "0 10px" }}>
        {data.map((event) => (
          <Col key={event.ID} xs={12} md={6} lg={3} style={{ margin: "10px 0" }}>
            <Card style={{ height: "100%", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
              <Card.Img
                variant="top"
                src={`http://localhost:8000/${event.fileName}`}
                alt="Event Image"
                style={{ objectFit: "cover", height: "200px" }}
              />
              <Card.Body>
                <Card.Title>{event.Name}</Card.Title>
                <Card.Text>{event.Description}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Location: {event.Location}</ListGroup.Item>
                <ListGroup.Item>Category: {event.Category}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Subtitle>Start Time: {event.Start_Time} </Card.Subtitle>
                <br />
                <Card.Subtitle>End Time: {event.End_Time}</Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default EventList;
