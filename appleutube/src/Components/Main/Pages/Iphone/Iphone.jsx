import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { getProducts } from '../../../../api'


function Iphone() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch((error) => console.log(error));
    }, [])

    console.log(products);

    let flip = true;
    return(
        <div>
            <section className="internal-page-wrapper">
                <div className="container">
                    <div className="row h-100 align-items-center justify-content-center text-center">
                        <div className="col-12 mt-5 pt-5">
                            <h1 className="font-weight-bold">Iphone Page</h1>
                            <div className='brief-description mb-5'>The best for the brightest</div>
                        </div>
                    </div>
                    {products?.map((product) => {
                    let order1 = 1;
                    let order2 = 2;
                    if (flip) {
                        order1 = 2;
                        order2 = 1

                        flip = !flip;
                    }else{
                        flip = !flip;
                    }

                    let productDiv = (
                        <div
                            key={product.product_url}
                            className="row justify-content-center text-center product-holder h-100 align-items-center my-5">
                            
                            {/* Product Info Column */}
                            <div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
                                <div className="product-title">{product.product_name}</div>
                                <div className="product-brief">
                                    {product.product_brief_description}
                                </div>
                                <div className="starting-price">
                                    {`Starting at ${product.starting_price}`}
                                </div>
                                <div className="monthly-price">{product.price_range}</div>
                                <div className="links-wrapper">
                                    <ul>
                                        <li>
                                            <Link to={`/iphone/${product.product_url}`}>
                                                Learn more
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Product Image Column  */}
                            <div className={`col-sm-12 col-md-6 my-auto order-${order2}`}>
                                <div className="product-image">
                                    <img src={product.product_img} alt="product"/>
                                </div>
                            </div>

                        </div>
                    );
                    return productDiv;
                })}



                </div>
                
            </section>
        </div>
    )
}
export default Iphone