import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

import {OPTION_TEMPLATE_LEVEL} from "../../layout/ChoiceSelect";

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
        var errors = [];

        for (const [ key, value ] of Object.entries(this.state)) {
            if (value == ''){
                errors.push(key);
            }
        }
        if (errors.length == 0){
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
        } else {
            alert('All fields are mandatory !');
        }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        const{username, email, password, password_again} = this.state

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5 ">
                  <h2 className="text-center text_jl">Do you want join us?</h2>


                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label className="text_jl">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label className="text_jl">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password_again"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                   <div className="form-group">
                      <label className="text_jl">Postal code</label>
                      <input
                        type="text"
                        className="form-control"
                        name="postal_code"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label className="text_jl">First name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                   <div className="form-group">
                      <label className="text_jl">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                   <div className="form-group">
                      <label className="text_jl">Street</label>
                      <input
                        type="text"
                        className="form-control"
                        name="street"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                   <div className="form-group">
                      <label className="text_jl">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                   <div className="form-group">
                      <label className="text_jl">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                   <div className="form-group">
                      <label className="text_jl">Insurance name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="insurance_name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                   <div className="form-group">
                      <label className="text_jl">Insurance number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="insurance_number"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Birthday</label>
                      <input
                            type="date"
                            name="birthday"
                            className="form-control"
                            placeholder="DD/MM/YYYY"
                            onChange={e => this.onChange(e)}
                        />
                    </div>

                   <div className="form-group">
                      <p className="text_jl">Sex:</p>

                      <input type="radio" name="sex" value="male" onChange={e => this.onChange(e)} />
                      <label className="text_jl">Male</label><br />
                      <input type="radio" name="sex" value="female" onChange={e => this.onChange(e)} />
                      <label className="text_jl">Female</label><br />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Level</label>
                      <select
                          name="level"
                          className="form-control"
                          type="select"
                          onChange={e => this.onChange(e)}
                      >
                        {OPTION_TEMPLATE_LEVEL}
                      </select>
                    </div>

                    <div className="form-group">
                      <button className="button" type="submit" className="button">
                        <label className="text_jl_button">Register</label>
                      </button>
                    </div>

                  </form>
                </div>
                <br /> <br /> <br /> <br /> <br />
          </div>
        )
    }
}

export default withRouter(Subscription);