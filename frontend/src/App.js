import './App.css';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import LandingPage from './screens/LandingPage/LandingPage.js';
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from './screens/MyNotes/MyNotes.js';
import LoginScreen from './screens/LoginScreen/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.js';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main >
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={LoginScreen}/>
        <Route exact path="/register" component={RegisterScreen}/>
        <Route path="/mynotes" component={MyNotes}/>
       </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
