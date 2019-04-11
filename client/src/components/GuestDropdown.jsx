import React from 'react';
import Guests from './Guests.jsx';
import OutsideClickHandler from 'react-outside-click-handler';
import '../styles/guest_styles.css';

class GuestDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adults: 1,
      children: 0,
      infants: 1,
      open: false
    };
  }

  render() {
    let carrot = (
      <svg
        className={`carrot${this.state.open ? ' open_guests' : ''}`}
        viewBox="0 0 18 18"
        role="presentation"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="m1.71 13.71a1 1 0 1 1 -1.42-1.42l8-8a1 1 0 0 1 1.41 0l8 8a1 1 0 1 1 -1.41 1.42l-7.29-7.29z"
          fillRule="evenodd"
        />
      </svg>
    );
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({ open: false });
        }}
      >
        <div className="guests-container">
          <button
            className="guests-button"
            onClick={() => this.setState({ open: !this.state.open })}
          >
            <div className="guests-button-flex">
              <div className="guests-button-text">
                {this.state.adults + this.state.children} Guests
                {this.state.infants > 0
                  ? `, ${this.state.infants} infants`
                  : ''}
              </div>
              {carrot}
            </div>
          </button>
          {this.state.open && (
            <div className="guests-buttons-container">
              <div className="guests-component-container">
                <Guests />
              </div>
              <div className="max-guests">
                {`${
                  this.props.maxGuests
                } guests maximum. Infants don’t count toward the number of guests.`}
              </div>
              <div
                className="close"
                onClick={() => this.setState({ open: false })}
              >
                Close
              </div>
            </div>
          )}
        </div>
      </OutsideClickHandler>
    );
  }
}

export default GuestDropdown;
