import Layout from "components/Layout";
import clsx from "clsx";
import { HomeProductTile } from "components/HomeProductTile";
import Navbar from "components/Navbar";
import React from "react";
import Footer from "components/Footer";
import styles from "./home.module.scss";
import FullPageVideo from "components/FullPageVideo";
import GreenOvalSticker from "assets/svgs/stickers/green-oval-badge.svg";
import { useRouter } from "next/router";
import { useTheme } from "utils/hooks/useTheme";

export const Home: React.FC = () => {
  const theme = useTheme();

  const router = useRouter();

  return (
    <Layout title="Home">
      <React.Fragment>
        <div className="h-full relative">
          <Navbar />
          <FullPageVideo page="homepage" />
          <div className="homePage__bgVideo--overlay" />
          <div
            onClick={() => router.push("/products")}
            className="absolute w-full left-0 bottom-0"
            style={{
              background: theme.yellow,
              cursor: "pointer",
            }}
          >
            <div className={styles.homePageMarquee}>
              <div>
                <span>SHOP</span>
                <span>SHOP</span>
                <span>SHOP</span>
                <span>SHOP</span>
                <span>SHOP</span>
                <span>SHOP</span>
                <span>SHOP</span>
                <span>SHOP</span>
                <span>SHOP</span>
                <span>SHOP</span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ backgroundColor: "#F7FAEE", marginBottom: "-3rem" }}
          className="py-16"
        >
          <h1
            className="text-center text-4xl sm:text-6xl mb-8"
            style={{
              color: theme.orange,
            }}
          >
            Real is beautiful
          </h1>
          <p
            className="text-center text-lg sm:text-2xl sm:w-2/5 m-auto mb-12 sm:mb-24"
            style={{
              color: theme.green,
            }}
          >
            100% Vegan | Responsibly Sourced Ingredients & Materials | Clean
            Beauty + Eco-friendly
          </p>

          <div className="grid grid-cols-2 sm:w-3/6 m-auto gap-12 sm:gap-24 p-8">
            <div>
              <HomeProductTile
                subtitle="Bag it before someone else."
                title="Best in the Nest!"
                imageSrc="/assets/images/homepage/1.jpg"
              />
            </div>
            <div className="transform translate-y-6">
              <HomeProductTile
                subtitle="Freshly brewed for you."
                title="View the New!"
                imageSrc="/assets/images/homepage/2.jpg"
                textPosition="top"
              />
            </div>
            <div className="col-span-2">
              <HomeProductTile
                subtitle="A community of people as real as your view."
                title="A space to be you!"
                imageSrc="/assets/images/homepage/3.jpg"
              />
            </div>
          </div>

          <div className="pt-10 pb-20 grid grid-cols-1 sm:grid-cols-2 gap-x-40 border-t border-gray-800 w-5/6 m-auto mt-12">
            <p
              className="text-lg"
              style={{
                color: theme.green,
              }}
            >
              <span
                className="block text-4xl sm:text-6xl mb-8 sm:mb-12"
                style={{
                  color: theme.pink,
                }}
              >
                Real Skin, Real Care!
              </span>
              <span
                className="w-full sm:w-3/4 block text-lg sm:text-xl"
                style={{
                  color: theme.greenLight,
                }}
              >
                Mytry is a vegan skincare brand homegrown by our founder,
                Maitri. We source all our ingredients responsibly and ensure
                that the environment or your skin is unharmed. With Mytry, our
                mission is to help people embrace their beautiful selves and
                make them a part of a community that encourages them to leave
                judgment behind. Our products are 100% vegan and plant-based. We
                refrain from testing our products on animals and are against
                cruelty to any living being.
              </span>
            </p>
            <div className="relative mt-20 sm:mt-0">
              <div
                className={clsx(
                  "absolute right-0 sm:right-1/2 transform sm:translate-x-1/2 -translate-y-1/2",
                  styles["plant-sticker"]
                )}
              >
                <GreenOvalSticker />
              </div>

              <div
                className="absolute right-0 sm:right-1/2 transform -translate-x-1/2 sm:translate-x-1/2 -translate-y-1/2 sm:text-2xl rotate-6"
                style={{
                  color: theme.yellow,
                }}
              >
                In Plants
                <br />
                We Trust
              </div>

              <img
                className="w-full h-full object-cover"
                src="/assets/images/homepage/nicely_with_nature.png"
                alt=""
              />
            </div>
          </div>

          <div
            className="w-5/6 mb-12 m-auto relative"
            style={{
              height: 500,
            }}
          >
            <p
              className="text-4xl text-center sm:text-6xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 filter drop-shadow-xl"
              style={{
                color: theme.yellow,
              }}
            >
              packaged with love
              <br />
              <span
                className="text-center text-xl sm:text-xl m-auto mt-12"
                style={{
                  color: "white",
                  display: "inline-block",
                  textShadow: "1px 1px black",
                }}
              >
                All our boxes are handmade by specially-abled people who add
                oodles of love and care while making them.
              </span>
            </p>
            <img
              src="/assets/images/homepage/packaged with love.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    </Layout>
  );
};

export default Home;
