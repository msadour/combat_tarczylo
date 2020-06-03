import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

import header from "../../../../header";

class InternshipCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            place: "",
            level: "",
            category: "",
            instructor: "",
            date_begin: "",
            date_end: "",
            price: "",
            theme: "",
            time_table: [],
            options_instructor: [],
        }

        this.onChange.bind(this);
        this.onSubmit.bind(this);
        this.addTimeTable.bind(this);
    }

    componentDidMount() {
        axios.get('/api_tct/instructor/', header)
        .then(res => {
            this.setState({options_instructor: res.data});
        })
        .catch(err => {
            alert('error');
        });
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post('/api_tct/internship/', { "name": this.state.name,
                                        "description": this.state.description,
                                        "place": this.state.place,
                                        "level": this.state.level,
                                        "content": this.state.content,
                                        "category": this.state.category,
                                        "instructor": this.state.instructor,
                                        "time_table": this.state.time_table,
                                        "date_begin": this.state.date_begin,
                                        "date_end": this.state.date_end,
                                        "price": this.state.price,
                                        "theme": this.state.theme,
        }, header)
        .then(res => {
            alert("Internship created.");
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        });
    }

    addTimeTable() {
        event.preventDefault();
        this.setState({time_table: [...this.state.time_table, ""]});
        return false
    }

    handleChange(e, index) {
        this.state.time_table[index] = e.target.value;
        this.setState({time_table: this.state.time_table})
    }

    handleRemove(index) {
        this.state.time_table.splice(index, 1)
        this.setState({time_table: this.state.time_table})
        return false
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        let optionTemplate = [<option key={0} value={0}></option>]

        this.state.options_instructor.forEach(instructor => {
            optionTemplate.push(<option key={instructor.id} value={instructor.id}>{instructor.full_name}</option>)
        })


        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center">Create an internship</h2>


                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <input
                        type="text"
                        className="form-control"
                        name="description"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Place</label>
                      <input
                        type="text"
                        className="form-control"
                        name="place"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        onChange={e => this.onChange(e)}
                      />
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
                      <label>Instructor</label>

                      <select
                          name="instructor"
                          type="select"
                          onChange={e => this.onChange(e)}
                      >
                        {optionTemplate}
                      </select>
                    </div>


                    <div className="form-group">
                      <label>Time table</label>
                      {
                        this.state.time_table.map((timetable, index) =>{
                            return (
                                <div key={index}>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="time_table"
                                        placeholder="Monday 10:00:00 12:30:00"
                                        value={timetable}
                                        onChange={e => this.handleChange(e, index)}
                                      />
                                      <button type="button" onClick={() => this.handleRemove(index)}>Remove</button>
                                </div>
                            )
                        })
                      }

                      <button onClick={(e) => this.addTimeTable(e)}>Add time table</button>
                    </div>


                    <div className="form-group">
                      <label>Date begin</label>
                      <input
                        type="text"
                        className="form-control"
                        name="date_begin"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Date end</label>
                      <input
                        type="text"
                        className="form-control"
                        name="date_end"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Theme</label>
                      <input
                        type="text"
                        className="form-control"
                        name="theme"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Create
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default withRouter(InternshipCreateForm)