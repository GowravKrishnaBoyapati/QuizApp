import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { SignUpLink } from "./SignUp";
import { withRouter } from "react-router-dom";
import Zoom from 'react-reveal'
import { PasswordForgetLink } from "./PasswordForget";
import { auth, db } from "../firebase";
import * as routes from "../constants/routes";
import './SignIn.css'
const SignInPage = ({ history }) =>  (
    <Zoom bottom>
    <div className="div-flex signinBox" style={{margin:'auto',padding:'100px'}}>
      <div>
        <h1 className="centered">Sign On</h1>
        {/* <img src={logo} className="App-logo" alt="My logo" /> */}

        <SignInForm history={history} /> 
        <SignUpLink />
        <PasswordForgetLink />
      </div>
    </div>
    </Zoom>
  );

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  showingAlert: false
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});


class SignInForm extends Component {
  state = { ...INITIAL_STATE };

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ ...INITIAL_STATE });
        //console.log(user.user)
        db.doGetAnUnser(user.user.uid).then(res => {
          //console.log(res.data())
          if (res.data().role==undefined)
            history.push(routes.HOME);
          else{
            history.push(routes.FACULTY);
          }
        }).catch(error => {
          //console.log(error);
          this.setState(byPropKey("error", error));
          this.timer(); //show alert message for some seconds
        });
      })
      .catch(error => {
        //console.log(error);
        this.setState(byPropKey("error", error));
        this.timer(); //defined below
      });

    event.preventDefault();
  };

  timer = () => {
    this.setState({
      showingAlert: true
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    }, 4000);
  };

  render() {
    const { email, password, error, showingAlert } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div>
        {showingAlert && (
          <Alert color="danger"  onLoad={this.timer}>
            {"Warning: " + error.message}
          </Alert>
        )}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="user@gmail.com"
              style={{borderRadius:'20px',backgroundFilter:'blur(5px)',color:'white',background:'#e1ffe11a'}}
              value={email}
              onChange={event =>
                this.setState(byPropKey("email", event.target.value))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="pass-test"
              style={{borderRadius:'20px',backgroundFilter:'blur(5px)',color:'white',background:'#e1ffe11a'}}
              value={password}
              onChange={event =>
                this.setState(byPropKey("password", event.target.value))
              }
            />
          </FormGroup>

          <div className="text-center">
            <Button disabled={isInvalid} type="submit" style={{borderRadius:'15px'}}>
              Sign In
            </Button>
          </div>
        </Form>

        <hr />

        {/* <FacebookLoginButton onClick={this.facebookLogin} /> */}
        {/* <button onClick={this.facebookLogin}>Login with Facebook</button> */}
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };

{
  /* <form onSubmit={this.onSubmit} className="center-form">
          <input
            value={email}
            onChange={event =>
              this.setState(byPropKey("email", event.target.value))
            }
            type="text"
            placeholder="Email Address"
          />
          <input
            value={password}
            onChange={event =>
              this.setState(byPropKey("password", event.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          {error && <p>{error.message}</p>}
        </form> */
}