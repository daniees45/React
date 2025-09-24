import logo from './logo.svg';
import './css/styles.css';
import {  Route,Routes } from 'react-router-dom';
import InsertContact from './funtctions/InsertContact';
import Header from './funtctions/Header';
import ViewContacts from './funtctions/ViewContact';
function App() {
  return (
    <>
     
      <Header />
      <Routes>
        <Route path="/" element={<InsertContact />} />
        <Route path="/view" element={<ViewContacts />} />
      </Routes>
     
    </>
  );
}

export default App;
