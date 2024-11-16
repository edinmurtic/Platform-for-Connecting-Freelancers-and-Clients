import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import LanguageIcon from '@mui/icons-material/Language';
export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Povežite se s nama na društvenim mrežama:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <FacebookIcon color='action'  />
          </a>
          <a href='' className='me-4 text-reset'>
            <TwitterIcon color='action'  icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <GoogleIcon color='action'  icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <InstagramIcon color='action'  icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <LinkedInIcon color='action'  icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <GitHubIcon color='action'  icon='github' />
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
              Povežite se sa stručnjacima iz raznih IT oblasti ili ponudite svoje vještine kako biste privukli nove klijente.
Bilo da tražite tim profesionalaca ili želite promovirati svoje usluge, naš portal je pravo mjesto za vas.         </p>
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
                  Razvoj aplikacija
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  IT konsalting
                </a>
              </p>
               <p>
                <a href='#!' className='text-reset'>
                  Razvoj video igara
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
                <a href='/services' className='text-reset'>
                  Servisi
                </a>
              </p>
              <p>
                <a href='' className='text-reset'>
                  Poruke
                </a>
              </p>
              <p>
                <a href='' className='text-reset'>
                  Narudžbe
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Moj profil
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
                <HomeIcon color='action' icon='home' className='me-2' />
                Stari grad 6, Velika Kladuša
              </p>
              <p>
                <LanguageIcon color='action' icon='home' className='me-2' />
                 USK, Bosna i Hercegovina
              </p>
              <p>
                <MailIcon color='action' icon='envelope' className='me-3' />
                info@klik.ba
              </p>
              <p>
                <PhoneIcon color='action' icon='phone' className='me-3' /> +387 61 213 882
              </p>
              <p>
                <PaymentIcon color='action'  className='me-3' /> Stripe, Inc.
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