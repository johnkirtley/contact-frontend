

const ContactCount = (props) => {

    return (
        <div>
            <h1>Contact List</h1>
            <p>{props.info.length} contacts</p>
        </div>
    )
}

export default ContactCount;