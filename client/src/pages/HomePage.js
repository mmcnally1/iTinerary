import Map from '../components/Map';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import NavBar from '../components/NavBar';

export default function HomePage() {
  const activeUser = sessionStorage.getItem('active user');

  const markers = [{ position: [32.715, -117.161], content: <><b>Wecome to San Diego </b><br /> Sister City to Tijuana, Mexico; Yokohama, Japan; and Tema, Ghana </> },
  { position: [41.882, -87.623], content: <><b>Welcome to Chicago</b> <br /> Home of the Twinkie </> }]

  navbarProps = {
      activeUser: activeUser
  }

  function SignIn(){
      return (
          <div>
            <LoginForm
                className="login"/>
            <SignUpForm
                className="signup"/>
          </div>
      )
  }

  return (
      <>
      <NavBar {...navbarProps} />
      <h1>Welcome to iTinerary!</h1>
      <Map markers={markers} />
      {(!activeUser || activeUser === '')
      ? <SignIn />
      : <br/>}
    </>
  )
}
