import React from 'react'
import { Link } from 'gatsby'
import { navigateTo } from "gatsby-link";
import sendDownloadEmail from '../email/Email'

//encode to URI format
const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class SuccessModal extends React.Component {
  state = {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    //send the email first
    const track = this.props.track;
    console.log(this.state.email)
    const toEmail = this.state.email;

    sendDownloadEmail(track, toEmail)

    //save it ot netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render (){
    const price = this.props.track.pricing.price;
    const title = this.props.track.title;

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Thank you for  <strong>${price}</strong> </p>
            <button className="delete" aria-label="close" onClick={this.props.onClose}></button>
          </header>
          <form name="email" method="POST" action="/thanks" onSubmit={this.handleSubmit} data-netlify="true" >
            <input type="hidden" name="form-name" value="email" />
            <section className="modal-card-body has-text-centered">
              <h1 class="title is-size-5 has-text-weight-bold is-bold-light">Please enter email</h1>
              <p>
                <label>Your Email: <input class="input" type="email" onChange={this.handleChange} name="email" /></label>
              </p>
              <br/>
              <p class="is-size-7">When you enter your name and email, we’ll immediately send the Extended Pack to your email inbox. We’ll also send you our weekly afro extended  series emails. We value your privacy.</p>
              <br/>
              <button type="submit" className="button">Save changes</button>
            </section>

          </form>
        </div>
      </div>)
    }
}
