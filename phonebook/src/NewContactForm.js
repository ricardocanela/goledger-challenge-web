import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './App.css';

class NewContactForm extends Component {

    constructor() {
        super();

        this.state={
            name:"",
            phone:"",
            age:"",
            company:"",
            email:""
        }

        this.handleNameInputChange=(event)=>{
            this.setState({
                name:event.target.value
            })
        }

        this.handlePhoneInputChange=(event)=>{
            this.setState({
                phone:event.target.value
            })
        }

        this.handleAgeInputChange=(event)=>{
            this.setState({
                age:event.target.value
            })
        }

        this.handleCompanyInputChange=(event)=>{
            this.setState({
                company:event.target.value
            })
        }

        this.handleEmailInputChange=(event)=>{
            this.setState({
                email:event.target.value
            })
        }

        this.addContact=()=>{

            axios.post('http://ec2-100-27-2-255.compute-1.amazonaws.com/api/create', {
                "@assetType": "contact",
                "name": this.state.name,
                "phone": this.state.phone,
                "company": this.state.company,
                "email": this.state.email,
                "age": parseInt(this.state.age)
              })
              .then(response => {
                console.log(response)
                this.props.fetchContacts()
              })
              .catch(error => {
                console.log(error);
              })
        }


    }

    render() {
      
        return (
            <div className="container">
                <form className="form">
                    <TextField className="textField" label="Name" onChange={this.handleNameInputChange} value={this.state.name}/>
                    <TextField className="textField" label="Phone" onChange={this.handlePhoneInputChange} value={this.state.phone}/>
                    <TextField className="textField" label="Email" onChange={this.handleEmailInputChange} value={this.state.email}/>
                    <TextField className="textField" label="Company" onChange={this.handleCompanyInputChange} value={this.state.company}/>
                    <TextField className="textField" label="Age" onChange={this.handleAgeInputChange} value={this.state.age}/>
                    <Button variant="contained" color="primary" onClick={this.addContact}>Add Contact</Button>
                </form>
            </div>
        )
    }
  
}

export default NewContactForm;
