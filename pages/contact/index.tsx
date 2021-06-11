import { useTheme } from 'assets/color-map'
import Navbar from 'components/Navbar'
import styles from './styles.module.scss'
import clsx from 'clsx'

export const ProductPage = () => {
  const theme = useTheme()
  return <div className={styles.root} style={{
    backgroundColor: theme.green
  }}>

    <div className={styles.hero}>
      <Navbar color="light" />
      <div className={styles['hero-contact-wrapper']}>
        <div className={clsx('mt-12 py-6 pl-12', styles['hero-contact-info'])} style={{
          backgroundColor: theme.orange
        }}>
          <p className="text-white uppercase text-lg mb-1">General Inquiries</p>
          <p className="uppercase text-2xl" style={{
            color: theme.yellow
          }}>hello@mytryshop.com</p>
        </div>

        <div className={clsx('bg-white px-16 py-12', styles['hero-contact-form'])}>
          <p className="uppercase text-3xl mb-6" style={{
            color: theme.green
          }}>get in touch</p>

          <div className="flex items-end mb-3">
            <p style={{
              color: theme.green
            }} className="uppercase text-lg leading-none">Name</p>
            <div className="flex-1 pl-8">
              <input type="text" className="block w-full border-0 border-b" style={{
                borderBottomColor: theme.green
              }} />
            </div>
          </div>
          <div className="flex items-end mb-3">
            <p style={{
              color: theme.green
            }} className="uppercase text-lg leading-none">Email</p>
            <div className="flex-1 pl-8">
              <input type="text" className="block w-full border-0 border-b" style={{
                borderBottomColor: theme.green
              }} />
            </div>
          </div>
          <div className="flex items-end mb-6">
            <p style={{
              color: theme.green
            }} className="uppercase text-lg leading-none">Phone</p>
            <div className="flex-1 pl-8">
              <input type="text" className="block w-full border-0 border-b" style={{
                borderBottomColor: theme.green
              }} />
            </div>
          </div>
          <div className="flex items-end flex-wrap mb-6">
            <p style={{
              color: theme.green
            }} className="uppercase text-lg">Message</p>
            <div className="w-full">
              <input type="text" className="block w-full border-0 border-b" style={{
                borderBottomColor: theme.green
              }} />
            </div>
          </div>

          <div className="text-right">
            <button
              style={{
                backgroundColor: theme.orange,
                color: theme.yellow
              }}
              className="px-4 py-1 rounded-full">submit</button>
          </div>
        </div>
      </div>
    </div>

  </div>
}


export default ProductPage