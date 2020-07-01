import React, { Component } from "react";
import ReactDom from "react-dom";

class Result extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.criteria == "course" ? (
                        <section>
                            <table border="1">
                                <tbody>
                                    <tr>
                                        <th colSpan={2}><p className="text_jl">{this.props.result.name}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Description :</p></th>
                                        <th><p className="text_jl">{this.props.result.description}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Place :</p></th>
                                        <th><p className="text_jl">{this.props.result.place}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Level :</p></th>
                                        <th><p className="text_jl">{this.props.result.level}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Category :</p></th>
                                        <th><p className="text_jl">{this.props.result.category}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Instructor :</p></th>
                                        <th><p className="text_jl">{this.props.result.instructor.full_name}</p></th>
                                    </tr>
                                </tbody>
                            </table> <br />
                        </section>
                     ): this.props.criteria == "internship" ?(
                        <section>
                            <table border="1">
                                <tbody>
                                    <tr>
                                        <th colSpan={2}><p className="text_jl">{this.props.result.name}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Description :</p></th>
                                        <th><p className="text_jl">{this.props.result.description}</p></th>
                                    </tr>


                                    <tr>
                                        <th><p className="text_jl">Place :</p></th>
                                        <th><p className="text_jl">{this.props.result.place}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Level :</p></th>
                                        <th><p className="text_jl">{this.props.result.level}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Category :</p></th>
                                        <th><p className="text_jl">{this.props.result.category}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Instructor :</p></th>
                                        <th><p className="text_jl">{this.props.result.instructor.full_name}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Price :</p></th>
                                        <th><p className="text_jl">{this.props.result.price}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Theme :</p></th>
                                        <th><p className="text_jl">{this.props.result.theme}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Date : </p></th>
                                        {this.props.result.date_end !== null ? (
                                            <th><p className="text_jl">{this.props.result.dates}</p></th>
                                        ) : (
                                            <th><p className="text_jl">{this.props.result.date_begin}</p></th>
                                        )}

                                    </tr>
                                </tbody>
                            </table> <br />
                        </section>
                     ) : this.props.criteria == "article" ?(
                        <section>
                            <table border="1">
                                <tbody>
                                    <tr>
                                        <th colSpan={2}><p className="text_jl">{this.props.result.title}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Content :</p></th>
                                        <th><p className="text_jl">{this.props.result.content}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Category :</p></th>
                                        <th><p className="text_jl">{this.props.result.category}</p></th>
                                    </tr>
                                </tbody>
                            </table> <br />
                        </section>
                     ) : (
                        <section>

                            <table border="1">
                                <tbody>
                                    <tr>
                                        <th colSpan={2}><p className="text_jl">{this.props.result.name}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Author :</p></th>
                                        <th><p className="text_jl">{this.props.result.author}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">Category :</p></th>
                                        <th><p className="text_jl">{this.props.result.category}</p></th>
                                    </tr>

                                    <tr>
                                        <th><p className="text_jl">URL :</p></th>
                                        <th><p className="text_jl">{this.props.result.url}</p></th>
                                    </tr>
                                </tbody>
                            </table> <br />
                        </section>
                     )
                 }
            </div>
        )
    }
}

export default Result