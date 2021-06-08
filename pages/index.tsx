import { useTheme } from 'assets/color-map'
import { HomeProductTile } from 'components/HomeProductTile'
import { Navbar } from 'components/Navbar'
import React from 'react'
import { Product } from 'types/commons'

interface Props {
  products: Product[]
}


export const Home: React.FC = ({
}) => {
  const theme = useTheme()

  return (
    <React.Fragment>
      <div className="h-full relative">
        <Navbar />
        <div className="absolute w-full p-4 left-0 bottom-0" style={{
          background: theme.yellow
        }}></div>
      </div>
      <div className="py-16">
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
            <HomeProductTile
              subtitle="EXPLORE CLAY MASKS"
              title="pore it in"
              imageSrc="/assets/images/about/Group 73.png" />
          </div>
          <div className="transform translate-y-6">
            <HomeProductTile subtitle="EXPLORE CLAY MASKS" title="pore it in" imageSrc="/assets/images/about/Group 80.png" textPosition="top" />
          </div>
          <div className="col-span-2">
            <HomeProductTile subtitle="EXPLORE CLAY MASKS" title="pore it in" imageSrc="/assets/images/about/Intersection 1@2x.png" />
          </div>
        </div>

        <div className="py-20 grid grid-cols-2 gap-x-40 border-t border-gray-800 w-5/6 m-auto mt-12">
          <p className="text-lg" style={{
            color: theme.green
          }}>

            <span className="block text-6xl mb-32" style={{
              color: theme.pink
            }}>
              Nicely with <br /> nature
          </span>
            <span className="w-3/4 block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ad tempora dolorum hic ipsa corrupti consequuntur sequi ipsum, enim, eum ea earum molestias cupiditate culpa voluptas? Voluptatum blanditiis dolores ex modi pariatur tempore illum voluptate veniam ratione temporibus ad praesentium cum accusantium numquam, accusamus at aliquid eligendi! Eveniet accusamus provident tempore sapiente similique quam alias amet neque! Consequuntur, nam quia?
              <br />
              <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rem voluptas cum consequuntur exercitationem quis rerum blanditiis perferendis, cumque tenetur.
          </span>
          </p>
          <div className="ypl-12">
            <img className="w-full h-full object-cover" src="/assets/images/Screenshot 2021-06-04 at 4.57.11 PM@2x.png" alt="" />
          </div>
        </div>

        <div className="w-5/6 mb-12 m-auto relative h-96">
          <p className="text-5xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{
            color: theme.yellow
          }}>
            packaged with love
        </p>
          <img src="/assets/images/Intersection 4@2x.png" alt="" className="w-full h-full object-cover" />
        </div>

        <p className="text-center text-xl w-2/5 m-auto mt-12" style={{
          color: theme.green
        }}>
          100% Vegan | Responsibly Sourced Ingredients & Materials |
          Handcrafted + Highly Effective
      </p>

        <div className="border-t border-gray-700 w-5/6 mt-12 m-auto">

          <div className="text-center mt-14 mb-8">
            <span style={{
              color: theme.green
            }} className="text-lg">@MYTRYSHOP</span>
          </div>

          <p className="text-5xl text-center uppercase mb-14" style={{
            color: theme.pink
          }}>
            FOLLOW ALONG OUR JOURNEY
        </p>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Home
