import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';


class SignIn extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit = event => {
    event.preventDefault();

    this.setState({ email: '', password: ''})
  }

  onChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value })
  }
  // STUDY THIS SYNTAX 😳👆

  render() {
    return (
      <div className='sign-in'>
        <h2 className='title'>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.onSubmit}>
          <FormInput name='email' type='email' value={this.state.email} required onChange={this.onChange} label='email'/>

          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            required
            onChange={this.onChange}
            label='password'
          />
          <div className='buttons'>
            <CustomButton type='submit'> SIGN IN </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              SIGN IN with google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
