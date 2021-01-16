import {Table} from 'reactstrap'

const ContactTable = (props) => {

    return (
        <Table style={{width: '75%', margin: 'auto'}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
        {props.info.length > 0 ? props.info.map((contact, idx) => (
          <tr>
            <th scope="row">{idx + 1}</th>
            <td>{contact.name}</td>
            <td>{contact.phone}</td>
          </tr>
        )) : ''}
        </tbody>
        </Table>
    )
}

export default ContactTable;