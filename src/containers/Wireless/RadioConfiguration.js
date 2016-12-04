import React from 'react';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

export default class RadioConfiguration extends React.Component {
    render() {
        const {
            radios: {
                "2.4GHz": {
                    enabled: radio24Enabled,
                    channel: radio24Channel,
                    width: radio24Width,
                    primaryLabel,
                    hideSecondary,
                    secondaryChannel,
                    aboveEnabled,
                    belowEnabled
                },
                "5GHz": {
                    enabled: radio5Enabled,
                    channel: radio5Channel,
                    width: radio5Width,
                    validChannels
                }
            },
            handleRadioToggle,
            handleRadioChannelWidth,
            handleRadioChannel,
            handleSecondaryRadioChannel
        } = this.props;
        
        return (
            <Paper className="radioConfiguration" zDepth={4}>
                <div>
                    <h3>Radio Configuration</h3>
                    <Toggle
                        label="2.4 GHz Enabled"
                        toggled={radio24Enabled}
                        onToggle={ (event, value) => handleRadioToggle("2.4GHz", value) }
                    />
                    <SelectField
                        disabled={!radio24Enabled}
                        floatingLabelText="2.4 GHz Channel Width"
                        value={radio24Width}
                        onChange={ (event, key, value) => handleRadioChannelWidth("2.4GHz", value) }
                        fullWidth
                    >
                        <MenuItem value="20 MHz" primaryText="20 MHz" />
                        <MenuItem value="20/40 MHz Auto" primaryText="20/40 MHz Auto" />
                    </SelectField>
                    <SelectField
                        disabled={!radio24Enabled}
                        floatingLabelText={primaryLabel}
                        value={radio24Channel}
                        onChange={ (event, key, value) => handleRadioChannel("2.4GHz", value) }
                        fullWidth
                    >
                        {[...Array(11)].map((x, i) => <MenuItem key={i+1} value={i+1} primaryText={i+1} /> )}
                    </SelectField>
                    <SelectField
                        disabled={!radio24Enabled}
                        className={hideSecondary ? 'hidden' : ''}
                        floatingLabelText="Secondary 2.4 GHz Channel"
                        value={secondaryChannel}
                        onChange={ (event, key, value) => handleSecondaryRadioChannel("2.4GHz", value) }
                        fullWidth
                    >
                        <MenuItem value="Above" primaryText="Above" disabled={!aboveEnabled} />
                        <MenuItem value="Below" primaryText="Below" disabled={!belowEnabled} />
                    </SelectField>
                    <Toggle
                        label="5 GHz Enabled"
                        toggled={radio5Enabled}
                        onToggle={ (event, value) => handleRadioToggle("5GHz", value) }
                    />
                    <SelectField
                        disabled={!radio5Enabled}
                        floatingLabelText="5 GHz Channel Width"
                        value={radio5Width}
                        onChange={ (event, key, value) => handleRadioChannelWidth("5GHz", value) }
                        fullWidth
                    >
                        <MenuItem value="20 MHz" primaryText="20 MHz" />
                        <MenuItem value="20/40 MHz Auto" primaryText="20/40 MHz Auto" />
                        <MenuItem value="20/40/80 MHz Auto" primaryText="20/40/80 MHz Auto" />
                    </SelectField>
                    <SelectField
                        disabled={!radio5Enabled}
                        floatingLabelText="5 GHz Channel"
                        value={radio5Channel}
                        onChange={ (event, key, value) => handleRadioChannel("5GHz", value) }
                        fullWidth
                    >
                        {validChannels.map((x, i) => <MenuItem key={x} value={x} primaryText={x} />)}
                    </SelectField>
                </div>
            </Paper>
        )
    }
}

RadioConfiguration.propTypes = {
    radios: React.PropTypes.object,
    handleRadioToggle: React.PropTypes.func,
    handleRadioChannelWidth: React.PropTypes.func,
    handleRadioChannel: React.PropTypes.func,
    handleSecondaryRadioChannel: React.PropTypes.func
};
