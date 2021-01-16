import {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input, Table} from 'reactstrap'
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = () => {
  const [info, setInfo] = useState([])
  const [user, setUser] = useState({
    name: '',
    phone: ''
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })


    console.log('user', user)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const num = user.phone

    for (let i = 0; i < info.length; i++) {
      if (num === info[i].phone) {
        alert('Number Already Exists. Please try again.')
        return
      }
    }

    const newUser = {
      name: user.name,
      phone: user.phone
    }

    axios
    .post(`https://docker-test-john.herokuapp.com/user`, newUser)
    .then(res => {
      console.log('User Added', res)
    })
    .catch(err => console.log(err))

    
      setInfo(prevInfo => [...prevInfo, user])

    setUser({
      name: '',
      phone: ''
    })

    
  }

  useEffect(() => {
    axios
    .get('https://docker-test-john.herokuapp.com/user')
    .then(res => {
      console.log(res.data.message)
      setInfo(res.data.message)
    })
    .catch(err => console.log(err))
  }, [])



  return (
    <div className="App">
      <h1>Contact List</h1>
      <div style={{width: '25%', margin: 'auto'}}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input required type="text" name="name" value={user.name} onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input required type="text" name="phone" value={user.phone} onChange={handleChange}/>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
      <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
      {info.length > 0 ? info.map((contact, idx) => (
        <tr>
          <th scope="row">{idx + 1}</th>
          <td>{contact.name}</td>
          <td>{contact.phone}</td>
        </tr>
      )) : ''}
      </tbody>
      </Table>
    </div>
  );
}

export default App;
