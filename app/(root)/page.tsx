import { CarouselPlugin } from '@/components/web/carousel'
import Destination from '@/components/web/destination'
import Explore from '@/components/web/explore'
import HeroSlider from '@/components/web/slider'
import TestimonialsSection from '@/components/web/teststmonial'
import React from 'react'

export default function Home() {
  return (
    <>

<CarouselPlugin />


<Explore />


<Destination />


<TestimonialsSection />

    </>
  )
}
