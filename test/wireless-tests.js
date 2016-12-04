import {expect} from 'chai';
import wirelessReducer, {setRadioEnabled, setRadioChannelWidth, setRadioChannel, setSecondaryRadioChannel} from '../src/redux/wireless';

const SET_RADIO_ENABLED = 'wireless/SET_RADIO_ENABLED';
const SET_RADIO_CHANNEL_WIDTH = 'wireless/SET_RADIO_CHANNEL_WIDTH';
const SET_RADIO_CHANNEL = 'wireless/SET_RADIO_CHANNEL';
const SET_SECONDARY_RADIO_CHANNEL = 'wireless/SET_SECONDARY_RADIO_CHANNEL';

let state;

describe('wirelessReducer', () => {
    
    beforeEach(() => {
        state = wirelessReducer();
    });
    
    describe('when the 2.4 GHz channel width is changed', () => {
        
        describe('and the width goes from "20/40 MHz Auto" to "20 MHz"', () => {
            
            it('should set the 2.4GHz "hideSecondary" property to true', () => {
                state = wirelessReducer(state, setRadioChannelWidth('2.4GHz', '20/40 MHz Auto'));
                state = wirelessReducer(state, setRadioChannelWidth('2.4GHz', '20 MHz'));
                expect(state.radios['2.4GHz'].hideSecondary).to.be.true;
            });
            
        });
        
        describe('and the width goes from "20 MHz" to "20/40 MHz Auto"', () => {
            
            it('should set the 2.4GHz "hideSecondary" property to false', () => {
                state = wirelessReducer(state, setRadioChannelWidth('2.4GHz', '20/40 MHz Auto'));
                expect(state.radios['2.4GHz'].hideSecondary).to.be.false;
            });
            
        });
        
    });
    
});