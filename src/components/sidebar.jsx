import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../scss/main.scss'

const Categories = (props) => {
    return <option value={props.name}>{props.name}</option>
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filterPrice: 1000,
            filterProduct: ''
        }

        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
    }

    handleChangeSearch(event) {
        this.setState({ filterProduct: event.target.value })
    }

    handleChangePrice(event) {
        this.setState({ filterPrice: event.target.value })
    }

    render() {
        return (
            <div className="col-lg-3">
                <h4 className="mt-5 text-dark">Filter results</h4>
                <hr className="bg-dark mb-4" />

                <div className="form-group mt-4">
                    <label htmlFor="categories">Product category</label>
                    <select className="form-control" id="categories">
                        <option value="All" defaultValue>All</option>

                        {
                            this.props.categories.map(item => {
                                return <Categories key={item.id} name={item.name} />
                            })
                        }

                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="search">Product name</label>
                    <input type="search" className="form-control" id="search" onChange={this.handleChangeSearch} value={this.state.filterProduct} />
                </div>

                <div className="form-group mt-4">
                    <label htmlFor="price">Product price:</label> ${this.state.filterPrice}
                    <input type="range" className="form-control-range" id="price" min="1" max="1000" value={this.state.filterPrice} onChange={this.handleChangePrice} />
                </div>
            </div>
        )
    }
}

export default Sidebar