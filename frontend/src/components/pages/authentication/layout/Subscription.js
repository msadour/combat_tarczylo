import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

class Subscription extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_again: "",
            postal_code: "",
            password_again: "",
            first_name: "",
            last_name: "",
            city: "",
            street: "",
            country: "",
            phone: "",
            insurance_name: "",
            insurance_number: "",
            birthday: "",
            sex: "",
            level: "",
        }

        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    onSubmit = e => {
        e.preventDefault();
        fetch('/api_tct/member/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
                "password_again": this.state.password_again,
                "postal_code": this.state.postal_code,
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "city": this.state.city,
                "street": this.state.street,
                "country": this.state.country,
                "phone": this.state.phone,
                "insurance_name": this.state.insurance_name,
                "insurance_number": this.state.insurance_number,
                "birthday": this.state.birthday,
                "sex": this.state.sex,
                "level": this.state.level
            })
        })
        .then(response => response.json())
        .then((data) => {
            alert("Your account is created. Log in if you want have an access to your account.")
        })
        .catch(err => {
            console.log(err)
        })
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        const{username, email, password, password_again} = this.state

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center">Do you want join us?</h2>


                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password_again"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                   <div className="form-group">
                      <label>Postal code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="postal_code"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label>First name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                   <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                   <div className="form-group">
                      <label>Street</label>
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                   <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                   <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                   <div className="form-group">
                      <label>Insurance name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="insurance_name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                   <div className="form-group">
                      <label>Insurance number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="insurance_number"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                   <div className="form-group">
                      <label>Birthday</label>
                      <input
                        type="text"
                        className="form-control"
                        name="birthday"
                        placeholder="DD/MM/YYYY"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                   <div className="form-group">
                      <p>Sex:</p>

                      <input type="radio" name="sex" value="male" onChange={e => this.onChange(e)} />
                      <label >Male</label><br />
                      <input type="radio" name="sex" value="female" onChange={e => this.onChange(e)} />
                      <label >Female</label><br />
                    </div>


                   <div className="form-group">
                      <label>Level</label>
                      <input
                        type="text"
                        className="form-control"
                        name="level"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Register
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default withRouter(Subscription);