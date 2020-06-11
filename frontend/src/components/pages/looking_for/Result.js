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
                            Course :<br />
                            {this.props.result.name}<br />
                            {this.props.result.description}<br />
                            {this.props.result.place}<br />
                            {this.props.result.level}<br />
                            {this.props.result.category}<br />
                            {this.props.result.instructor.full_name}
                        </section>
                     ): this.props.criteria == "internship" ?(
                        <section>
                            Internship :<br />
                            {this.props.result.name}<br />
                            {this.props.result.description}<br />
                            {this.props.result.place}<br />
                            {this.props.result.level}<br />
                            {this.props.result.category}<br />
                            {this.props.result.instructor.full_name}<br />
                            {this.props.result.price}<br />
                            {this.props.result.theme}<br />
                            {this.props.result.date_begin}<br />
                            {this.props.result.date_end}<br />
                        </section>
                     )

                     : (
                        <section>
                            Book :<br />
                            {this.props.result.name}<br />
                            {this.props.result.author}<br />
                            {this.props.result.category}<br />
                            {this.props.result.url}<br />
                        </section>
                     )

                 }
            </div>
        )
    }
}

export default Result