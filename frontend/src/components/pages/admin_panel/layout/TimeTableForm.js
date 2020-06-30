import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

class TimeTableForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            time_table: [],
        }

        this.onChange.bind(this)
        this.onSubmit.bind(this)
    }

    onSubmit = e => {
        e.preventDefault();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div>
                <form onSubmit={e => this.onSubmit(e)}>
                  <label className="text_jl"> Day: </label>
                  <input
                        type="text"
                        name="day"
                        onChange={e => this.onChange(e)}
                        placeholder={this.props.value}
                   />

                   <label className="text_jl"> From (hour): </label>
                    <input
                        type="text"
                        name="from_hour"
                        onChange={e => this.onChange(e)}
                        placeholder={this.props.value}
                   />

                   <label className="text_jl">To (hour): </label>
                    <input
                        type="text"
                        name="to_hour"
                        onChange={e => this.onChange(e)}
                        placeholder={this.props.value}
                   />
                  <button type="submit" value="Submit" className="button"> <label className="text_jl_button">Update</label> </button>
                </form>
                <br />
            </div>
        )
    }
}

export default TimeTableForm