import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Handicrafts from './components/handicrafts/Handicrafts';
import Handicraft_item from './components/handicraft_item/Handicraft_item';
import Cart from './components/cart/Cart';
import Checkout_Flow from './components/checkout_flow/Checkout_Flow';
import Order_Confirmation from './components/order_confirmation/Order_Confirmation';
import Order_Detail from './components/order_detail/Order_Detail';
import My_Account from './components/my_account/My_Account';
import My_Orders from './components/my_orders/My_Orders';
import Wishlist from './components/wishlist/Wishlist';

/* --------------Styles are defined and declared---------------- */

const { Content } = Layout;

/* --------------Styles Ends----------------*/

/* --------------component App Starts-------------- */

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* -----------all return statement is defined under router from react-router-dom------------*/}
      <Router>
        <Header />
        <Content>
          <div>
            {/* -------------all routes are defined under the switch from react-router-dom------------*/}
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} title="Home | ASHandicraft" />} />
              <Route exact path="/handicrafts" render={(props) => <Handicrafts {...props} title="Handicrafts | ASHandicraft" />} />
              <Route exact path="/handicraft_item/:productId" render={(props) => <Handicraft_item {...props} title="Handicraft_item | ASHandicraft" />} />
              <Route exact path="/cart" render={(props) => <Cart {...props} title="Cart | ASHandicraft" />} />
              <Route exact path="/checkout_flow" render={(props) => <Checkout_Flow {...props} title="Checkout_Flow | ASHandicraft" />} />
              <Route exact path="/order_confirmation" render={(props) => <Order_Confirmation {...props} title="Order_Confirmation | ASHandicraft" />} />
              <Route exact path="/order_detail" render={(props) => <Order_Detail {...props} title="Order_Detail | ASHandicraft" />} />
              <Route exact path="/my_account" render={(props) => <My_Account {...props} title="My_Account | ASHandicraft" />} />
              <Route exact path="/my_orders" render={(props) => <My_Orders {...props} title="My_Orders | ASHandicraft" />} />
              <Route exact path="/wishlist" render={(props) => <Wishlist {...props} title="Wishlist | ASHandicraft" />} />
              {/* <Route path="*" render={(props) => <Error_page {...props} title="Error 404 | Krishirishi" />} /> */}
            </Switch>
          </div>
        </Content>
        <Footer />
      </Router>
    </Layout>
  );
};

/* --------------component App Ends-------------- */

/* -------------component App exported------------------*/

export default App;
