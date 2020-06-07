import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import HomePage from './pages/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component.jsx';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>
// );

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      // createUserProfileDocument(user);
      // this.setState({ currentUser: user });

      // console.log(user);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({

              id: snapShot.id,
              ...snapShot.data()

          }, () => {
              // console.log(this.state);
            }
          );
        });
      }
      else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }

}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// }) refactored version 👇

// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state)
// }) refactored version 👇

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
