import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {addLike, removeLike, deleteFaq} from "../../actions/faq";

const FaqItem = ({
    auth,
    faq: {user, _id, title, answer, tag, likes, comments, date},
    addLike,
    removeLike,
    deleteFaq,
    showActions
}) =>
    <div className="post bg-white p-1 my-1">
        <div>
            <Link to={`/faqs/${_id}`}>
                {title}
            </Link>
        </div>
        <div>
            <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {showActions && <Fragment>
                <button onClick={e => addLike(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-up"></i> {' '}
                    <span>{likes.length > 0 && (
                        <span>{likes.length}</span>
                    )}</span>
                </button>
                <button onClick={e => removeLike(_id)} type="button" className="btn btn-light">
                    <i className="fas fa-thumbs-down"></i>
                </button>
                <Link to={`/faqs/${_id}`} className="btn btn-primary">
                    Discussion {' '}
                    {comments.length > 0 && (
                        <span className='comment-count'>{comments.length}</span>
                    )}
                </Link>
                {!auth.loading && user === auth.user._id && (
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={e => deleteFaq(_id)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </Fragment>}
        </div>
    </div>;

FaqItem.defaultProps = {
    showActions: true
};

FaqItem.propTypes = {
    faq: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deleteFaq: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {addLike, removeLike, deleteFaq})(FaqItem);