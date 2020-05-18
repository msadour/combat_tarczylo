import React, { Component } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';

class ProductCreateForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: "",
            quantity_available: "",
            size: "",
            category: 0,
            options_category: [],
        }

        this.onChange.bind(this);
        this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api_tct/category/')
        .then(res => {
            this.setState({options_category: res.data});
        })
        .catch(err => {
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
            alert("Product created.")
        })
        .catch(err => {
            console.log(err)
        });
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        let optionTemplate = [<option key={0} value={0}></option>]

        this.state.options_category.forEach(category => {
            optionTemplate.push(<option key={category.id} value={category.id}>{category.name}</option>)
        })

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                  <h2 className="text-center">Create a product</h2>


                  <form onSubmit={e => this.onSubmit(e)}>

                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="text"
                        className="form-control"
                        name="price"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label>Quantity available</label>
                      <input
                        type="text"
                        className="form-control"
                        name="quantity_available"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label>Size</label>
                      <input
                        type="text"
                        className="form-control"
                        name="size"
                        onChange={e => this.onChange(e)}
                      />
                    </div>


                    <div className="form-group">
                      <label>Category</label>

                      <select
                          name="category"
                          type="select"
                          onChange={e => this.onChange(e)}
                      >
                        {optionTemplate}
                      </select>
                    </div>


                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Create
                      </button>
                    </div>

                  </form>
                </div>
          </div>
        )
    }
}

export default withRouter(ProductCreateForm)