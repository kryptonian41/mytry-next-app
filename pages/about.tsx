import { useTheme } from 'utils/hooks/useTheme'
import Navbar from 'components/Navbar'
import Layout from 'components/Layout'
import MyTrySvg from 'assets/svgs/icons/mytry.svg'
import Footer from 'components/Footer'

export const About = () => {
  const theme = useTheme()
  return (
    <Layout title="About Us">
      <div style={{ backgroundColor: '#F7FAEE' }}>
        <Navbar />
        <p
          style={{
            color: theme.orange,
          }}
          className="w-4/5 sm:w-3/6 py-28 m-auto text-center text-3xl sm:text-5xl"
        >
          mytry is a homegrown skincare brand that works with real people and
          believes in embracing the beauty of flaws
        </p>

        <div className="mt-10 relative wfull_hfull_block_svg-container">
          <MyTrySvg />
          <p
            className="absolute bottom-0 sm:text-3xl right-1/4 aboutUs__by_maitri"
            style={{
              color: theme.green,
            }}
          >
            BY MAITRI DOSHI
          </p>
        </div>

        <div className="sm:border-b sm:border-gray-800">
          <div className="py-10 sm:py-20 w-4/5 m-auto flex flex-col sm:grid sm:grid-cols-2">
            <p
              className="self-center sm:text-xl order-2 sm:order-none mt-6 sm:mt-0"
              style={{
                color: theme.green,
              }}
            >
              The idea of Mytry was born during the lockdown of 2020. Maitri has
              always been passionate about skincare, and when she got bored of
              watching Netflix, she decided to venture out and learn more about
              the process of making vegan products at home. YouTube was her
              first source of information. <br />
              <br />
              Maitri researched a lot to understand more about how to make
              natural and organic products from home ingredients. In the coming
              months, she tried to understand how skincare works, what essential
              or carrier oil works for what skin type and took up a course at
              the School of Natural Skincare to dive deep. Finally, on September
              29th of 2020, Mytry saw the daylight!
              <br />
              <br />
              In her own words,
              <br />
              “Mytry is my baby. I have used chemical-free products, and now, I
              want people to experience the magic of going organic.”
            </p>
            <div>
              <img
                style={{ width: '100%', maxWidth: '450px' }}
                className="m-auto"
                src="/assets/images/about/founder.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="py-10 sm:py-20 text-center px-6 sm:px-0">
          <p
            className="sm:mb-10 uppercase sm:text-2xl"
            style={{ color: theme.green }}
          >
            Vegan skincare
          </p>
          <p
            className="mb-10 text-3xl sm:text-6xl"
            style={{ color: theme.pink }}
          >
            Nicely with nature
          </p>
          <p
            className="sm:w-3/5 m-auto mb-10 sm:mb-20 sm:text-xl"
            style={{ color: theme.green }}
          >
            Mytry products are for real people. Our products come from
            ingredients you can find at home and are free of harsh chemicals. We
            care a lot about our environment and the animals. Hence we use plant
            extracts for our products and are 100% vegan. <br />
            <br />
            Our vision is to make people comfortable enough to embrace their
            authentic selves and flaunt their imperfections to the world.
            Keeping this in mind, we have used real women like you to be the
            face of our brand.
          </p>
          <div className="mb-10 sm:mb-20">
            <img
              style={{ width: '100%', maxWidth: '450px' }}
              className="m-auto"
              src="/assets/images/about/2.jpg"
              alt=""
            />
          </div>
          <p
            className="mb-10 text-3xl sm:text-6xl"
            style={{ color: theme.pink }}
          >
            People First!
          </p>

          <p
            className="sm:w-3/5 m-auto sm:text-xl"
            style={{ color: theme.green }}
          >
            Mytry is all about giving back to the community. We believe that our
            community is our biggest strength, and we love to share our love
            with the people who support us. All the people involved at various
            stages are a part of the Mytry family, and we appreciate each of
            you.
          </p>
        </div>

        <Footer />
      </div>
    </Layout>
  )
}

export default About
