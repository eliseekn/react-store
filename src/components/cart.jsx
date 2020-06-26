import React, { useState } from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../scss/main.scss'

const Product = (props) => {
    const productPrice = props.price
    const id = props.id
    const [price, setPrice] = useState(productPrice)
    const [quantity, setQuantity] = useState(1)

    const handleChange = (event) => {
        setQuantity(event.target.value)
        setPrice(productPrice * event.target.value)
        props.onUpdateCart({id, price})
    }

    const handleClick = () => {
        props.onRemoveProduct(id)
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <p>{props.title} (${price})</p>
            <div className="form-group row align-items-center">
                <span>Quantity</span>

                <div className="col">
                    <input type="number" className="form-control" min="1" value={quantity} onChange={handleChange} />
                </div>

                <button type="button" className="btn btn-danger" onClick={handleClick}>Remove</button>
            </div>
        </li>
    )
}

class Cart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="modal fade" id="cart" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white px-3">
                            <h5 className="modal-title">Your cart ({this.props.count})</h5>
                            <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <ul className="list-group list-group-flush">

                                {
                                    this.props.products.map(item => {
                                        return (
                                            <Product
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                price={item.price}
                                                onUpdateCart={this.props.onUpdateCart}
                                                onRemoveProduct={this.props.onRemoveProduct} />
                                        )
                                    })
                                }

                            </ul>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-dark disabled">Total: ${this.props.price}</button>
                            <button type="button" className="btn btn-danger" onClick={this.props.onClearCart}>Clear</button>
                            <button type="button" className="btn btn-success">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart