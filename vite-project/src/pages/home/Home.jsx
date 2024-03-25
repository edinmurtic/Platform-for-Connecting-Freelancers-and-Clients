import React from 'react'
import CardGroup from '../../components/cardgroup/CardGroup'
import TwoColumnLayout from '../../components/twocolumnlayout/TwoColumnLayout'
import TitleDisplay from '../../components/titledisp/TitleDisplay'
import Testimonials from '../../components/testimonials/Testimonials'
const Home = () => {
  return (
<>
<TitleDisplay />
<CardGroup />
<TwoColumnLayout /> 
<Testimonials /> </>


  )
}

export default Home