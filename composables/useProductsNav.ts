export const useProductsNav = async () => {
  const productsNav = useState('products-nav', () => [])

  if (productsNav.value && productsNav.value.length > 0) {
    return { data: productsNav }
  }

  const { data } = await useAsyncData('products-navigation', async () => {
    try {
      // 确认使用 v2 的 queryContent
      const allProducts = await queryContent('products').find()
      const categoriesMap = new Map()
      
      allProducts.forEach(product => {
        // v2 必须使用 _path
        if (product._path) {
          const parts = product._path.split('/').filter(Boolean)
          if (parts.length >= 2) {
            const categorySlug = parts[1]
            if (!categoriesMap.has(categorySlug)) {
              categoriesMap.set(categorySlug, {
                title: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
                path: `/products/${categorySlug}`,
                children: []
              })
            }
          }
        }
      })

      return [{
        title: 'Products',
        path: '/products',
        children: Array.from(categoriesMap.values())
      }]
    } catch (error) {
      console.error('Nav fetch error:', error)
      return []
    }
  })

  productsNav.value = data.value || []
  return { data: productsNav }
}
