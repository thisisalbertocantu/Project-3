import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import FaqItem from './FaqItem';
import {getFaqs} from "../../actions/faq";

const Faqs = ({getFaqs, faq:{faqs, loading}}) => {
    useEffect(() => {
        getFaqs();
    }, [getFaqs]);

    return loading ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">F.A.Q.S</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community of faqs
        </p>

        <Link  to='/faq-form' className="btn btn-light">
            Add FAQ
        </Link>
        <div className="faqs">
            {
                faqs.map(faq => (
                    <FaqItem key={faq._id} faq={faq}></FaqItem>
                ))
            }
        </div>
    </Fragment>;
};

Faqs.propTypes = {
    getFaqs: PropTypes.func.isRequired,
    faq: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    faq: state.faq
});

export default connect(mapStateToProps, {getFaqs})(Faqs);