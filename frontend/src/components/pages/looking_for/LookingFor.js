import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import Result from "./Result.js"

class LookingFor extends Component {

    constructor(){
        super();
        this.state = {
            result_search: [],
            value: "",
            criteria: "book",
        }
        this.search.bind(this)
    }

    search(e) {
        e.preventDefault();
        const url = '/api_tct/' + this.state.criteria + '?search=' + this.state.value
        const header = localStorage.getItem('token') == null ? {} : { 'Authorization': 'Token ' + localStorage.getItem('token')}
        var list_component_result = []
        fetch(url, {
            method: "GET",
            headers: header,
        })
        .then(response => response.json())
        .then((data) => {
            if (data.length == 0 || this.state.value == ""){
                list_component_result.push(<div key={1}>Nothing found</div>)
            } else {
                data.forEach(result => {
                    list_component_result.push(
                        <div key={result.id}>
                           <Result result={result} criteria={this.state.criteria}/>
                        </div>
                    )
                })
            }
            this.setState({result_search: list_component_result})

        })
        .catch(err => {
            console.log(err)
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        return (
            <div>
                <br />
                <form onSubmit={e => this.search(e)}>
                    <table border="1" style={{width: '90%'}}>

                        <tr>
                            <th>
                                  <input
                                    placeholder="Name, title...."
                                    name="value"
                                    style={{width: '40%'}}
                                    onChange={e => this.onChange(e)}
                                  />

                             <select
                                  name="criteria"
                                  id="criteria"
                                  onChange={e => this.onChange(e)}
                              >
                                <option value="book">Book</option>
                                <option value="internship">Internships</option>
                                <option value="course">Courses</option>
                                {localStorage.getItem('token') !== null ? (<option value="article">Article</option>) : (<option hidden />)}
                              </select>
                              <button type="submit" value="Submit"> Search </button>

                            </th>
                        </tr>

                        <tr>
                            <th> {this.state.result_search} </th>
                        </tr>

                    </table>
                </form>
                <br />


            </div>
        )
    }
}

export default LookingFor