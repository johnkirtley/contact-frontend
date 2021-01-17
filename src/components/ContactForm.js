import axios from 'axios';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap'

const ContactForm = (props) => {

    // sets form input values
    const handleChange = (e) => {
        props.setUser({
          ...props.user,
          [e.target.name]: e.target.value
        })
}


    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Checks if phone number is unique
        for (let i = 0; i < props.info.length; i++) {
          if (props.user.phone === props.info[i].phone) {
            alert('Number Already Exists. Please try again.')
            return
          }
        }
    
        const newUser = {
          name: props.user.name,
          phone: props.user.phone
        }
        
        // Adds contact to list
        axios
        .post(`https://docker-test-john.herokuapp.com/user`, newUser)
        .then(res => {
          console.log('User Added', res)
        })
        .catch(err => console.log(err))
    
        // Updates current state with new contact
        props.setInfo(prevInfo => [...prevInfo, props.user])
    
        // Resets input values
        props.setUser({
          name: '',
          phone: ''
        })
      }


    return (
        <div style={{marginTop: '4rem', marginBottom: '4rem'}}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input required type="text" name="name" value={props.user.name} onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input placeholder="xxx-xxx-xxxx" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={props.user.phone} onChange={handleChange}/>
          </FormGroup>
          <Button>Add Contact</Button>
        </Form>
      </div>
    )

}

export default ContactForm;