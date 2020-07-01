import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

import header from "../../../../header";
import {OPTION_TEMPLATE_SIZE, OPTION_TEMPLATES_CATEGORY_PRODUCT} from "../../../../layout/ChoiceSelect";


class ProductCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: "",
            quantity_available: "",
            size: "",
            category: 0,
            picture: null,
            options_category: [],
        }

        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    componentDidMount() {

        fetch('/api_tct/category/')
        .then(response => response.json())
        .then((data) => {
            this.setState({options_category: data});
        })
        .catch(err => {
        console.log(res);
            alert('error');

        });
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post('/api_tct/product/', { "name": this.state.name,
                                        "price": this.state.price,
                                        "quantity_available": this.state.quantity_available,
                                        "size": this.state.size,
                                        "category": this.state.category,

        })
        .then(res => {
            alert('Product created')
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        let optionTemplateCategory = [<option key={0} value={0}></option>]

        this.state.options_category.forEach(category => {
            optionTemplateCategory.push(<option key={category.id} value={category.id}>{category.name}</option>)
        })

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center text_jl">Create a product</h2>


                  <form onSubmit={e => this.onSubmit(e)}>

                    <div className="form-group">
                      <label className="text_jl">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label className="text_jl">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="price"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label className="text_jl">Quantity available</label>
                      <input
                        type="number"
                        step="1"
                        className="form-control"
                        name="quantity_available"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label className="text_jl">Size</label>
                      <select
                          name="size"
                          type="select"
                          className="form-control"
                          onChange={e => this.onChange(e)}
                      >
                        {OPTION_TEMPLATE_SIZE}
                      </select>
                    </div>


                    <div className="form-group">
                      <label className="text_jl">Category</label>

                      <select
                          name="category"
                          type="select"
                          className="form-control"
                          onChange={e => this.onChange(e)}
                      >
                        {optionTemplateCategory}
                      </select>
                    </div>


                    <div className="form-group">
                      <button className="button" type="submit">
                        <label className="text_jl_button">Create</label>
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default withRouter(ProductCreateForm)