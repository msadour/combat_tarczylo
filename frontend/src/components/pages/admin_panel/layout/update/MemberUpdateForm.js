import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

import FormField from "../Form";
import header from "../../../../header";

class MemberUpdateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            members: []
        }

        this.acceptMember.bind(this);
    }

    componentDidMount(){
        axios.get('/api_tct/member/', header)
        .then(res => {
            this.setState({members: res.data});
        })
        .catch(err => {
            console.log(err)
        });
    }

    onSubmit(e, id){
        event.preventDefault();
        fetch('/api_tct/member/' + id + '/', {
            method: "DELETE",
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') },
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }

    acceptMember(e, id){
        event.preventDefault();
        fetch('/api_tct/member/' + id + '/', {
            method: "PATCH",
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"have_paid": true})
        })
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
                    { member.is_superuser == false ? (
                        <section>
                            <h2>{member.full_name}</h2>
                            <form onSubmit={e => this.onSubmit(e, member.id)}>
                                <label> {member.email} </label><br />
                                <label> {member.sex} </label><br />
                                <label> {member.level} </label><br />
                                <button type="submit" value="Submit"> Delete </button>
                                {member.have_paid == false ? (
                                    <button
                                        type="submit"
                                        value="Submit"
                                        onClick={e => this.acceptMember(e, member.id)}
                                    > Accept </button>
                                ) : (<div></div>)}
                            </form><br />
                        </section>
                    ): (<section></section>)}
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