import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { summaryOrder } from '../actions/orderActions'
import LoadingBox from '../Home/LoadingBox'
import MessageBox from '../Home/MessageBox'
import Chart from 'react-google-charts'

const Dashboard = () => {
    const orderSummary =  useSelector(state=>state.orderSummary);
    const {loading,error,summary}=orderSummary;
    console.log(summary)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(summaryOrder());
    },[dispatch])
    return (
        <div>
            <div className="row">
                <h1>DashBoard</h1>
                </div>
                {
                    loading? <LoadingBox/>
                    :
                    error? <MessageBox variant ="danger">{error}</MessageBox>
                    :
                    (
                        <>
                        <ul className="row summary">
                            <li>
                                <div className="summary-title color1">
                                    <span><i className="fa fa-users"/> Users</span>

                                </div>
                                <div className="summary-body">
                                    {summary.users[0].numUsers}
                                </div>
                            </li>
                            <li>
                                <div className="summary-title color2">
                                    <span><i className="fa fa-shopping-cart"/> Orders</span>

                                </div>
                                <div className="summary-body">
                                    {summary.orders[0]?summary.orders[0].numOrders :0 }
                                </div>
                            </li>
                            <li>
                                <div className="summary-title color3">
                                    <span><i className="fa fa-money"/> Sales</span>

                                </div>
                                <div className="summary-body">
                                <i className="fa fa-inr"/> {summary.orders[0]?summary.orders[0].totalSales.toFixed(2) :0 }
                                </div>
                            </li>
                        </ul>
                        <div>
                            <div>
                                <h1>Sales</h1>
                            </div>
                            {
                                summary.dailyOrders.length === 0?(
                                    <MessageBox variant="danger">No Sale</MessageBox>
                                )
                                :
                                (
                                    <Chart width="100%" 
                                    height="400px"
                                     chartType="AreaChart"
                                     loader={<div>Loading Chart</div>}
                                     data={[
                                         ['Date','Sales'],
                                         ...summary.dailyOrders.map((x=>[x._id,x.sales]))
                                     ]}></Chart>
                                )
                            }
                        </div>
                        <div>
                            <div>
                                <h1>Categories</h1>
                            </div>
                            {
                                summary.productCategories.length === 0?(
                                    <MessageBox variant="danger">No Category</MessageBox>
                                )
                                :
                                (
                                    <Chart width="100%" 
                                    height="400px"
                                     chartType="PieChart"
                                     loader={<div>Loading Chart</div>}
                                     data={[
                                         ['Category','Products'],
                                         ...summary.productCategories.map((x=>[x._id,x.count]))
                                     ]}></Chart>
                                )
                            }
                        </div>
                        </>
                    )
                }
          
        </div>
    )
}

export default Dashboard
