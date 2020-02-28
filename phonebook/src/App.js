import React, {Component} from 'react';
import axios from 'axios'

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

import NewContactForm from './NewContactForm'
import ContactDetail from './ContactDetail'
import ContactUpdate from './ContactUpdate'

import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state={
      phoneBook:[],
      contactFormType:"newContact",
      selectedContact: {},
      searchName: '',
      phoneBookSearched: []
     }

    this.seeContactDetails=(contact)=>e=>{
       this.setState({
         selectedContact: contact,
         contactFormType: "contactDetail"
       }) 

     }

    this.addContact=()=>{
      this.setState({
        contactFormType:"newContact"
      })
    }

    this.updateContact=()=>{
      this.setState({
        contactFormType:"updateContact"
      })
    }

    this.handleSearchInputChange=(event)=>{
      this.setState({
          searchName:event.target.value
      })
    }

    this.searchContact=()=>{

      this.setState({
        phoneBookSearched:[]
      })
      this.state.phoneBook
      .filter(contact => 
        contact.name.toLowerCase().includes(this.state.searchName.toLowerCase())
      )
      .map((contact) => 
          this.state.phoneBookSearched.push(contact)
      )
      this.setState({
          phoneBook:this.state.phoneBookSearched
      })
    }

    this.deleteContact=()=>{
      console.log(this.state.selectedContact.name)
      axios.delete('http://ec2-100-27-2-255.compute-1.amazonaws.com/api/delete', { data: {
        "@assetType": "contact",
        "name": this.state.selectedContact.name
        }
      })
        .then(response => {
          this.fetchContacts()
          this.setState({
            contactFormType:"newContact"
          })
        })
        .catch(error => {
          console.log(error);
        })
    }

    this.fetchContacts=()=>{
      axios.post('http://ec2-100-27-2-255.compute-1.amazonaws.com/api/search', {
        "selector": {
          "@assetType": "contact"
        }
      })
        .then(response => {
          const phoneBook = response.data.result;
          this.setState({ phoneBook })
        })
        .catch(error => {
          console.log(error);
        })
    }
  
                           
  }

  componentDidMount() {
    this.fetchContacts()
  }

  render() {
    let formType=null

    if (this.state.contactFormType === "newContact") {
      formType = <NewContactForm fetchContacts={this.fetchContacts}/>
    }

    if (this.state.contactFormType === "contactDetail") {
      formType = (
        <div>
          <ContactDetail contact={this.state.selectedContact} />
          <Button variant="contained" color="primary" onClick={this.updateContact}>Update</Button>
        </div>
      )
    }

    if (this.state.contactFormType === "updateContact") {
      formType = (
        <div>
          <ContactUpdate contact={this.state.selectedContact} fetchContacts={this.fetchContacts}/>
          <Button color="primary" onClick={this.deleteContact}>Delete</Button>
        </div>
      )
      }

      
  return (
        <div>
        <div className="header">
          <h2>The PhoneBook</h2>
          <div className="search">
            <div>
              <h2>Search:</h2>
            </div>
            <div className="searchTextField">
              <TextField  onChange={this.handleSearchInputChange} value={this.state.searchName}/>
              <IconButton onClick={this.searchContact}>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={this.fetchContacts}>
                <RefreshIcon />
              </IconButton>
            </div>
          </div>
        </div>

          <div className="App">
            <div className="phoneList">
            <List component="nav" aria-label="main mailbox folders">
            <ListItem button onClick={this.addContact}>
              <AddCircleOutlineOutlinedIcon/>
              <ListItemText primary="Add new contact"/>
            </ListItem>
              {this.state.phoneBook.map( (contact,index) =>
                <div className="contacts" key={index} >
                  <ListItem button onClick={this.seeContactDetails(contact)}>
                    <ListItemText primary={contact.name} secondary={contact.phone}/>
                  </ListItem>
                  <hr/>
                </div>
              )} 
            </List>
            </div>
            <div className="forms">
              { formType }
            </div>
            
          </div>
        </div>
  );

  }
  
}

export default App;
