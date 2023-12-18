import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  let user = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate('/register');
  }

  const linkStyle = {
    color: 'white',  // Set the text color to white
    textDecoration: 'none',  // Remove underlines
    marginRight: '15px'  // Add some right margin for spacing
  };

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Event DashBoard</Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {localStorage.getItem("user-info") ? (
              <>
                <Link to="/" style={linkStyle}>Events List</Link>
                <Link to="/add" style={linkStyle}>Add Events</Link>
              </>
            ) : (
              <>
                <Link to="/login" style={linkStyle}>Login</Link>
                <Link to="/register" style={linkStyle}>Register</Link>
              </>
            )}
          </Nav>
          {localStorage.getItem("user-info") ?
            <Nav>
              <NavDropdown title={user && user.name}>
                <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            : null}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
