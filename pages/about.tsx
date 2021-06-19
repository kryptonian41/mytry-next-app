import { useTheme } from "assets/color-map"
import Navbar from "components/Navbar"
import MyTrySvg from 'assets/svgs/icons/mytry.svg'

export const About = () => {
  const theme = useTheme()
  return <div>
    <Navbar />
    <p style={{
      color: theme.orange
    }}
      className="w-3/6 py-28 m-auto text-center text-5xl">
      mytry is a celebration of finding
      joy in beauty, making conscious
      choices and creating a community
      of vegan skincare enthusiasts
    </p>

    <div className="mt-10 relative">
      <MyTrySvg />
      <p className="absolute bottom-0 text-3xl right-1/4" style={{
        color: theme.green
      }}>
        BY MAITRI DOSHI
      </p>
    </div>


    <div className="border-b border-gray-800">
      <div className="py-20 w-4/5 m-auto grid grid-cols-2">
        <p className="self-center text-xl" style={{
          color: theme.green
        }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora pariatur laboriosam praesentium ipsum nesciunt beatae ratione itaque corrupti ipsam. Animi, debitis inventore facere laborum, impedit, explicabo quisquam quae beatae neque voluptates corrupti reiciendis iure. Dolor nesciunt incidunt, porro tempore quas necessitatibus quisquam quis aperiam quo impedit consequuntur obcaecati perspiciatis repudiandae at repellendus nam ea totam facere deleniti? Doloremque sunt quidem voluptates doloribus vitae laborum voluptas sequi! Iure alias, provident modi fugiat rem facere ipsam repellat quibusdam dolorem praesentium minus eius tempora quidem et voluptate? Magni animi quasi, quam similique nisi porro atque, dolorem nesciunt repellendus ipsa dolore consectetur possimus excepturi.      </p>
        <div>
          <img className="m-auto" src="/assets/images/about/Group 74.png" alt="" />
        </div>
      </div>
    </div>

    <div className="py-20 text-center">
      <p className="mb-10 uppercase text-2xl" style={{ color: theme.green }}>Vegan skincare</p>
      <p className="mb-10 text-6xl" style={{ color: theme.pink }}>Nicely with nature</p>
      <p className="w-3/5 m-auto mb-20 text-xl" style={{ color: theme.green }}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
      </p>
      <div className="mb-20">
        <img className="m-auto" src="/assets/images/about/Group 80.png" alt="" />
      </div>
      <p className="mb-10 text-6xl" style={{ color: theme.pink }}>You, first </p>

      <p className="w-3/5 m-auto text-xl" style={{ color: theme.green }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quo asperiores vero expedita alias minus incidunt, nam debitis consequatur suscipit mollitia laborum aperiam, cumque eveniet facere placeat, sequi maxime recusandae molestias necessitatibus impedit. Tempora illo quo voluptatem excepturi optio non delectus molestiae quas harum hic, illum enim porro pariatur ullam praesentium. Perspiciatis quia error odio assumenda sequi magnam deleniti, commodi temporibus provident sit accusamus nihil culpa maxime, ut incidunt placeat excepturi eum repellat eligendi officiis? Magni, exercitationem dolores architecto minima vitae nisi beatae dicta! Officiis nisi facilis rerum explicabo ut dolores vitae, iusto quasi saepe assumenda magni recusandae quibusdam sint?
        <br />
        <br />
       Lorem ipsum dolor sit amet consectetur adipisicing elit. In perspiciatis labore, eaque aliquid accusamus neque amet iure, quo atque libero illum iusto ducimus eius accusantium veritatis pariatur beatae non blanditiis.
      </p>
    </div>

    <div className="h-72" style={{
      backgroundColor: theme.orange
    }}>

    </div>
  </div>
}

export default About