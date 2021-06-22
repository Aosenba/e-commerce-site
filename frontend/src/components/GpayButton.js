import GooglePayButton from '@google-pay/button-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { payOrder } from '../actions/orderActions';
import LoadingBox from '../Home/LoadingBox';
import MessageBox from '../Home/MessageBox';

const GpayButton = ({totalPrice,order}) => {

  const orderPay = useSelector(state=>state.orderPay);
  const {error, success ,loading} = orderPay;
  const dispatch = useDispatch();
  const paymentSuccess=(paymentData)=>
  {
    dispatch(payOrder(order,paymentData));
  }

    return (
      
        <>
        {
          error && <MessageBox variant="danger">{error}</MessageBox>
        }
        {
          loading && <LoadingBox/>
        }
            <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: `${totalPrice}`,
            currencyCode: 'INR',
            countryCode: 'IN',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);

        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData);
            paymentSuccess();
            return { transactionState: 'SUCCESS'}

          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='true'
        buttonColor='black'
        buttonType='long'
      />
            
        </>
    )
}

export default GpayButton
