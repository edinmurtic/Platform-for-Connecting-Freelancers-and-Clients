import { FaShoppingCart, FaRegBookmark, FaStar, FaFireAlt } from 'react-icons/fa';
import "./serviceC.css"

const ServiceC = ({item}) => {
    return(
        <div className='productList'>
            <div key={item.id} className='productCard'>
                <img src={item.cover} alt='product-img' className='productImage'></img>

                <FaShoppingCart className={"productCard__cart"} />
                <FaRegBookmark className={"productCard__wishlist"} />
                <FaFireAlt className={"productCard__fastSelling"} />

                <div className='productCard__content'>
                    <h3 className='productName'>{item.name}</h3>
                    <div className='displayStack__1'>
                        <div className='productPrice'>${item.price}</div>
                        <div className='productSales'>{item.totalSales} units sold</div>
                    </div>
                    <div className='displayStack__2'>
                        <div className='productRating'>
                            {[...Array(item.rating)].map((index) => (
                                <FaStar id={index + 1 } key={index} />
                            ))}
                        </div>
                        <div className='productTime'>{item.timeLeft} days left</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceC