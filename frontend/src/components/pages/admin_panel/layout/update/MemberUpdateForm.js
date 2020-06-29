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
                <div key={member.id} className="col-md-6 m-auto">
                    { member.is_superuser == false ? (
                        <section className="card card-body mt-5">
                            <h2 className="text-center text_jl">{member.full_name}</h2>
                            <form onSubmit={e => this.onSubmit(e, member.id)}>
                                <table>
                                    <tbody>

                                        <tr>
                                            <th colSpan={2}><img style={{width:"50%"}} src={member.picture} /></th>
                                        </tr>

                                        <tr>
                                            <th><p className="text_jl">Email :</p></th>
                                            <th><p className="text_jl">{member.email}</p></th>
                                        </tr>

                                        <tr>
                                            <th><p className="text_jl">Sex :</p></th>
                                            <th><p className="text_jl">{member.sex}</p></th>
                                        </tr>

                                        <tr>
                                            <th><p className="text_jl">Level :</p></th>
                                            <th><p className="text_jl">{member.level}</p></th>
                                        </tr>

                                        <tr>
                                            <th><button type="submit" value="Submit"> Delete </button></th>

                                            <th>
                                                {member.have_paid == false ? (
                                                    <button
                                                        type="submit"
                                                        value="Submit"
                                                        onClick={e => this.acceptMember(e, member.id)}
                                                    > Accept </button>
                                                ) : (<div></div>)}
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </form><br />
                        </section>
                    ): (<section></section>)}
                </div>
            )
        })

        return (
            <div>
                {list_member_component}
                <br /><br />
            </div>
        )
    }
}

export default MemberUpdateForm