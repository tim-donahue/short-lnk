import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

    this.state = {
      errorMsg: '',
      isOpen: false,
      url: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    const url = this.state.url;

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({
          errorMsg: err.reason
        });
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value.trim()
    });
  }
  handleModalClose() {
    this.setState({
      errorMsg: '',
      isOpen: false,
      url: ''
    })
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
          <form onSubmit={this.onSubmit} className="boxed-view__form">
            <input
              type="text"
              name="url"
              ref="url"
              value={this.state.url}
              placeholder="URL"
              onChange={this.onChange}
            />
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}