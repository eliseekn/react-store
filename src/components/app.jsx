import React from 'react'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '../scss/main.scss'
import categories from '../data/categories.json'
import products from '../data/products.json'
import Sidebar from './sidebar'
import Products from './products'
import Cart from './cart'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'

const AlertMessage = (props) => {
    const handleClick = () => {
        props.onDisplay(false)
    }
    
    return (
        <Modal show={props.display} onHide={handleClick} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>This product is already in your cart.</Modal.Header>
            <Modal.Body></Modal.Body>
        </Modal>
    )
}

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            cartProducts: [],
            cartCount: 0,
            totalPrice: 0,
            categories: [],
            products: [],
            displayAlert: false
        }

        this.handleAddProduct = this.handleAddProduct.bind(this)
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this)
        this.handleUpdateCart = this.handleUpdateCart.bind(this)
        this.handleClearCart = this.handleClearCart.bind(this)
        this.handleAlertDisplay = this.handleAlertDisplay.bind(this)
    }

    handleAddProduct(product) {
        if (this.state.cartProducts.some(item => product.id === item.id)) {
            this.handleAlertDisplay(true)
            return
        }

        this.setState(state => ({
            cartProducts: state.cartProducts.concat({
                id: product.id,
                title: product.title,
                price: product.price,
            }),
            cartCount: state.cartCount + 1,
            totalPrice: this.state.cartProducts.reduce((acc, curr) => acc += curr.price, 0),
        }))
    }

    handleRemoveProduct(id) {
        this.setState(state => ({
            cartProducts: state.cartProducts.filter(item => item.id !== id),
            totalPrice: this.state.cartProducts.reduce((acc, curr) => acc += curr.price, 0),
            cartCount: state.cartCount - 1
        }))
    }

    handleUpdateCart(product) {
        const cartProducts = this.state.cartProducts.map(item => {
            if (item.id === product.id) {
                item.price = product.price
            }

            return item
        })

        this.setState({
            cartProducts: cartProducts,
            totalPrice: this.state.cartProducts.reduce((acc, curr) => acc += curr.price, 0)
        })
    }

    handleClearCart() {
        this.setState({
            cartProducts: [],
            cartCount: 0,
            totalPrice: 0
        })
    }

    handleAlertDisplay(displayAlert) {
        this.setState({displayAlert: displayAlert})
    }

    componentDidMount() {
        this.setState({
            categories: categories.items,
            products: products.items
        })
    }

    render() {
        return (
            <React.Fragment>
                <Navbar variant="dark" bg="dark" expand="lg" sticky="top">
                    <div className="container">
                        <Navbar.Brand href="#">React Store</Navbar.Brand>

                        <Nav className="ml-auto">
                            <Nav.Link href="#" data-toggle="modal" data-target="#cart" className="d-flex align-items-center">
                                <li className="fa fa-shopping-cart"></li> Cart ({this.state.cartCount})
                            </Nav.Link>
                        </Nav>
                    </div>
                </Navbar>

                <section className="container my-5">

                    <AlertMessage display={this.state.displayAlert} onDisplay={this.handleAlertDisplay} />

                    <div className="row">
                        <Sidebar categories={this.state.categories} />

                        <Products 
                            products={this.state.products} 
                            onAddProduct={this.handleAddProduct} />
                    </div>
                </section>

                <Cart
                    count={this.state.cartCount}
                    price={this.state.totalPrice}
                    products={this.state.cartProducts}
                    onRemoveProduct={this.handleRemoveProduct}
                    onUpdateCart={this.handleUpdateCart}
                    onClearCart={this.handleClearCart} />

            </React.Fragment>
        )
    }
}

export default App
