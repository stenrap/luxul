import React from 'react';
import { connect } from 'react-redux';

import RadioConfiguration from './RadioConfiguration';
import ProfileForm from './ProfileForm';
import ProfileTable from './ProfileTable';
import { setRadioEnabled, setRadioChannelWidth, setRadioChannel, setSecondaryRadioChannel, addProfile, deleteProfile } from '../../redux/wireless';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Wireless extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            confirmDelete: false,
            profileToDelete: -1
        };
    }
    
    handleOpenDialog(profile) {
        this.setState({
            confirmDelete: true,
            profileToDelete: profile
        });
    }
    
    handleCloseDialog() {
        this.setState({
            confirmDelete: false,
            profileToDelete: -1
        });
    }
    
    handleDelete() {
        this.props.dispatch(deleteProfile(this.state.profileToDelete));
        this.handleCloseDialog();
    }
    
    render() {
        const { profiles, radios, dispatch } = this.props;
        const actions = [
            <FlatButton
                label="Delete"
                keyboardFocused={true}
                primary={true}
                onTouchTap={() => this.handleDelete()}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.handleCloseDialog()}
            />
        ];
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
                    handleDelete={ (i) => this.handleOpenDialog(i) }
                />
                <Dialog
                    title="Please Confirm"
                    actions={actions}
                    open={this.state.confirmDelete}
                    onRequestClose={() => this.handleCloseDialog()}
                >
                    Are you sure you want to delete this profile?
                </Dialog>
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