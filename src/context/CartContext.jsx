import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bt-cart') || '[]')
    } catch { return [] }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('bt-cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, size) => {
    setItems(prev => {
      const key = `${product.id}-${size}`
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, {
        key,
        id: product.id,
        handle: product.handle,
        name: product.name,
        sub: product.sub,
        img: product.img,
        price: product.price,
        priceNum: parseFloat(product.price.replace('€', '').replace(',', '.').trim()),
        size,
        qty: 1,
        variantId: product.variantIds?.[size],
      }]
    })
    setIsOpen(true)
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))

  const updateQty = (key, qty) => {
    if (qty <= 0) return removeItem(key)
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.priceNum * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      isOpen, setIsOpen, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
