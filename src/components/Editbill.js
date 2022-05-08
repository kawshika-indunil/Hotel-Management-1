import React, { Component } from 'react'
import axios from 'axios'

export default class Editbill extends Component {


  constructor(props){
    super(props);
    this.state={
        billid:"",
        Customername:"",
        Amount:"",
        Type:"",
        Date:"",
        
    

    }
}
     
    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) =>{
       
        e.preventDefault();
        const id = this.props.match.params.id;

        const{billid,Customername,Amount,Type,joiningdate} = this.state;

        const data ={
            billid:billid,
            Customername:Customername,
            Amount:Amount,
            Type:Type,
            Date:Date,
           
         
        }
        console.log(data)

        axios.put(`/bill/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Updated Successfully")
                this.setState(
                    {
                        billid:"",
                        Customername:"",
                        Amount:"",
                        Type:"",
                        Date:"",
                       
                        
                    }
                )
            }
        })


    }


  componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`/bill/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
              billid:res.data.bill.billid,
              Customername:res.data.bill.Customername,
              Amount:res.data.bill.Amount,
              Type:res.data.bill.Type,
              Date:res.data.bill.Date,
            
            });

            console.log(this.state.bill);
        }
    })



}


  render(){
    return(
        <div className="col-mb-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Edit bill Details</h1>
              <form className="needs-validation" noValidate>
                  <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}} >Bill id</label>
                      <input type="text"
                      className="form-control"
                      name="billid"
                      placeholder="Enter billid"
                      value={this.state.billid}
                      onChange={this.handleInputChange}/>
                   </div>   

                   <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}} >Customer Name</label>
                      <input type="text"
                      className="form-control"
                      name="Customername"
                      placeholder="Enter Customername"
                      value={this.state.Customername}
                      onChange={this.handleInputChange}/>
                   </div>   

                   <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}} >Amount</label>
                      <input type="text"
                      className="form-control"
                      name="Amount"
                      placeholder="Enter Amount"
                      value={this.state.Amount}
                      onChange={this.handleInputChange}/>
                   </div>   

                   <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}} >Type</label>
                      <input type="text"
                      className="form-control"
                      name="Type"
                      placeholder="Enter Type"
                      value={this.state.Type}
                      onChange={this.handleInputChange}/>
                   </div>   

                   <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}} >Date</label>
                      <input type="Date"
                      className="form-control"
                      name="Date"
                      placeholder="Enter date"
                      value={this.state.Date}
                      onChange={this.handleInputChange}/>
                   </div>   

                   
                  

                   <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                       <i className="far fa-check-square"></i>
                       &nbsp; Update
                   </button>

                </form>

             </div>          
    )
}

}