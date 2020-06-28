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
                                        <th colSpan={2}>{this.props.result.name}</th>
                                    </tr>

                                    <tr>
                                        <th>Description :</th>
                                        <th>{this.props.result.description}</th>
                                    </tr>

                                    <tr>
                                        <th>Place :</th>
                                        <th>{this.props.result.place}</th>
                                    </tr>

                                    <tr>
                                        <th>Level :</th>
                                        <th>{this.props.result.level}</th>
                                    </tr>

                                    <tr>
                                        <th>Category :</th>
                                        <th>{this.props.result.category}</th>
                                    </tr>

                                    <tr>
                                        <th>Instructor :</th>
                                        <th>{this.props.result.instructor.full_name}</th>
                                    </tr>
                                </tbody>
                            </table> <br />
                        </section>
                     ): this.props.criteria == "internship" ?(
                        <section>
                            <table border="1">
                                <tbody>
                                    <tr>
                                        <th colSpan={2}>{this.props.result.name}</th>
                                    </tr>

                                    <tr>
                                        <th>Description :</th>
                                        <th>{this.props.result.description}</th>
                                    </tr>


                                    <tr>
                                        <th>Place :</th>
                                        <th>{this.props.result.place}</th>
                                    </tr>

                                    <tr>
                                        <th>Level :</th>
                                        <th>{this.props.result.level}</th>
                                    </tr>

                                    <tr>
                                        <th>Category :</th>
                                        <th>{this.props.result.category}</th>
                                    </tr>

                                    <tr>
                                        <th>Instructor :</th>
                                        <th>{this.props.result.instructor.full_name}</th>
                                    </tr>

                                    <tr>
                                        <th>Price :</th>
                                        <th>{this.props.result.price}</th>
                                    </tr>

                                    <tr>
                                        <th>Theme :</th>
                                        <th>{this.props.result.theme}</th>
                                    </tr>

                                    <tr>
                                        <th>Date : </th>
                                        {this.props.result.date_end !== null ? (
                                            <th>{this.props.result.dates}</th>
                                        ) : (
                                            <th>{this.props.result.date_begin}</th>
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
                                        <th colSpan={2}>{this.props.result.title}</th>
                                    </tr>

                                    <tr>
                                        <th>Content :</th>
                                        <th>{this.props.result.content}</th>
                                    </tr>

                                    <tr>
                                        <th>Category :</th>
                                        <th>{this.props.result.category}</th>
                                    </tr>
                                </tbody>
                            </table> <br />
                        </section>
                     ) : (
                        <section>

                            <table border="1">
                                <tbody>
                                    <tr>
                                        <th colSpan={2}>{this.props.result.name}</th>
                                    </tr>

                                    <tr>
                                        <th>Author :</th>
                                        <th>{this.props.result.author}</th>
                                    </tr>

                                    <tr>
                                        <th>Category :</th>
                                        <th>{this.props.result.category}</th>
                                    </tr>

                                    <tr>
                                        <th>URL :</th>
                                        <th>{this.props.result.url}</th>
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