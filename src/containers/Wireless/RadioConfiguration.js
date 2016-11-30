import React from 'react';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class RadioConfiguration extends React.Component {
    render() {
        const {
            radios: {
                "2.4GHz": {
                    enabled: radio24Enabled,
                    channel: radio24Channel,
                },
                "5GHz": {
                    enabled: radio5Enabled,
                    channel: radio5Channel,
                }
            },
            handleRadioToggle,
            handleRadioChannel
        } = this.props;

        return (
            <div className="radioConfiguration">
                <h3>Radio Configuration</h3>
                <Toggle
                    label="2.4 GHz Enabled"
                    toggled={radio24Enabled}
                    onToggle={ (event, value) => handleRadioToggle("2.4GHz", value) }
                />
                <SelectField
                    floatingLabelText="2.4 GHz Channel"
                    value={radio24Channel}
                    onChange={ (event, key, value) => handleRadioChannel("2.4GHz", value) }
                    fullWidth
                >
                    {[...Array(11)].map((x, i) => <MenuItem key={i} value={i} primaryText={i} /> )}
                </SelectField>
                <Toggle
                    label="5 GHz Enabled"
                    toggled={radio5Enabled}
                    onToggle={ (event, value) => handleRadioToggle("5GHz", value) }
                />
                <SelectField
                    floatingLabelText="5 GHz Channel"
                    value={radio5Channel}
                    onChange={ (event, key, value) => handleRadioChannel("5GHz", value) }
                    fullWidth
                >
                    <MenuItem value={40} primaryText="40" />
                    <MenuItem value={153} primaryText="153" />
                </SelectField>
            </div>
        )
    }
}

RadioConfiguration.propTypes = {
    radios: React.PropTypes.object,
    handleRadioToggle: React.PropTypes.func,
    handleRadioChannel: React.PropTypes.func,
};