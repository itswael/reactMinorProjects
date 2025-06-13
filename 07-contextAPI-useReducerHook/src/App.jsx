import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {

  return (
    <CartContextProvider value={ctxValue}>
      <Header/>
      <Shop/>
    </CartContextProvider>
  );
}

export default App;
