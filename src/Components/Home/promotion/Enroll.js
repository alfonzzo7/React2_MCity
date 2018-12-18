import React, { Component } from 'react';
import { Fade } from 'react-reveal';

import FormField from '../../ui/formField';
import { validate } from '../../ui/misc';
import { firebasePromotions } from '../../../firebase';


class Enroll extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email',
                },
                validation: {
                    required: true,
                    email: true,
                },
                valid: false,
                validationMessage: '',
            }
        },
    }

    updateForm(element) {
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};
        
        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        });
    }

    resetFormSuccess(type) {
        const newFormData = {...this.state.formData};

        for (let key in newFormData) {
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }

        this.setState({
            formError: false,
            formData: newFormData,
            formSuccess: type ? 'Congratulations' : 'Already on data base'
        });

        this.clearSuccessMessage();
    }

    clearSuccessMessage() {
        setTimeout(() => this.setState({formSuccess: ''}), 2000);
    }

    submirForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            firebasePromotions
                .orderByChild('email')
                .equalTo(dataToSubmit.email)
                .once('value')
                .then((snapshot) => {
                    if (snapshot.val() === null) {
                        firebasePromotions.push(dataToSubmit);
                        this.resetFormSuccess(true);
                    } else {
                        this.resetFormSuccess(false);
                    }
                });
        } else {
            this.setState({formError: true});
        }

    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={(event) => this.submirForm(event)}>
                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            <FormField
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(element) => this.updateForm(element)}
                            />

                            {this.state.formError ? 
                                <div className="error_label">Something is wrong, try again.</div>    
                                : null
                            }
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button onClick={(event) => this.submirForm(event)} disabled={this.state.formError}>Enroll</button>

                            <div className="enroll_discl">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit animi, perferendis quibusdam magnam placeat, nostrum laboriosam neque veniam eos, repellendus obcaecati minima. Voluptatem at dolore, earum delectus beatae recusandae ipsam.
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;