const SET_RADIO_ENABLED = 'wireless/SET_RADIO_ENABLED';
const SET_RADIO_CHANNEL_WIDTH = 'wireless/SET_RADIO_CHANNEL_WIDTH';
const SET_RADIO_CHANNEL = 'wireless/SET_RADIO_CHANNEL';
const SET_SECONDARY_RADIO_CHANNEL = 'wireless/SET_SECONDARY_RADIO_CHANNEL';

const ADD_PROFILE = 'wireless/ADD_PROFILE';
const DELETE_PROFILE = 'wireless/DELETE_PROFILE';

const initialState = {
    radios: {
        "2.4GHz": {
            enabled: true,
            channel: 6,
            width: '20 MHz',
            primaryLabel: '2.4 GHz Channel',
            hideSecondary: true,
            secondaryChannel: 'Above',
            aboveEnabled: true,
            belowEnabled: true
        },
        "5GHz": {
            enabled: true,
            width: '20 MHz',
            channel: 36,
            validChannels: [36, 40, 44, 48, 149, 153, 157, 161, 165]
        }
    },
    profiles: [
        {
            radio: "2.4GHz",
            ssid: "Luxul1750",
            ssidBroadcast: true,
            clientIsolation: true,
            security: "wpa2"
        }
    ],
};

export default function wirelessReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_RADIO_ENABLED:
        {
            const { radio, enabled } = action;
            return {
                ...state,
                radios: {
                    ...state.radios,
                    [radio]: {
                        ...state.radios[radio],
                        enabled: enabled
                    }
                }
            }
        }
        case SET_RADIO_CHANNEL_WIDTH:
        {
            const { radio, width } = action;
            const hideSecondary = width === '20 MHz';
            let validChannels = [36, 40, 44, 48, 149, 153, 157, 161, 165];
            if (width === '20/40 MHz Auto') {
                validChannels = [36, 40, 44, 48, 149, 153, 157, 161];
            } else if (width === '20/40/80 MHz Auto') {
                validChannels = [40, 153];
            }
            let channel = state.radios['2.4GHz'].channel;
            if (radio === '5GHz') {
                channel = state.radios['5GHz'].channel;
                if (validChannels.findIndex((element) => element == channel) == -1) {
                    channel = validChannels[0];
                }
            }
            return {
                ...state,
                radios: {
                    ...state.radios,
                    [radio]: {
                        ...state.radios[radio],
                        primaryLabel: hideSecondary ? '2.4 GHz Channel' : 'Primary 2.4 GHz Channel',
                        hideSecondary: hideSecondary,
                        validChannels: validChannels,
                        width: width,
                        channel: channel
                    }
                }
            }
        }
        case SET_RADIO_CHANNEL:
        {
            const { radio, channel } = action;
            let secondaryChannel = state.radios['2.4GHz'].secondaryChannel;
            if (channel < 5) {
                secondaryChannel = 'Above';
            } else if (channel > 7) {
                secondaryChannel = 'Below';
            }
            return {
                ...state,
                radios: {
                    ...state.radios,
                    [radio]: {
                        ...state.radios[radio],
                        channel: channel,
                        secondaryChannel: secondaryChannel,
                        aboveEnabled: channel < 8,
                        belowEnabled: channel > 4
                    }
                }
            }
        }
        case SET_SECONDARY_RADIO_CHANNEL:
        {
            const { radio, secondaryChannel } = action;
            return {
                ...state,
                radios: {
                    ...state.radios,
                    [radio]: {
                        ...state.radios[radio],
                        secondaryChannel: secondaryChannel
                    }
                }
            }
        }
        case ADD_PROFILE:
        {
            const { profile } = action;
            return {
                ...state,
                profiles: [
                    ...state.profiles,
                    profile
                ]
            }
        }
        case DELETE_PROFILE:
        {
            const { profileIndex } = action;
            return {
                ...state,
                profiles: state.profiles.filter((x, i) => i !== profileIndex)
            }
        }
        default:
            return state;
    }
}

export function setRadioEnabled(radio, enabled) {
    return {
        type: SET_RADIO_ENABLED,
        radio: radio,
        enabled: enabled,
    }
}

export function setRadioChannelWidth(radio, width) {
    return {
        type: SET_RADIO_CHANNEL_WIDTH,
        radio: radio,
        width: width,
    }
}

export function setRadioChannel(radio, channel) {
    return {
        type: SET_RADIO_CHANNEL,
        radio: radio,
        channel: channel,
    }
}

export function setSecondaryRadioChannel(radio, secondaryChannel) {
    return {
        type: SET_SECONDARY_RADIO_CHANNEL,
        radio: radio,
        secondaryChannel: secondaryChannel,
    }
}

export function addProfile(profile) {
    return {
        type: ADD_PROFILE,
        profile
    }
}

export function deleteProfile(profileIndex) {
    return {
        type: DELETE_PROFILE,
        profileIndex
    }
}