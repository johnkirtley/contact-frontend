import {useState, useEffect} from 'react';
import axios from 'axios';

import ContactCount from './components/ContactCount';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const defaultState = {
  name: '',
  phone: ''
}

const App = () => {
  const [info, setInfo] = useState([])
  const [user, setUser] = useState(defaultState)

  // Gets contact list
  useEffect(() => {
    axios
    .get('http://backend-6004ac4dd7e5da3a35dc04a0.c.6001421cc73ea88e8147c139.cycle.io/user')
    .then(res => {
      setInfo(res.data.contacts)
    })
    .catch(err => console.log(err))
  }, [])



  return (
    <div className="App">
    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
      <ContactCount info={info} />
      <ContactForm info={info} setInfo={setInfo} user={user} setUser={setUser}/>
    </div>
      <ContactTable info={info} />
    </div>
  );
}

export default App;
