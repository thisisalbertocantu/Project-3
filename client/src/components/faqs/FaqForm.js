import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {addFaq} from "../../actions/faq";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const FaqForm = ({addFaq, history}) => {
    const [formData, setFormData] = useState({
        title: '',
        answer: '',
        tag: ''
    });
    const {
        title,
        answer,
        tag
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        console.log(formData);
        addFaq(formData, history);
    };
    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your FAQ
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Faq
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Title" name="title" value={title} onChange={e => onChange(e)}/>
                    <small className="form-text"
                    >Title for faq
                    </small
                    >
                </div>

                <div className="form-group">
                    <select name="tag" value={tag} onChange={e => onChange(e)}>
                        <option value="0">* Select tag</option>
                        <option value="FAQ tag 1">FAQ tag 1</option>
                        <option value="FAQ tag 2">FAQ tag 2</option>
                    </select>
                    <small className="form-text"
                    >Faq tags
                    </small
                    >
                </div>
                <div className="form-group">
                    <CKEditor
                        editor={ ClassicEditor }
                        value={answer}
                        data=""
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setFormData({...formData, ['answer']: data})
                        } }
                        onBlur={ editor => {

                        } }
                        onFocus={ editor => {

                        } }
                    />
                </div>

                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
};

FaqForm.propTypes = {
    addFaq: PropTypes.func.isRequired
};

export default connect(null, {addFaq})(FaqForm);


