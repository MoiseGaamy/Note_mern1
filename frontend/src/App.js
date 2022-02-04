import './App.css';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import LandingPage from './screens/LandingPage/LandingPage.js';
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from './screens/MyNotes/MyNotes.js';
import LoginScreen from './screens/LoginScreen/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.js';
import CreateNote from './screens/createNote/CreateNote.js';
import SingleNote from './screens/sigleNote/SingleNote.js';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.js';

function App()
{
  const [search, setSearch] = useState("")
  return (
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main >
        <Route exact path="/" component={LandingPage}/>
        <Route  path="/login" component={LoginScreen}/>
        <Route  path="/profile" component={ProfileScreen}/>
        <Route  path="/register" component={RegisterScreen}/>
        <Route  path="/createnote" component={CreateNote}/>
        <Route  path="/note/:id" component={SingleNote}/>
        <Route path="/mynotes" component={() => <MyNotes search={search} />}/>
       </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
