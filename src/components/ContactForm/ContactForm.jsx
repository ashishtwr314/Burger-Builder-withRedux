import React, { Component } from 'react';
import './ContactForm.css';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            customer_data: {
                name : {
                   value: null,
                   isValid: false,
                   touched: false,
                   rules: {
                       required: true,
                       minLen: 3
                   }
                },

                email: {
                  value: null,
                   isValid: false,
                   touched: false,
                   rules: {
                       required: true
                   }
                },

                street: {
                    value: null,
                   isValid: false,
                   touched: false,
                   rules: {
                       required: true
                   }
                },

                locality: {
                   value: null,
                   isValid: false,
                   touched: false,
                   rules: {
                       required: true
                   }
                },

                zip: {
                    value: null,
                   isValid: false,
                   touched: false,
                   rules: {
                       required: true,
                       maxLen: 6,
                       minLen: 6
                   }
                }
            },
            readyToSubmit: false
                

         }
    }

    onChangeHandler = (e, id) =>{

        let customer_data = { ...this.state.customer_data };        
        customer_data[id].value = e.target.value;
        customer_data[id].isValid =  this.checkValidity(customer_data[id].value, customer_data[id].rules)
        customer_data[id].touched = true;
        this.setState( {
            customer_data: customer_data
        });

        let readyToSubmit = true;
        for(let valid in this.state.customer_data){
            readyToSubmit = this.state.customer_data[valid].isValid && readyToSubmit ;
            this.setState({
                readyToSubmit: readyToSubmit
            })
        }

    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== "" ? true  : false && isValid
        }
        if(rules.minLen){
            isValid = value.length >= rules.minLen && isValid
        }
        if(rules.maxLen){
            isValid = value.length <= rules.maxLen && isValid
        }
        return isValid;
    }

    

    render() { 
        let customer_data = [];
        for(let data in this.state.customer_data){
            customer_data.push( {
                id: data,
                value: this.state.customer_data[data]
            });
        }
    
        let inputs = customer_data.map(cus => (
            
            <input   value={this.state.customer_data[cus]} key={cus.id} className={ !cus.value.isValid && cus.value.touched  ? "customer-input Error" : "customer-input"} type="text" placeholder={cus.id} onChange={ (event) => this.onChangeHandler(event, cus.id)} />
        ))


        return ( 
            <div className="ContactForm">
                <form onSubmit={(event) => this.props.placeOrderHandler(event, this.state.customer_data, this.state.readyToSubmit)}>
                    {inputs}

                    <button type="submit"> Place Order </button>
                </form>
            </div>
         );
    }
}
 
export default ContactForm;