import React, { Component ,useEffect, useState} from 'react';
// import ReactImageMagnify from 'react-image-magnify';
import Header from '../../components/Header/Header';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// import React, {  } from 'react';
// import React, { useState, useEffect } from "react";
import './ProductView.css';

class ProductView extends Component {


// CreateStudent Component for add new student
  
// Import Modules

constructor(props) {
    super(props);
    this.state={
        productid: '',
        comment:'',
        reviews:[]
    }}
    componentDidMount() {
        axios.get(
"http://localhost:4000/reviews")
            .then((res) => {
                this.setState({
                    reviews: res.data,
                   // DataisLoaded: true
                  // console.log(this.state.reviews)
                });
            })
            console.log(this.state.reviews)
    }

userId = this.props.userinfo.userId;
    handleClick = async (event, prodId) => {
        event.preventDefault();
        const userId = this.props.userinfo.userId;
        // const [rating, setRating] = useState(0);
        // const [comment, setComment] = useState('');
        // console.log(this.props.userinfo.userId, prodId);
        await axios.post('http://localhost:4000/addtoCart', {
            "userId": userId,
            "prodId": prodId
        })
        this.props.history.push('/viewcart')
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]:value})}
    goBack = (event) => {
        event.preventDefault();
        this.props.history.push('/products');
    }
  
    submitHandler= async (event) => {
        this._isMounted = true;
        event.preventDefault();

        const review= {
            productid: this.props.product.id,
            comment: this.state.comment,
 
        }
        console.log(review, this.props.product.id);
        await axios({
            method: 'post',
            url: 'http://localhost:4000/addcomment',
            data: review,
            'Content-Type': 'application/json'
        })
        console.log(review);
        this.setState({
            productid: this.props.product.id,
            comment:this.state.comment,
        });
        console.log(this.state);
    }

    // handleChange = e => {
    //     e.preventDefault();
    //     const { name, value } = e.target;
    //     // console.log(name, value);
    // }
//   submitHandler = (e) => {
//         e.preventDefault();
//         // dispatch actions
//         dispatch(
//           saveProductReview(props.match.params.id, {
//             name: userInfo.name,
//             rating: rating,
//             comment: comment,
//           })
//         );
//       };
    render() {
        const reviews = this.state.reviews;
        const proid =String(this.props.product.id)
        console.log(reviews,proid)
        
        return (
            <>
                <Header logout={this.props.logout} userinfo={this.props.userinfo} />
                <div className="prodcontainer">
                    <div className="prodimg">
                        {/* <ReactImageMagnify {...{
                            imageClassName: "cover",
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                src: this.props.product.imageUrl,
                                // sizes: '(max-width: 300px)',
                                isFluidWidth: true,
                                height: 500,
                                width: '100%',
                                // srcSet: this.srcSet,
                                sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px',
                                


                            },
                            largeImage: {
                                src: this.props.product.imageUrl,
                                width: 1800,
                                height: 1800,
                            },
                            // shouldUsePositiveSpaceLens: true,
                            lensStyle: {
                                background: 'hsla(0, 0%, 100%, .3)',
                                width:20,
                                height:20,
                                border: '1px solid #ccc'
                            },
                            isHintEnabled: true,

                        }} /> */}
                        <img className="cover" src={this.props.product.imageUrl} alt="hello" />

                        <button
                            className="addbtn"
                            onClick={(e) => this.handleClick(e, this.props.product.id)}
                        > <div id="slide"></div>Add To Cart
                        </button>

                        <button className="continue" onClick={this.goBack}>Continue Shopping</button>
                    </div>
                    <div className="proddetails">
                        <div className="prodin">
                            <div className="prodtitle">
                                <h1>{this.props.product.title}</h1>
                            </div>
                            <hr />
                            <div className="proddesc">
                                <p><strong>Product Description:</strong></p><br></br><br></br>
                                <p>{this.props.product.description}</p>
                            </div>
                            <hr />
                            <div className="prodprice">
                                <h3>{"Price: " + this.props.product.price + " $"}</h3>
                            </div>
                            <hr />
                        </div>
                    </div>
                    { <div className="content-margined">
            <h2>Reviews</h2>
            {/* {!this.props.product.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">*/}
              {reviews.map((review) => (
                <li key={ proid=== review.productid? review.productid:''}>
                
                  <div>
                    {/* <Rating value={review.rating}></Rating> */}
                  </div>
                  <div>{proid=== review.productid ? review.createdAt.substring(0, 10): ''}</div>
                  <div>{proid=== review.productid ?review.comment: ''}</div>
                </li>
              ))} 
              <li>
                <h3>Write a customer review</h3>
              
                  <form onSubmit={this.submitHandler}>
                    <ul className="form-container">
                      <li>
                        {/* <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select> */}
                      </li>
                      <li>
                        <label >Comment</label>
                        <textarea
                         name="comment"
                         // value={this.state.comment}
                          onChange={this.handleChange}
                        //  onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
  
              </li>
            {/* </ul> */}
          </div> }
                </div>
            </>
        );
    }
}

export default withRouter(ProductView);