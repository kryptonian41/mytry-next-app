import HamburgerIcon from 'assets/svgs/icons/hamburger.svg'
import MyTryLogo from 'assets/svgs/logos/main.svg'
import styles from './style.module.scss'
import clsx from 'clsx'
import Link from 'next/link'

interface Props {
  color?: string
}

const numberofItemsInCart = 0

export const Navbar: React.FC<Props> = ({
  color = 'dark'
}) => {
  return <div className={clsx("font-semibold p-4 px-8 flex items-start space-x-4 justify-between", {
    'text-white': color === 'light',
    'text-green-900': color === 'dark',
  })}>
    <div className="space-x-6 flex items-center">
      <HamburgerIcon />
      <span>Cart ({numberofItemsInCart})</span>
      <span>Account</span>
    </div>

    <div>
      <Link href="/">
        <MyTryLogo className={styles['mytry-logo']} />
      </Link>
    </div>
  </div>
}