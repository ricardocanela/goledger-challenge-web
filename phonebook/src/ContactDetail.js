import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';

import './App.css';

class ContactDetail extends Component {


  render() {
      
  return (
        <div className="form">
            <TextField className="textField" label="Name" InputProps={{readOnly: true}} value={this.props.contact.name}/>
            <TextField className="textField" label="Phone" InputProps={{readOnly: true}} value={this.props.contact.phone}/>
            <TextField className="textField" label="Email" InputProps={{readOnly: true}} value={this.props.contact.email}/>
            <TextField className="textField" label="Company" InputProps={{readOnly: true}} value={this.props.contact.company}/>
            <TextField className="textField" label="Age" InputProps={{readOnly: true}} value={this.props.contact.age}/>
        </div>
  );

  }
  
}

export default ContactDetail;
