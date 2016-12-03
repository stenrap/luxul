import React from 'react';
import { connect } from 'react-redux';

import RadioConfiguration from './RadioConfiguration';
import ProfileForm from './ProfileForm';
import ProfileTable from './ProfileTable';
import { setRadioEnabled, setRadioChannelWidth, setRadioChannel, setSecondaryRadioChannel, addProfile, deleteProfile } from '../../redux/wireless';

class Wireless extends React.Component {
    render() {
        const { profiles, radios, dispatch } = this.props;

        return (
            <div className="wirelessPage">
                <RadioConfiguration
                    radios={radios}
                    handleRadioToggle={ (radio, enabled) => dispatch(setRadioEnabled(radio, enabled)) }
                    handleRadioChannelWidth={ (radio, width) => dispatch(setRadioChannelWidth(radio, width)) }
                    handleRadioChannel={ (radio, channel) => dispatch(setRadioChannel(radio, channel)) }
                    handleSecondaryRadioChannel={ (radio, channel) => dispatch(setSecondaryRadioChannel(radio, channel)) }
                />
                <ProfileForm
                    onSubmit={ (profile) => dispatch(addProfile(profile)) }
                />
                <ProfileTable
                    profiles={profiles}
                    handleDelete={ (i) => dispatch(deleteProfile(i)) }
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        radios: state.wireless.radios,
        profiles: state.wireless.profiles,
    };
};

export default connect(mapStateToProps)(Wireless);