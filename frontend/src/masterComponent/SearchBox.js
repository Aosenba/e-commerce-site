import React from 'react'
import { useState } from 'react';

const SearchBox = (props) => {
    const [name, setName] = useState('');
    const submitHandler=(e)=>
    {
        e.preventDefault();
        props.history.push(`/search/name/${name}`);

    }
    return (
       <form className="search" onSubmit={submitHandler}>
           <div className="row">
            <input type="text" name="q" id="q" onChange={(e)=>setName(e.target.value)}/> 
            <button className="search-btn" type="submit">
                <i className="fa fa-search"/>
            </button>
           </div>

       </form>
    )
}

export default SearchBox
