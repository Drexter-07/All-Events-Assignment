import Header from "./Header";
import { useState } from "react";

function AddEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [start_Time, setStart_Time] = useState("");
  const [end_Time, setEnd_Time] = useState("");

  async function addEvent() {
    console.warn(
      name,
      description,
      file,
      location,
      category,
      start_Time,
      end_Time
    );
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("location", location);
    formData.append("category", category);
    formData.append("start", start_Time);
    formData.append("end", end_Time);

    
    let result = await fetch("http://localhost:8000/api/addEvent", {
      method: "POST",
      body: formData,
    });
    alert("Data has been saved");
  }

  return (
    <div>
      <Header />
      <div className="col-sm-6 offset-sm-3">
        <br/>
        <h1>Add an Event</h1>
        <br />
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="name"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="description"
        />
        <br />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
          placeholder="file"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          className="form-control"
          placeholder="location"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
          placeholder="category"
        />
        <br />
        <input
          type="date"
          onChange={(e) => setStart_Time(e.target.value)}
          className="form-control"
          placeholder="start_Time"
        />
        <br />
        <input
          type="date"
          onChange={(e) => setEnd_Time(e.target.value)}
          className="form-control"
          placeholder="end_Time"
        />
        <br />
        <button onClick={addEvent} className="btn btn-primary">
          Add Event
        </button>
      </div>
    </div>
  );
}
export default AddEvent;
