import { useEffect, useState } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'

function App() {

  const initialCart = () => {
    const lsCart = localStorage.getItem('cart');
    return lsCart ? JSON.parse(lsCart): []
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MAX_ITEMS = 4
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    
    const itemExists = cart.findIndex(product => product.id === item.id);
    
    if (itemExists >= 0) {
      if (cart[itemExists].qty >= MAX_ITEMS) return;
      let finalCart = [...cart]
      finalCart[itemExists].qty++
      setCart(finalCart)
    } else {
      item.qty = 1;
      setCart([...cart, item])
    }

  }

  function increaseProductQuantity(id) {
    const updatedCart = cart.map(product => {
      if (product.id === id && product.qty < MAX_ITEMS) {
        return { ...product, qty: product.qty + 1}
      }
      return product
    })
    setCart(updatedCart)
  }

  function subtractToCart(id) {
    const itemExists = cart.findIndex(product => product.id === id);
    
    if (itemExists >= 0 && cart[itemExists].qty > MIN_ITEMS) {
      let finalCart = [...cart]
      finalCart[itemExists].qty--
      setCart(finalCart)
    }
  
  }
  

  function removeFromCart(id) {
    console.log('deletings '+id)
    setCart(cart.filter(product => product.id !== id))
  }

  function emptyCart() {
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseProductQuantity={increaseProductQuantity}
        subtractToCart={subtractToCart}
        emptyCart={emptyCart}
      />

      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar
                  key={guitar.id}
                  product={guitar}
                  addToCart={addToCart}
                />
              ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
