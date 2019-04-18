import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formField';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, (field) => {
        return(
            <div key= {field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        )
    })

    return(
        <div>
            <h5>please confirm your Entries</h5>
            {reviewFields}

            {/*<div>
                <div>
                    <label>Survey Title</label>
                    <div>{formValues.title}</div>
                </div>
            </div>
            */}
            <button className= "yellow darken-3 btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
            
            <button 
                onClick = {() => submitSurvey(formValues, history)}
                className="green btn-flat right">
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state){
    //console.log(state);
    return{ formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));