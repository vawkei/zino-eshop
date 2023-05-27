import { Fragment, useEffect,useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector,useDispatch } from 'react-redux';
import { cartAction } from '../../../store';
import { toast } from 'react-toastify';
import CheckoutForm from '../../checkoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
// console.log(stripePromise);

const Checkout = () => {

    const [clientSecret, setClientSecret] = useState('')
    const [message, setMessage] = useState('initializing checkout...');

    const dispatch = useDispatch();

    const cartItems = useSelector((state)=>state.cart.cartItems);
    const totalAmount = useSelector((state)=>state.cart.cartTotalAmnt);
    const customerEmail = useSelector((state)=>state.auth.email);

    const shippingAddress = useSelector((state)=>state.checkout.shippingAddress);
    const billingAddress = useSelector((state)=>state.checkout.billingAddress)

    useEffect(()=>{
        dispatch(cartAction.CALCULATE_SUBTOTAL())
        dispatch(cartAction.CALCULATE_TOTAL_QTY)
    },[dispatch,cartItems])

    const description = `eshop payment: email: ${customerEmail}, amount: ${totalAmount}`

    useEffect(()=>{
        fetch('http://localhost:4242/create-payment-intent',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                items:cartItems,
                userEmail:customerEmail,
                shipping:shippingAddress,
                billing:billingAddress,
                description:description
            })
        }).then((res)=>{
            if(res.ok){
                return res.json()
            }
                return res.json().then((json)=>Promise.reject(json))

        })
        .then((data)=>{
            setClientSecret(data.clientSecret)
        })
        .catch((err)=>{setMessage('Failed to initialize checkout')
        console.log(err)}
        );
        //toast.error('Something went wrong');
    },[])

    const appearance = {
        theme:'stripe',
    };
    const options = {
        clientSecret,
        appearance
    }

    return (
        <Fragment>
        <section>
            <div className='container'>
                {!clientSecret && <h3>{message}</h3>}
            </div>
        </section>
        {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        )}
        </Fragment>
     );
}

export default Checkout;

