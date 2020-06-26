import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../scss/main.scss'

const Product = (props) => {
    const handleClick = (event) => {
        event.preventDefault()

        const id = props.id
        const title = props.title
        const price = props.price

        props.onAddProduct({ id, title, price })
    }

    return (
        <div className="card mb-4 shadow">
            <img src={props.image} className="card-img-top" />
            <div className="card-body text-center">
                <h5 className="card-title">${props.price}</h5>
                <p className="card-text">{props.title}</p>
                <a href="#" className="btn btn-dark" onClick={handleClick}>Add to cart</a>
            </div>
        </div>
    )
}

class Products extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col-lg-9">
                <h4 className="mt-5 text-dark">All products</h4>
                <hr className="bg-dark mb-4" />

                <div className="card-columns">
                    {
                        this.props.products.map(item => {
                            return (
                                <Product
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    category={item.category}
                                    price={item.price}
                                    image={item.image}
                                    onAddProduct={this.props.onAddProduct} />
                            )
                        })
                    }
                </div>

                <nav className="my-4">
                    <ul className="pagination"></ul>
                </nav>
            </div>
        )
    }
}

export default Products