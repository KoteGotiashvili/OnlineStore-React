import React from 'react'
import Header from '../components/Header'
import ShopSection from "./../components/homeComponents/ShopSection"
import ContactInfo from "./../components/homeComponents/ContactInfo"
import CallToActionSection from "./../components/homeComponents/CallActionSection"
import Footer from "./../components/Footer"
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  window.scroll(0, 0)

  const { keyword } = useParams()

  const { pagenumber } = useParams()



  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <CallToActionSection />
      <ContactInfo />
      <Footer />

    </div>
  )
}

export default HomeScreen