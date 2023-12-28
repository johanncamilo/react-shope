import { createContext, useState, useEffect } from 'react'
import { apiUrl } from '../api'

/**
 * exporta el @createContext para ser consumido por componentes hijos usando @useContext
 */
export const ShoppingCartContext = createContext()

/**
 * exporta el @Provider para instanciarlo como wrapper en componentes padre
 */
export const ShoppingCartProvider = ({ children }) => {
  // Shopping Cart Counter
  const [counter, setCounter] = useState(0)

  // Toggle Product Detail
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const toggleProductDetail = () => setIsProductDetailOpen(!isProductDetailOpen)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // Toggle Checkout Side Menu
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const toggleCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(!isCheckoutSideMenuOpen)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  // Show Product Detail
  const [productToShow, setProductToShow] = useState({})

  // Shopping Cart - Add products to cart
  const [shoppingCart, setShoppingCart] = useState([])

  // Shopping Cart - Order
  const [order, setOrder] = useState([])

  // Get Products
  const [items, setItems] = useState(null)
  console.log('💀 ~ file: index.jsx:39 ~ ShoppingCartProvider ~ items ->', items)

  // Filter Products by searchValue
  const [filteredItems, setFilteredItems] = useState(null)

  // Get searchValue
  const [searchValue, setSearchValue] = useState(null)

  useEffect(() => {
    fetch(apiUrl)
      .then((respone) => respone.json())
      .then(setItems)
      .catch(console.error)
  }, [])

  const filteredItemsByValue = (items, searchValue) => {
    return items?.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
  }

  useEffect(() => {
    if (searchValue) setFilteredItems(filteredItemsByValue(items, searchValue))
  }, [items, searchValue])

  return (
    <ShoppingCartContext.Provider
      value={{
        counter,
        setCounter,
        toggleProductDetail,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        toggleCheckoutSideMenu,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        isCheckoutSideMenuOpen,
        productToShow,
        setProductToShow,
        shoppingCart,
        setShoppingCart,
        order,
        setOrder,
        items,
        setItems,
        searchValue,
        setSearchValue,
        filteredItems,
        setFilteredItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
