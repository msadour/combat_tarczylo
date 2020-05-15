import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";

class MemberUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            members: []
        }
    }

    componentDidMount(){
        axios.get('/api_tct/member/')
        .then(res => {
            this.setState({members: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    onSubmit(e, id){
        event.preventDefault();
        axios.delete('/api_tct/member/' + id + '/', {data: {'id': id}})
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
    
        var list_member_component = []

        this.state.members.forEach( member => {

            list_member_component.push(
                <div key={member.id}>
                    <h2>{member.full_name}</h2>
                    <form onSubmit={e => this.onSubmit(e, member.id)}>
                        <label> {member.email} </label><br />
                        <label> {member.sex} </label><br />
                        <label> {member.level} </label><br />
                        <button type="submit" value="Submit"> Delete </button>
                    </form><br />
                </div>
            )
        })

        return (
            <div>
                {list_member_component}
            </div>
        )
    }
}

export default MemberUpdateForm