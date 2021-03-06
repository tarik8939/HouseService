import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
const Footer = () => {
  return (

    <div className="footer-copyright text-center fixed-bottom text-light bg-dark pt-1 mt-5 fs-7">
        <MDBContainer fluid>
          <p>&copy;  House Service Illia Vovchenko & Taras Horylchaniy - {new Date().getFullYear()}</p>
          <p>All Rights Reserved</p>
        </MDBContainer>
      </div>
  )
}

export default Footer;