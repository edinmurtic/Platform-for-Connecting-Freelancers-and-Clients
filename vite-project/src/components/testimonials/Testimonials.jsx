import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Testimonials() {
  return (
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
          <h3 className="mb-4 highparagraph" >Najnoviji utisci</h3>
          <p className="mb-4 pb-2 mb-md-5 pb-md-0 lowparagraph">
          Otkrijte šta freelanceri i klijenti imaju za reći o našoj platformi i kako im je ona pomogla da ostvare profesionalne ciljeve.         </p>
        </MDBCol>
      </MDBRow>
      <MDBRow className="text-center">
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/myjob-c95a8.appspot.com/o/testimonialsModel%2F_f6e6ac71-ac79-43f0-bd4f-1207ef3b2680.jpg?alt=media&token=f95745d4-738c-45a5-b79b-e2825b0f878e"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">Merjem Daković</h5>
          <h6 className="text-primary mb-3">Web developer</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            Najbolja platforma za freelancere! Zahvaljujući njoj, pronalazim kvalitetne klijente i ističem svoje vještine. Sada radim na projektima koji me zaista inspirišu. Hvala vam što mi omogućavate da ostvarim svoje profesionalne snove!
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon
                fas
                icon="star-half-alt"
                size="sm"
                className="text-warning"
              />
            </li>
          </MDBTypography>
        </MDBCol>
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/myjob-c95a8.appspot.com/o/testimonialsModel%2F_a9d0a8fd-b095-40e8-8189-ed30865ff67e.jpg?alt=media&token=2bd22972-0d8a-482b-9fbd-62d50048ed7d"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">Adnan Marić</h5>
          <h6 className="text-primary mb-3">Grafički dizajner</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            Oduševljen sam ovom platformom! Zahvaljujući njoj, pronalazim inspirativne projekte i gradim veze s klijentima koji cijene moj rad. Hvala vam što mi omogućavate da slobodno kreiram i razvijam svoju kreativnost!
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
          </MDBTypography>
        </MDBCol>
        <MDBCol md="4" className="mb-5 mb-md-0">
          <div className="d-flex justify-content-center mb-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/myjob-c95a8.appspot.com/o/testimonialsModel%2F_1f92b822-13d1-4c46-838e-49f48e2ba1bc.jpg?alt=media&token=9c59e3c1-238b-4e01-9b0a-3b258d263137"
              className="rounded-circle shadow-1-strong"
              width="150"
              height="150"
            />
          </div>
          <h5 className="mb-3">Adna Sović</h5>
          <h6 className="text-primary mb-3">IT konsultant</h6>
          <p className="px-xl-3">
            <MDBIcon fas icon="quote-left" className="pe-2" />
            Ova platforma je savršena za IT konsultante poput mene! Zahvaljujući njoj, pronalazim klijente koji cijene moje znanje i iskustvo te projekte koji me neprekidno izazivaju. Hvala vam što mi omogućavate da rastem i napredujem u karijeri!
          </p>
          <MDBTypography
            listUnStyled
            className="d-flex justify-content-center mb-0"
          >
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon fas icon="star" size="sm" className="text-warning" />
            </li>
            <li>
              <MDBIcon far icon="star" size="sm" className="text-warning" />
            </li>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}