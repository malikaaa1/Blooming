import React, { useEffect, useState,useContext } from 'react';
import { useParams } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { productsContext } from '../../context/ProductContext';
import Aidai from './Aidai.jpg'
import Alan from './Alan.jpg'
import './Comments.css'

const Comments = () => {
    const { getProductDetails, productDetails,editProductDetails } =
    useContext(productsContext);
    let params = useParams().id;
    const [message,setMessage] = useState('')

    useEffect(() => {
    getProductDetails(params);
    }, []);

    function sendMessage(){
        console.log(productDetails)
        let [...newComment] = productDetails.comments
        newComment.push(message)
        let newObj = {
          ...productDetails,
          comments: newComment,
        }
    
        editProductDetails(newObj.id,newObj)
        getProductDetails(params)
      }

    const {
        user: { email },
      } = useAuth();
      console.log({ email });


    return (
        <>
        <div className='comBlock'>
            <input type="text" className="comInput" onChange={(e)=>setMessage(e.target.value)} />
            <button className="CommentButton" onClick={sendMessage}>Add Comment</button>
        </div>

 
 <div className="comments">
        {productDetails.comments?productDetails.comments.map((elem) => (
            <div className="task">
                <div className="mainTaskBlock">
                  {email === "aidai@gmail.com" ? (
                    <img className="makersLogo" src={Aidai} alt="" />   
                  ): null }
                  {email==="alan@gmail.com" ? (
                    <img className="makersLogo" src={Alan} />

                  ):null}
                  
                  {email==="malikaaa@gmail.com" ? (
                    <img className="makersLogo" src="data:image/png;base64,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"/>
                  ): null}
                 
                     <h5  className="makersLogo" >{email}</h5>
                </div>
                <div key={elem.id} className="mainTask">{elem}</div>
            </div>
        )):null}
 </div>
      
        </>
    );
};

export default Comments;