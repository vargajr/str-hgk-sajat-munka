const ProductsServiceFactory = (productsApi) => {
  const getSum = async () => {
    const products = await productsApi.get()
    return products
      .map(prod => prod.price * prod.count)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
      .toFixed(2)
  }

  const getAvg = async () => {
    const products = await productsApi.get()
    const totalPrice = products
      .map(prod => prod.price * prod.count)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
    const totalNumber = products
      .map(prod => prod.count)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
    return (totalPrice / totalNumber).toFixed(2)
  }

  const getLessThan = async ({ count }) => {
    const products = await productsApi.get()
    return products.filter(prod => prod.count < count)
  }

  return {
    getSum,
    getAvg,
    getLessThan
  }
}

module.exports = ProductsServiceFactory
