import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import FaqItem from '../faqs/FaqItem';
import {getFaq} from "../../actions/faq";
import CommentItem from "../faq/CommentItem";
import CommentForm from "./CommentForm";

const Faq = ({getFaq, faq: {faq, loading}, match}) => {
    useEffect(() => {
        getFaq(match.params.id);
    }, [getFaq]);

    return loading || faq == null ? (<Spinner/>) :(
        <Fragment>
            <Link to='/faqs' className='btn'>Back to Profile</Link>
            <FaqItem faq={faq} showActions={false} showAnswers={true} />
            <br/>
            <div className="comments">
                {

                    faq.comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} faqId={faq._id}/>
                    ))
                }
            </div>
            <CommentForm faqId={faq._id}/>
        </Fragment>)
};

Faq.propTypes = {
    getFaq: PropTypes.func.isRequired,
    faq: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    faq: state.faq
});

export default connect(mapStateToProps, {getFaq})(Faq);