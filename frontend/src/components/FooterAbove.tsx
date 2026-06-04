import Footerkacomp from './FooterkaComp'
import { useState } from 'react'
import Footerkaleft from './Footerkaleft'

const FooterAbove = () => {
  const [title, settitle] = useState<string>("")
  return (
    <div className='p-6 bg-gradient-to-b from-indigo-300 to-white'>
      <div
      className="grid gap-6 p-3 grid-cols-2"
      >
        <div className="col-span-1 row-span-2">
          <Footerkaleft
          title='Your Next Adventure Awaits'
          subtitle='Book flights to 120+ destinations with comfort, speed, and exclusive travel deals.'
          />
        </div>
        <div className='grid grid-cols-2 gap-5'>
        <div className="col-span-1/2 row-span-2">
      <Footerkacomp
      title="500+ Daily Flights"
      subtitle='Connecting major cities worldwide every single day.'
      />        </div>
        <div className="col-span-1/2 row-span-2">
      <Footerkacomp
      title="98% On-Time Departures"
      subtitle='Reliable schedules designed for stress-free travel.'
      />        </div>
        <div className="col-span-1/2 row-span-2">
      <Footerkacomp
      title="24×7 Customer Support"
      subtitle='Travel assistance anytime, anywhere you need it.'
      />        </div>
        <div className="col-span-1/2 row-span-2">
      <Footerkacomp
      title="Exclusive Member Discounts"
      subtitle='Unlock premium offers and lower fares on every trip.'
      />        </div>
        </div>
      </div>
    </div>
  )
}

export default FooterAbove