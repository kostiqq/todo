/* eslint-disable no-unused-vars */
import './App.css';
import { Component } from 'react';
import firebase from 'firebase';
import { ReactComponent as Logo } from './img/logo.svg';
import { ReactComponent as LogoGoogle } from './img/Google_Logo.svg';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Calendar from './components/Calendar';
import cn from 'classnames';

export default class App extends Component{

  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      hasAccount: false,
    }
  }

  componentDidMount() {
    const db = firebase.database();
    console.log(db);
  }
  handleChange = ({target: {value, id}}) => {
    this.setState({
      [id]: value,
    })
  };
  state = {
    date: null
  };
  handleDateChange = date => this.setState({date});
  GoogleLogin = () => {
    var proveder = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(proveder).then(
      function () {
        window.location="index.html";
      }).catch(function(error){
        var errorMessage = error.errorMessage;
        alert(errorMessage);
      })
  };
 
  signInAccount = () => {
    const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({hasAccount: true});
      })
      .catch(error => alert(error));
  };
  
  render() {
    const [show, setSate] = useState(false);
    const ref = useRef();
  
    useOutsideClick(ref, () => {
      if (show) setSate(false);
    });
  
    const toggleState = () => {
      setSate(!show);
      console.log(show);
    };
    const {date} = this.state;
    const { hasAccount } = this.state;
    return(hasAccount ? (<div className='mainPageToDo'> {date && <p>Выбранная дата: {date.toLocaleDateString()}</p>}
      <Calendar
        onChange = {this.handleDateChange}
      />
      <div className="blockList">
        <div>
          <div className="blockWithBackAndSave" ref={ref} className={cn("block", { "is-open": show })}>
            <div>
              <button className="buttonBackToDo">&#9668;</button>
              <input className="NameOfTask"></input>
              <button className="buttonSaveToDo">&#10004;</button>
            </div>
          <textarea className="descrOfTask"></textarea>
          </div>
        </div>
      </div>
      <button onClick={toggleState}>+</button>
    </div>) : (<div id="loginWindow"><Logo id="logo"/><div id="loginPageHeader">To Do List</div>
    <div className="signUpBlock">
      <input 
      type="email" 
      id="email" 
      className="inputForEnterOrRegistration" 
      placeholder="&#9993; Enter your Emal"  
      onChange={this.handleChange}/>
      <input 
      type="password" 
      id="password" 
      className="inputForEnterOrRegistration" 
      placeholder="&#9919; Enter your password"
      onChange={this.handleChange}/>
      <button 
      className="buttonForEnterOrRegistration"
      onClick = {this.signInAccount}>Sign in</button>
    </div>
    <div id="blockWithGoogleSignAndRegistration">
      <div id="textForGoogleSign">Sign in with &nbsp;<button id="buttonForEnterGoogle" onClick={this.GoogleLogin}><LogoGoogle id="googleLogo"/> Google</button></div>
      <div id="textBlockOnMainPage">Don't have an account yet? <Link id="linkForRegistration" to="/registration">Register now</Link>
      </div>
    </div>
    </div>))
  }
}