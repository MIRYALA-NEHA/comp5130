import React from 'react'

import Navbar from './Navbar.js';
import Footer from './Footer.js';
import axios from 'axios';

export default function Insert() {

    const handleUpload = async()=>{
        let courseTitle = document.querySelector('#courseTitle').value ; 
        let price = document.querySelector('#price').value ; 
        let actualPrice = document.querySelector('#actualPrice').value ; 
        let overview = document.querySelector('#overview').value ; 
        let creatorName = document.querySelector('#creatorName').value ; 
        let creatorEmail = document.querySelector('#creatorEmail').value ; 
        let description = document.querySelector('#description').value ; 
        let image = document.querySelector('#image').value ; 

        let course = {
            courseTitle , 
            price , 
            actualPrice , 
            overview , 
            creatorName,
            creatorEmail ,
            description , 
            image
        }

        try{
            await axios.post(process.env.REACT_APP_API_URL+"/course/insert" , course) ; 
            alert('course inserted !'); 
        }
        catch(err){
            alert('error ' , err) ; 
            console.log(err); 
        }
    }

    return (
        <div style={{ backgroundColor: "white" }}>
            <Navbar />
            <div>
                <div class="mb-3" >
                    <div style={{ padding : '5px' , display : "flex"}}>
                        <label style = {{paddingTop : '3px' , marginRight : '10px' , fontSize : '21px'}} for="exampleFormControlInput1" class="form-label">
                            courseTitle
                        </label>
                        <input type="email" class="form-control" id="courseTitle"  />
                    </div>
                    <div style={{ padding : '5px' , display : "flex"}}>
                        <label style = {{paddingTop : '3px' , marginRight : '10px' , fontSize : '21px'}} for="exampleFormControlInput1" class="form-label">
                            price
                        </label>
                        <input type="email" class="form-control" id="price"  />
                    </div>
                    <div style={{ padding : '5px' , display : "flex"}}>
                        <label style = {{paddingTop : '3px' , marginRight : '10px' , fontSize : '21px'}} for="exampleFormControlInput1" class="form-label">
                            actualPrice
                        </label>
                        <input type="email" class="form-control" id="actualPrice"  />
                    </div>
                    <div style={{ padding : '5px' , display : "flex"}}>
                        <label style = {{paddingTop : '3px' , marginRight : '10px' , fontSize : '21px'}} for="exampleFormControlInput1" class="form-label">
                            overview
                        </label>
                        <input type="email" class="form-control" id="overview"  />
                    </div>
                    <div style={{ padding : '5px' , display : "flex"}}>
                        <label style = {{paddingTop : '3px' , marginRight : '10px' , fontSize : '21px'}} for="exampleFormControlInput1" class="form-label">
                            creatorName
                        </label>
                        <input type="email" class="form-control" id="creatorName"  />
                    </div>
                    <div style={{ padding : '5px' , display : "flex"}}>
                        <label style = {{paddingTop : '3px' , marginRight : '10px' , fontSize : '21px'}} for="exampleFormControlInput1" class="form-label">
                            creatorEmail
                        </label>
                        <input type="email" class="form-control" id="creatorEmail"  />
                    </div>
                    <div style={{ padding : '5px' , display : "flex"}}>
                        <label style = {{paddingTop : '3px' , marginRight : '10px' , fontSize : '21px'}} for="exampleFormControlInput1" class="form-label">
                            description
                        </label>
                        <input type="email" class="form-control" id="description"  />
                    </div>
                    <div style={{ padding : '5px' , display : "flex"}}>
                        <label style = {{paddingTop : '3px' , marginRight : '10px' , fontSize : '21px'}} for="exampleFormControlInput1" class="form-label">
                            image
                        </label>
                        <input type="email" class="form-control" id="image"/>
                    </div>
                   
                    
                </div>
                <div class="col-auto">
                    <button type="submit" class="btn btn-primary mb-3" onClick={(e)=>{
                        handleUpload(); 
                    }}>Upload</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}
