import {expect} from 'chai';
import wirelessReducer, {setRadioEnabled, setRadioChannelWidth, setRadioChannel, setSecondaryRadioChannel} from '../src/redux/wireless';

let state;

describe('wirelessReducer', () => {
    
    beforeEach(() => {
        state = wirelessReducer();
    });
    
    describe('when the 2.4 GHz channel width is changed', () => {
        
        describe('and the width goes from "20/40 MHz Auto" to "20 MHz"', () => {
            
            beforeEach(() => {
                state = wirelessReducer(state, setRadioChannelWidth('2.4GHz', '20/40 MHz Auto'));
                state = wirelessReducer(state, setRadioChannelWidth('2.4GHz', '20 MHz'));
            });
            
            it('should set the 2.4GHz "primaryLabel" property to "2.4 GHz Channel"', () => {
                expect(state.radios['2.4GHz'].primaryLabel).to.equal('2.4 GHz Channel');
            });
            
            it('should set the 2.4GHz "hideSecondary" property to true', () => {
                expect(state.radios['2.4GHz'].hideSecondary).to.be.true;
            });
            
        });
        
        describe('and the width goes from "20 MHz" to "20/40 MHz Auto"', () => {
            
            beforeEach(() => {
                state = wirelessReducer(state, setRadioChannelWidth('2.4GHz', '20/40 MHz Auto'));
            });
            
            it('should set the 2.4GHz "primaryLabel" property to "Primary 2.4 GHz Channel"', () => {
                expect(state.radios['2.4GHz'].primaryLabel).to.equal('Primary 2.4 GHz Channel');
            });
            
            it('should set the 2.4GHz "hideSecondary" property to false', () => {
                expect(state.radios['2.4GHz'].hideSecondary).to.be.false;
            });
            
        });
        
    });
    
    describe('when the 2.4 GHz channel width is "20/40 MHz Auto"', () => {
        
        beforeEach(() => {
            state = wirelessReducer(state, setRadioChannelWidth('2.4GHz', '20/40 MHz Auto'));
        });
        
        describe('and the channel is changed to 4', () => {
            
            it('should set the 2.4GHz "secondaryChannel" property to "Above"', () => {
                state = wirelessReducer(state, setRadioChannel('2.4GHz', 4));
                expect(state.radios['2.4GHz'].secondaryChannel).to.equal('Above');
            });
            
        });
        
        describe('and the channel is changed to 8', () => {
            
            it('should set the 2.4GHz "secondaryChannel" property to "Below"', () => {
                state = wirelessReducer(state, setRadioChannel('2.4GHz', 8));
                expect(state.radios['2.4GHz'].secondaryChannel).to.equal('Below');
            });
            
        });
        
    });
    
    describe('when the 5 GHz channel width is changed', () => {
        
        describe('and the channel goes from "20 MHz" to "20/40 MHz Auto"', () => {
            
            it('should remove channel 165 from the list of available channels', () => {
                state = wirelessReducer(state, setRadioChannelWidth('5GHz', '20 MHz'));
                expect(state.radios['5GHz'].validChannels.includes(165)).to.be.true;
                
                state = wirelessReducer(state, setRadioChannelWidth('5GHz', '20/40 MHz Auto'));
                expect(state.radios['5GHz'].validChannels.includes(165)).to.be.false;
            });
            
        });
        
        describe('and the channel goes from "20/40 MHz Auto" to "20/40/80 MHz Auto"', () => {
            
            it('should only have channels 40 and 153 in the list of available channels', () => {
                state = wirelessReducer(state, setRadioChannelWidth('5GHz', '20 MHz'));
                state = wirelessReducer(state, setRadioChannelWidth('5GHz', '20/40/80 MHz Auto'));
                expect(state.radios['5GHz'].validChannels[0]).to.equal(40);
                expect(state.radios['5GHz'].validChannels[1]).to.equal(153);
            });
            
        });
        
    });
    
});