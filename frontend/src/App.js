import './App.css';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import LandingPage from './screens/LandingPage/LandingPage.js';
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from './screens/MyNotes/MyNotes.js';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main >
        <Route exact path="/" component={LandingPage}/>
        <Route path="/mynotes" component={MyNotes}/>
       </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
