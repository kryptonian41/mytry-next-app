import { useTheme } from 'assets/color-map'
import { HomeProductTile } from 'components/HomeProductTile'
import { Navbar } from 'components/Navbar'
import React, { useMemo } from 'react'
import { Product } from 'types/commons'


interface Props {
  products: Product[]
}


export const Home: React.FC = ({
}) => {
  const theme = useTheme()

  const pageBody = useMemo(() => {
    return <div className="py-16">
      <h1 className="text-center text-5xl mb-8" style={{
        color: theme.orange
      }}>Sustainable, vegan beauty </h1>
      <p className="text-center text-lg w-2/5 m-auto mb-16" style={{
        color: theme.green
      }}>
        100% Vegan | Responsibly Sourced Ingredients & Materials |
        Handcrafted + Highly Effective
      </p>

      <div className="grid grid-cols-2 w-3/6 m-auto gap-24">
        <div>
          <HomeProductTile subtitle="EXPLORE CLAY MASKS" title="pore it in
" imageSrc="/assets/images/about/Group 73.png" />
        </div>
        <div className="transform translate-y-10">
          <HomeProductTile subtitle="EXPLORE CLAY MASKS" title="pore it in
" imageSrc="/assets/images/about/Group 80.png" textPosition="top" />
        </div>
        <div className="col-span-2">
          <HomeProductTile subtitle="EXPLORE CLAY MASKS" title="pore it in
" imageSrc="/assets/images/about/Intersection 1@2x.png" />
        </div>
      </div>

      <div className="py-20 grid grid-cols-2 border-t border-gray-800 w-3/4 m-auto mt-12">
        <p className="text-lg" style={{
          color: theme.green
        }}>

          <span className="block text-6xl mb-8" style={{
            color: theme.pink
          }}>
            Nicely with <br /> nature
          </span>

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ad tempora dolorum hic ipsa corrupti consequuntur sequi ipsum, enim, eum ea earum molestias cupiditate culpa voluptas? Voluptatum blanditiis dolores ex modi pariatur tempore illum voluptate veniam ratione temporibus ad praesentium cum accusantium numquam, accusamus at aliquid eligendi! Eveniet accusamus provident tempore sapiente similique quam alias amet neque! Consequuntur, nam quia?
          <br />
          <br />
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rem voluptas cum consequuntur exercitationem quis rerum blanditiis perferendis, cumque tenetur.
          </p>
        <div className="pl-12">
          <img className="m-auto" src="/assets/images/about/Group 74.png" alt="" />
        </div>
      </div>
    </div>

  }, [])


  return (
    <React.Fragment>
      <div className="h-full relative">
        <Navbar />
        <div className="absolute w-full p-4 left-0 bottom-0" style={{
          background: theme.yellow
        }}></div>
      </div>
      {pageBody}
    </React.Fragment>
  )
}

export default Home
