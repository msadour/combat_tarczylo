import React, { Component } from "react";
import ReactDom from "react-dom";

class Description extends Component {

    constructor() {
        super()
        this.state = {
            club: {}
        }
    }

    componentDidMount(){
        fetch('/api_tct/club/')
        .then(response => response.json())
        .then((data) => {
            this.setState({club: data});
        })
        .catch(err => {
        console.log(res);
            alert('error');
        });
    }

    render() {
        const list_time_table = []

        if(this.state.club.time_table != null){
            this.state.club.time_table.forEach(time_table => {
                list_time_table.push(<p key={time_table.id}> to {time_table.time_table_str} </p>)
            })
        }

        return (
            <table border="1">
                <tbody>
                    <tr >
                        <th>
                            <h1>{this.state.club.name}</h1>
                            <p> {this.state.club.description} </p>
                        </th>

                        <th>
                            photos
                        </th>
                    </tr>

                    <tr >
                        <th>
                            <h2>Where we are?</h2>
                           <p> {this.state.club.street} {this.state.club.street} {this.state.club.zip_code} {this.state.club.city} {this.state.club.country} </p>
                        </th>

                        <th>
                            For the year of {new Date().getFullYear()} we are open in :
                            {list_time_table}


                        </th>

                    </tr>
                </tbody>

            </table>
        )
    }
}

export default Description