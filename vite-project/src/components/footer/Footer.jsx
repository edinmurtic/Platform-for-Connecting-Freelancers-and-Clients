import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Povežite se s nama na društvenim mrežama:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
               Klik.ba
              </h6>
              <p>
              Pronađite stručnjaka iz različitih područja ili postavite svoje usluge kako biste privukli nove klijente.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Kategorije</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Grafika i dizajn
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Razvoj softvera
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  IT konsalting
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Video i animacija
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Korisni linkovi</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Servisi i usluge
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Moj profil
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Narudžbe
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Pomoć
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Kontakt</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Velika Kladuša, USK, BiH
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                info@klik.ba
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href=''>
          KLIK.BA
            </a>
      </div>
    </MDBFooter>
  );
}