import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

import header from "../../../../header";
import {OPTION_TEMPLATE_LEVEL, OPTION_TEMPLATES_TRAINING_OPEN} from "../../../../layout/ChoiceSelect";

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
                  <h2 className="text-center text_jl">Create an internship</h2>


                  <form onSubmit={e => this.onSubmit(e)}>
                    <div className="form-group">
                      <label className="text_jl">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Description</label>
                      <textarea
                        rows="5"
                        type="text"
                        className="form-control"
                        name="description"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Place</label>
                      <input
                        type="text"
                        className="form-control"
                        name="place"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Category</label>
                      <select
                        type="text"
                        className="form-control"
                        name="category"
                        onChange={e => this.onChange(e)}
                      >
                        {OPTION_TEMPLATES_TRAINING_OPEN}
                      </select>
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
                      <label className="text_jl">Instructor</label>

                      <select
                          name="instructor"
                          type="select"
                          className="form-control"
                          onChange={e => this.onChange(e)}
                      >
                        {optionTemplate}
                      </select>
                    </div>


                    <div className="form-group">
                      <label className="text_jl">Time table</label>
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
                                      <button className="button" type="button" onClick={() => this.handleRemove(index)}>
                                        <label className="text_jl_button">Remove</label>
                                      </button>
                                </div>
                            )
                        })
                      }

                      <button className="button" onClick={(e) => this.addTimeTable(e)}>
                        <label className="text_jl_button">Add time table</label>
                      </button>
                    </div>


                    <div className="form-group">
                      <label className="text_jl">Date begin</label>
                      <input
                            type="date"
                            name="date_begin"
                            placeholder="DD/MM/YYYY"
                            onChange={e => this.onChange(e)}
                        />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Date end</label>
                      <input
                        type="date"
                        name="date_end"
                        placeholder="DD/MM/YYYY"
                        onChange={e => this.onChange(e)}
                        value={undefined}
                    />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="price"
                        onChange={e => this.onChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="text_jl">Theme</label>
                      <input
                        type="text"
                        className="form-control"
                        name="theme"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <button className="button" type="submit">
                        <label className="text_jl_button">Create</label>
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default withRouter(InternshipCreateForm)