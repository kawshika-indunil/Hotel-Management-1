import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'
import 'jspdf-autotable'


export default class billDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            bill:{}
        };
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`/bill/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    bill:res.data.bill
                });

                console.log(this.state.bill);
            }
        })



    }

        //Report Generate Function onClick
jspdGenerator=()=>{

        
    //doc obj
    var doc =new jsPDF('p','pt');
    
    doc.autoTable({ html: '#my-table' })
    //add texts
  
    doc.text(200,20,'Project Report')

  
    doc.autoTable({
       
       tableWidth:'auto',
       margin: { top: 10 },
        columnStyles: { europe: { halign: 'center' } },
        theme:'grid',
        head: [['billid','Bedtype','Amount','Type','Date']],
        body: [
         
          [this.state.bill.billid,this.state.bill.Customername,this.state.bill.Amount,this.state.bill.Type,this.state.bill.Date],
  
        
          
        ],
       
        styles: {  fontSize:10 },
     
        
      })
      
    //Save pdf 
    doc.save("Generated.pdf");
  
  
  }
  render() {

    const {billid,Customername,Amount,Type,Date,} = this.state.bill;

    return (
      <div style={{marginTop:'20px'}}>
      <h4>{billid}</h4>
      <hr/>

      <dl className="row">

          <dt className="col-sm-3">billid</dt>  
          <dd className="col-sm-9">{billid}</dd>  

          <dt className="col-sm-3">Customername</dt>  
          <dd className="col-sm-9">{Customername}</dd>  

          <dt className="col-sm-3">Amount</dt>  
          <dd className="col-sm-9">{Amount}</dd>  

          <dt className="col-sm-3">Type</dt>  
          <dd className="col-sm-9">{Type}</dd>   

            <dt className="col-sm-3">Date</dt>  
          <dd className="col-sm-9">{Date}</dd>    

          

         
 

      </dl>  

      <button className="btn btn-success" onClick={this.jspdGenerator}>Generate Report</button>

      </div>    

    )
  }
}