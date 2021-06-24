import { useTheme } from 'assets/color-map'
import clsx from 'clsx'
import { HomeProductTile } from 'components/HomeProductTile'
import Navbar from 'components/Navbar'
import React from 'react'
import styles from './styles.module.scss'
import GreenOvalSticker from 'assets/svgs/stickers/green-oval-badge.svg'


export const Home: React.FC = () => {
  const theme = useTheme()

  return (
    <React.Fragment>
      <div className="h-full relative">
        <Navbar />
        <div className="absolute w-full p-4 left-0 bottom-0" style={{
          background: theme.yellow
        }}>
          <marquee className="space-x-6"><span>SHOP</span>
            <span>SHOP</span>
            <span>SHOP</span>
            <span>SHOP</span>
            <span>SHOP</span>
            <span>SHOP</span>
          </marquee>

        </div>
      </div>
      <div className="py-16">
        <h1 className="text-center text-4xl sm:text-6xl mb-8" style={{
          color: theme.orange
        }}>Sustainable, vegan beauty </h1>
        <p className="text-center text-lg sm:text-2xl sm:w-2/5 m-auto mb-12 sm:mb-24" style={{
          color: theme.green
        }}>
          100% Vegan | Responsibly Sourced Ingredients & Materials |
          Handcrafted + Highly Effective
        </p>

        <div className="grid grid-cols-2 sm:w-3/6 m-auto gap-12 sm:gap-24 p-8">
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

        <div className="pt-10 pb-20 grid grid-cols-1 sm:grid-cols-2 gap-x-40 border-t border-gray-800 w-5/6 m-auto mt-12">
          <p className="text-lg" style={{
            color: theme.green
          }}>

            <span className="block text-4xl sm:text-6xl mb-12 sm:mb-24" style={{
              color: theme.pink
            }}>
              Nicely with <br /> nature
            </span>
            <span className="w-full sm:w-3/4 block text-lg sm:text-xl" style={{
              color: theme.greenLight
            }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ad tempora dolorum hic ipsa corrupti consequuntur sequi ipsum, enim, eum ea earum molestias cupiditate culpa voluptas? Voluptatum blanditiis dolores ex modi pariatur tempore illum voluptate veniam ratione temporibus ad praesentium cum accusantium numquam, accusamus at aliquid eligendi! Eveniet accusamus provident tempore sapiente similique quam alias amet neque! Consequuntur, nam quia?
              <br />
              <br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam rem voluptas cum consequuntur exercitationem quis rerum blanditiis perferendis, cumque tenetur.
            </span>
          </p>
          <div className="relative mt-20 sm:mt-0">

            <div className={clsx("absolute right-0 sm:right-1/2 transform sm:-translate-x-1/2 -translate-y-1/2", styles['plant-sticker'])}>
              <GreenOvalSticker />
            </div>

            <div className="absolute right-0 sm:right-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:text-2xl rotate-6" style={{
              color: theme.yellow
            }}>
              In Plants
              <br />
              We Trust
            </div>

            <img className="w-full h-full object-cover" src="/assets/images/Screenshot 2021-06-04 at 4.57.11 PM@2x.png" alt="" />
          </div>
        </div>

        <div className="w-5/6 mb-12 m-auto relative" style={{
          height: 500
        }}>
          <p className="text-4xl text-center sm:text-6xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 filter drop-shadow-xl" style={{
            color: theme.yellow
          }}>
            packaged with love
          </p>
          <img src="/assets/images/Intersection 4@2x.png" alt="" className="w-full h-full object-cover" />
        </div>

        <p className="text-center sm:text-xl sm:w-2/5 m-auto mt-12" style={{
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

          <p className="text-2xl sm:text-5xl text-center uppercase mb-8 sm:mb-14" style={{
            color: theme.pink
          }}>
            FOLLOW ALONG OUR JOURNEY
          </p>

          <div className="flex flex-wrap justify-between sm:space-x-8">
            <div className={clsx('sm:w-auto sm:flex-1', styles['insta-image'])}></div>
            <div className={clsx('sm:w-auto sm:flex-1', styles['insta-image'])}></div>
            <div className={clsx('sm:w-auto sm:flex-1', styles['insta-image'])}></div>
            <div className={clsx('sm:w-auto sm:flex-1', styles['insta-image'])}></div>
            <div className={clsx('sm:w-auto sm:flex-1', styles['insta-image'])}></div>
          </div>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Home;
