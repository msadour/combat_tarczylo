import React, { Component } from "react";
import ReactDom from "react-dom";

class LookingFor extends Component {

    constructor(){
        super();
        this.state = {
            result: [],
            criteria: "book",
            value: ""
        }
        this.search.bind(this)
    }

    search() {
        const field = 'name'
        if (this.state.criteria == 'article'){
            field = 'title'
        }
        alert('/api_tct/' + this.state.criteria + '?' + field + "=" + this.state.value)
        fetch('/api_tct/' + this.state.criteria + '?' + field + "=" + this.state.value)
        .then(response => response.json())
        .then((data) => {
            alert('work');
            this.setState({ result: data })
        })
        .catch(err => {
            console.log(err)
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        return (
            <div>
                <h1>looking</h1>

                <form onSubmit={e => this.search()}>
                  <input
                    placeholder="Name, title...."
                    name="value"
                    onChange={e => this.onChange(e)}
                  />

                 <select
                      name="criteria"
                      onChange={e => this.onChange(e)}
                  >
                    <option value="book">Book</option>
                    <option value="internship">Internships</option>
                    <option value="course">Courses</option>
                  </select>

                  <button type="submit" value="Submit"> Search </button>
                </form>
                <br />

            </div>
        )
    }
}

export default LookingFor