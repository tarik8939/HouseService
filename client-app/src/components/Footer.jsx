import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
const Footer = () => {
  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4 fixed-bottom border-top border-grey border-3">
      <div className="footer-copyright text-center text-dark">
        <MDBContainer fluid>
          <p>&copy;  House Service Illia Vovchenko & Taras Horylchaniy - {new Date().getFullYear()}</p>
          <p>All Rights Reserved</p>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;