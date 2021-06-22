import React from 'react'
import { useHistory } from 'react-router';
import data from '../Home/Variety';


const Categories= (props) => {
    const history = useHistory();
 
    const goTo=(item)=>
    {
      history.push(`/products/${item.toLowerCase()}`);
    }

    return (
        <div className="dropdown-list">
            {
                data.variety.map((items,idx)=>(
                    <div key={idx}><h2>{items.parent}</h2>
                    <ul>
                            <li onClick={()=>goTo(items.child1)}>{items.child1}</li>
                            <li onClick={()=>goTo(items.child2)}> {items.child2}</li>
                            <li onClick={()=>goTo(items.child3)}> {items.child3}</li>
                            {items.child4? <li onClick={()=>goTo(items.child4)}> {items.child4}</li> :
                            (
                                <li><br/></li>
                            )
                            }
                    </ul>
                    </div>
                ))
            }
     
    </div>
    )
}

export default Categories
