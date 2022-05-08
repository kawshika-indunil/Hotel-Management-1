import React, { Component } from 'react';
import axios from 'axios';

export default class billHome extends Component {
constructor(props){
  super(props);

  this.state={
    bill:[]
  };

}  

componentDidMount(){
  this.retrievebill()
}

retrievebill(){
  axios.get("/bill").then(res =>{
    if(res.data.success){
      this.setState({
        bill:res.data.existingbill
      });

      console.log(this.state.bill);

    }
  });
}

onDelete =(id) =>{
  axios.delete(`/bill/delete/${id}`).then((res) =>{
    alert("Delete Successfully");
    this.retrievebill();
  })
}

filterData(bill,searchkey){

  const result = bill.filter((bill)=>
   bill.billid.includes(searchkey)
   )

   this.setState({bill:result})
}

handleSearchArea = (e) =>{
  const searchkey= e.currentTarget.value;

  
    axios.get("/bill").then(res =>{
      if(res.data.success){
       
        this.filterData(res.data.existingbill,searchkey)
      }
    });
}


  render() {
    return (
      <div className="container">
       <div className="row">
         <div className="col-lg-9 mt-2 mb-2">
         <h4>bill Details</h4>  
         </div>
         <div className="col-lg-3 mt-2 mb-2">
           <input
           className="form-control"
           type="search"
           placeholder="Search"
           name="searchQuery"
           onChange={this.handleSearchArea}>

           </input>
           </div>
           </div>
           <table className="table table-hover" style={{marginTop:'40px'}}>
          <thead>
            <tr>
            <th scope="col">#</th>
              <th scope="col">bill Id</th>
              <th scope="col">bill Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>

            </tr>
          </thead>
          <tbody>
            {this.state.bill.map((bill,index) =>(
              <tr key={index}>

                <th scope="row">{index+1}</th>
                <td>
                    <a href={`/bill/${bill._id}`} style={{textDecoration:'none'}}>
                    {bill.billid}
                    </a>
                    
                    </td>     
                <td>{bill.Customername}</td>
                <td>{bill.Amount}</td>
                <td>{bill.Type}</td>
                <td>{bill.Date}</td>
             

                <td>
                  <a className="btn btn-warning" href={`/edit/${bill._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(bill._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}




          </tbody>
        </table>

        <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Add</a></button>

        

      </div>
    )
    
  }
}