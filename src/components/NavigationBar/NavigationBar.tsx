import { Nav, Navbar } from "react-bootstrap";

export function NavigationBar(): JSX.Element {
  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      {/*  */}
      <Navbar.Brand href="/">Workout Tracker</Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="new">New Workout</Nav.Link>
          <Nav.Link href="stats">Stats</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
