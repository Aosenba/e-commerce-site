import React from 'react'
import { useState } from 'react';

const SearchBox = (props) => {
    const [name, setName] = useState('');
 
    const submitHandler=(e)=>
    {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);

    }
    console.log(props)
    return (
        <div>
       <form className={props.searchToggle?"search open-search": "search"} onSubmit={submitHandler}>
           <div className="row">
            <input type="text" name="q" id="q" onChange={(e)=>setName(e.target.value)}/> 
            <button className="search-btn" type="submit">
                <i className="fa fa-search"/>
            </button>
            <i className="fa fa-right-arrow"/>
           </div>
          
       </form>
       <i className={props.searchToggle?"fa fa-search search-icon up":"fa fa-search search-icon"} onClick={props.searchToggler}/>
       <i className={props.searchToggle?"fa fa-close search-icon ":"fa fa-close search-icon up"} onClick={props.searchToggler}/>
       </div>
    )
}

export default SearchBox
