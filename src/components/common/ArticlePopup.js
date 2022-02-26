import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal');

const ArticlePopup = ({ isOpenPopup, handlePopup, title, urlToImage, url, description, publishedAt, author }) => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    //this will close the modal
    const closeModal = () => {
        handlePopup(false);
    }

    return (
        <>
            <Modal
                isOpen={isOpenPopup}
                style={customStyles}
            >
                <div className='container'>
                    <button id="modal-close-btn" className="btn btn-danger" onClick={closeModal}>close</button>
                    <div className='row'>
                        <div className='col-sm-8'>
                            <img src={urlToImage} alt="title" width="100%" />
                            <br /><br /><br />
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <p><strong>Title: </strong> <a href={url} rel="noreferrer" target="_blank"> {title}</a></p>
                                </div>
                                <div className='col-sm-4'>
                                    <p><strong>Published At: </strong> {publishedAt}</p>
                                </div>
                                <div className='col-sm-4'>
                                    <p><strong>Author: </strong> {author}</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <strong>Description: </strong>
                                    <p>{description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )

}

export default ArticlePopup;
