import React, { Component } from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signature:"",
      message:"",
      data:undefined
    }
    this.change_signature = this.change_signature.bind(this);
    this.change_message = this.change_message.bind(this);
    this.submit = this.submit.bind(this);
    this.renderData = this.renderData.bind(this);
  }
  async componentDidMount()
  {
    try
    {
    await fetch("https://lkt-back-end.herokuapp.com/guest_book/api/signature")
    .then(response => response.json()
    .then(data => this.setState({data:data})));
    }
    catch(err)
    {
      throw(err);
    }
  }
  change_signature(e){
    this.setState({signature:e.target.value});
  }
  change_message(e){
    this.setState({message:e.target.value});
  }
  async submit(){
    await fetch('https://lkt-back-end.herokuapp.com/guest_book/api/signature',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signature_of_guest: this.state.signature,
          message_of_guest: this.state.message,
          Time: new Date()
        })
      }
    );
    try
    {
    await fetch("https://lkt-back-end.herokuapp.com/guest_book/api/signature")
    .then(response => response.json()
    .then(data => this.setState({data:data})));
    }
    catch(err)
    {
      throw(err);
    }
    alert("Sent data successfully");
  }
  renderData()
  {
    let data = this.state.data.slice(); //If you don't have the slice function, it will return a reference.
    data.reverse();
    const all_data = data.map(obj => {
      let time = obj.createdAt;
      time = new Date(time);
      return(
        <div key = {obj._id}>
        <span>Time: {time.getHours() + "h " + time.getMinutes() + "m " + time.getSeconds() + "s " + time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear()}</span>
        <br/>
        <span>Name: {obj.Guest_Signature}</span>
        <div>
        Message: {obj.Message}
        </div>
        <br/>
        <br/>
        </div>
      );
    });
    return all_data;
  }
  render(){
    return(
      (this.state.data)
      ?
      (
      <div className = "all float-up">
        <div className = "a_half2">
          <h1>Recent message</h1>
          {this.renderData()}
        </div>
        <div className = "a_half">
          <button className = "submit" onClick = {this.submit}>Send</button>
          <h1>Your name</h1>
          <input name = "signature" className = "name" onChange = {this.change_signature}></input>
          <h1>Message</h1>
          <textarea name = "message" className = "message" onChange = {this.change_message}></textarea>
        </div>
      </div>
      )
      :
      (
        <div className = "all">
        <div className = "a_half2">
          <h1>Recent message</h1>
          <div>Loading...</div>
        </div>
        <div className = "a_half">
          <button className = "submit" onClick = {this.submit}>Send</button>
          <h1>Your name</h1>
          <input name = "signature" className = "name" onChange = {this.change_signature}></input>
          <h1>Message</h1>
          <textarea name = "message" className = "message" onChange = {this.change_message}></textarea>
        </div>
        </div>
      )
    );
  }
}
export default App;
