import { getProduct } from 'api-utils'
import {
  ProductFilters
} from 'api-utils/api-calls'
import { colorMap, getColorSchemeByCategory } from 'assets/color-map'
import { Navbar } from 'components/Navbar'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { getProductsServerSide } from 'pages/api/products'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { Product } from 'types/commons'
import styles from './styles.module.scss'
interface Props {
  product: Product
}

export async function getStaticPaths() {
  const { data: products } = await getProductsServerSide()
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params
}) => {
  const { slug } = params
  const { data } = await getProductsServerSide({
    slug
  } as ProductFilters)
  return {
    props: {
      product: data[0],
    },
    revalidate: 20
  }
}

export const ProductPage: React.FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({
  product
}) => {
  const router = useRouter()
  const { slug } = router.query
  const { data: productData, isLoading, isError } = useQuery(slug, () => getProduct(slug as string), {
    initialData: product,
  })
  const colorScheme = useMemo(() => {
    if (!productData || isLoading || isError) return colorMap.default
    return getColorSchemeByCategory(productData.categories)
  }, [productData, isLoading, isError])


  return <div className={styles.root} style={{
    backgroundColor: colorScheme.bgColor
  }}>

    <div className={styles.hero}>
      <Navbar color="light" />
      {productData && <div className={styles['hero-product-info']}>
        <div className="p-4" style={{
          backgroundColor: colorScheme.panelColor
        }}>
          {productData.name}
        </div>

        <div>
          <img src={productData.images[0].src} alt="product-image" className={styles['hero-product-info-image']} />
        </div>
      </div>}
    </div>
  </div>
}


export default ProductPage