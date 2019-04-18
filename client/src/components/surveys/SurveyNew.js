// SurveyNew shows SurveyForm and SurveyFormReview

import  React,{ Component } from 'react';
import  SurveyForm  from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';



class SurveyNew extends Component {

    /* constructor(){
    //     super();

    //     this.state = { showFormReview: false };
    // }   
        OR
    */
    state = { showFormReview: false }


    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFormReview
            onCancel = {() => { this.setState({ showFormReview: false })}}
            />
        }

        return <SurveyForm onSurveySubmit = {() => {this.setState({ showFormReview: true })}}/>;
    }

    render(){
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }

}

export default reduxForm({ // this is generating the warning msg in console of browser
    form: 'surveyForm' 
})(SurveyNew);