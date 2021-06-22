import React from 'react'
import CardItems from './CardItems'
import './cards.css';
import  books  from '../images/books.jpg';
import  music  from '../images/music.jpg';
const Cards = () => {
    return (
        <div className="cards">
            
            <div className="cards__container">
               
                    <ul className="cards__items1">
                    <CardItems
                      imgurl={books}
                      text="A variety of wide range of books"
                      label="Books"
                      path="/books"
                    
                    />
                      <CardItems
                      imgurl={music}
                      text="All kinds of musical instruments"
                      label="Instruments"
                      path="/Instruments"
                    
                    />
                        <CardItems
                      imgurl="https://www.itl.cat/pngfile/big/15-157634_1920x1080-herunterladen-set-of-musical-instruments.jpg"
                      text="All kinds of musical instruments"
                      label="Instruments"
                      path="/Instruments"
                    
                    />
                    
                    
                    </ul>
                    <ul className="cards__items2">
                    <CardItems
                      imgurl="https://tombrown.online/wp-content/uploads/2018/04/8314929977_36b1d58cf6_o.jpg"
                      text="Thrift1"
                      label="Thrifts"
                      path="/books"
                    
                    />
                      <CardItems
                      imgurl="https://www.itl.cat/pngfile/big/15-157634_1920x1080-herunterladen-set-of-musical-instruments.jpg"
                      text="Thrift2"
                      label="Thrifts"
                      path="/Instruments"
                    
                    />
                      <CardItems
                      imgurl="https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1573133725500-Y5PCN0V04I86HDAT8AT0/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/WBC_7095.jpg?format=2500w"
                      text="Thrift3"
                      label="Thrifts"
                      path="/Food"
                    
                    />
                     <CardItems
                      imgurl="https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1573133725500-Y5PCN0V04I86HDAT8AT0/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/WBC_7095.jpg?format=2500w"
                      text="Thrift4"
                      label="Thrifts"
                      path="/Food"
                    
                    />
                    </ul>
               
            </div>
            
        </div>
    )
}

export default Cards
