import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from "meteor/tracker";

export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showVisible: false
    }
  }

  componentDidMount() {
    this.setVisibleTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: !Session.get('showVisible')
      })
    })
  }

  componentWillUnmount() {
    this.setVisibleTracker.stop();
  }

  handleOnChange(e) {
    Session.set('showVisible', !e.target.checked);
  }

  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" onChange={this.handleOnChange} checked={this.state.showVisible}/>
          show hidden links
        </label>
      </div>
    );
  }

}
