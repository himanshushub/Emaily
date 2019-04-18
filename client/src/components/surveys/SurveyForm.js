import  React,{ Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formField';



class SurveyForm extends Component {

    renderFields(){
        // return _.map(formFields, (fields) => {
        //     return <Field component={SurveyField} type="text" label={fields.label} name={fields.name} />
        // });
        return _.map(formFields, ({label, name}) => {
                 return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
             });
    }

    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(
                   // values => console.log(values)
                   () => {this.props.onSurveySubmit()}
                )} >
                {/* <Field type = "text" name="surveyTitle" component="input" /> */}
                {this.renderFields()}
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                </Link>

                <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>

                </form>
                SurveyForm!!!
            </div>
        );
    }

}

function validate(values){
    const error = {};

    // if(!values.title){
    //     error.title = "You must provide Title";
    // }

    error.recipients = validateEmails(values.recipients || '');
    _.each(formFields, ({ name }) => {
        if(!values[name]){
            error[name] = 'you must provide a value';
        }
    });

   

    return error;
}


export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);