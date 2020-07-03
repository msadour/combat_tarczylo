import React, { Component } from "react";
import ReactDom from "react-dom";

class DescriptionTraining extends Component {

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

        return (
            <div style={{backgroundColor: "white"}}>
                <br />
                <table border="0" className="page_content">
                    <tbody>
                        <tr>
                            <th>
                                <h2 className="text_jl">Description of trainings</h2>
                                <hr className="hr_presentation" style={{width: "15%"}}/>
                                <p className="text_presentation"> {this.state.club.description_training} </p>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DescriptionTraining