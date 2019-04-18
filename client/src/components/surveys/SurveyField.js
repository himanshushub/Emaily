import React, { Component } from 'react';


class SurveyField extends Component{
    
    render(){
        /*console.log(this.props.input); here ypu will see the 
        various event handler funtion that is automatically 
        assigned to the props.input by the redux-form Field tag*/
       //console.log(this.props.meta);
        return(
            <div>
                <label>{this.props.label}</label>
                <div className="red-text" style={{ marginBotton: '20px' }}>
                    { this.props.meta.touched && this.props.meta.error }
                </div>
                <input {...this.props.input} style={{ marginBottom: '5px' }} />
                
            </div>
        )
    }

}

export default SurveyField;