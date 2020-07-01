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
                list_time_table.push(<p key={time_table.id} className="text_presentation"> {time_table.time_table_str} </p>)
            })
        }

        return (
            <div>
                <table border="0" className="page_content" style={{backgroundColor: "white"}}>
                    <tbody>
                        <tr>
                            <th>
                                <h2 className="text_jl">Where we are?</h2>
                                <hr className="hr_presentation" style={{width: "15%"}}/>
                                <p className="text_presentation"> {this.state.club.street} {this.state.club.zip_code} {this.state.club.city} {this.state.club.country} </p>
                                <h2 className="text_presentation">For the year of {new Date().getFullYear()} we are open :</h2>
                                {list_time_table}
                            </th>

                            <th style={{width: '40%'}}>
                                <br />
                                <img id="img_desc_club" src="../../../media/club_photo.png" />
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Description