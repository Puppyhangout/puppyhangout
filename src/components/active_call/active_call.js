import { Button } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { active_calls_store } from '../../stores/active_calls_store';

export const ActiveCall = observer(() => {

    const { first, address, last, age, callback_number, gender, level_of_responsiveness, chief_complaint, aptnum, gate_code, call_location, notes, covid, patient_name } = active_calls_store.get_active_call()
    const selected_call_index = active_calls_store.selected_call_index

    const handle_change = e => active_calls_store.set_call_field(selected_call_index, e.target.name, e.target.value)

    const google = window.google

    return <Card title="Active Call" style={{ backgroundColor: 'darkgray', borderRadius: '20px', height: '100%' }}>

        <h3>Caller info</h3>

        <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-4">
                <label htmlFor="firstname6">First Name</label>
                <InputText id="firstname6" type="text" name="first" value={first} onChange={handle_change} autoComplete="randomstring" />
            </div>
            <div className="p-field p-col-12 p-md-4">
                <label htmlFor="lastname6">Last Name</label>
                <InputText id="lastname6" type="text" name="last" value={last} onChange={handle_change} autoComplete="randomstring" />
            </div>
            <div className="p-field p-col-12 p-md-4">
                <label htmlFor="callbacknumber6">Callback Number</label>
                <InputText id="callbacknumber6" type="text" name="callback_number" value={callback_number} onChange={handle_change} autoComplete="randomstring" />
            </div>
        </div>



        <h3>Patient info</h3>
        {/* Address */}

        {active_calls_store.map_open && address &&
            <center>
                <iframe
                    title='address'
                    width="500"
                    height="250"
                    frameBorder={"0"}
                    style={{ "border": 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD31MDSqTlzFQI0UQgxLciQ2YpORZuniCY&q=${address}`}
                    allowFullScreen>
                </iframe>
            </center>
        }
        <div style={{display: 'grid', gridTemplateColumns: '8fr 2fr', alignItems: 'end', gap: '10px'}}>
        <PlacesAutocomplete
            value={address}
            onChange={(val) => {

                active_calls_store.map_open = false
                active_calls_store.set_call_field(selected_call_index, 'address', val)
            }
            }
            onSelect={async (val) => {
                active_calls_store.set_call_field(selected_call_index, 'address', val)
            }}
            searchOptions={{
                componentRestrictions: {
                    country: "ca",
                },
                location: new google.maps.LatLng(45.50169, -73.567253),
                radius: 10000,
                strictBounds: true
            }}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <label htmlFor="address">Address</label>
                    <InputText
                        style={{ width: '100%' }}
                        {...getInputProps({
                            autoComplete: 'pass',
                            placeholder: 'Type Address...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, suggestion_index) => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div key={suggestion_index}
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

        </PlacesAutocomplete>
        <Button style={{height: '32px', backgroundColor: 'lightgray'}} onClick={() => { active_calls_store.set_map_open(!active_calls_store.map_open) }}>Show Map</Button>
        </div>
        <br />

        <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-4">
                <label htmlFor="aptnum">Apt #</label>
                <InputText name="aptnum" value={aptnum} onChange={handle_change} id="aptnum" type="text" autoComplete="pass" />
            </div>
            <div className="p-field p-col-12 p-md-4">
                <label htmlFor="gate_code">Gate Code</label>
                <InputText name="gate_code" value={gate_code} onChange={handle_change} id="gate_code" type="text" autoComplete="pass" />
            </div>

            <div className="p-field p-col-12 p-md-4">
                <label htmlFor="call_location">Call Location</label>
                <Dropdown value={call_location} options={['M', 'D', 'W', 'CSL', 'Other']} onChange={
                    (e) => active_calls_store.set_call_field(selected_call_index, 'call_location', e.value)
                } placeholder="Choose one..." />
            </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-lg-6 p-md-6 p-sm-12">
                <label htmlFor="covid">Is there COVID-19?</label>
                <Dropdown value={covid} options={['Positive', 'Negative', 'Positive in the house', 'Unknown']} onChange={
                    (e) => active_calls_store.set_call_field(selected_call_index, 'covid', e.value)
                } placeholder="Choose one..." />
            </div>
            <div className="p-field p-col-12 p-md-6 p-sm-12">
                <label htmlFor="patient_name">Patient's Name</label>
                <InputText name="patient_name" value={patient_name} onChange={handle_change} id="patient_name" type="text" autoComplete="pass" />
            </div>
        </div>

        <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-3">
                <label htmlFor="age">Age</label>
                <InputText name="age" value={age} onChange={handle_change} id="age" type="text" autoComplete="pass" />
            </div>

            <div className="p-field p-col-12 p-md-3">
                <label htmlFor="gender">Gender</label>
                <Dropdown
                    value={gender}
                    options={['Male', 'Female']}
                    onChange={e => active_calls_store.set_call_field(selected_call_index, 'gender', e.value)} placeholder="Choose one..."
                />
            </div>


            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="lor">Patient responsiveness</label>
                <Dropdown
                    value={level_of_responsiveness}
                    options={['Responsive', ' Semi-Responsive', 'Unresponsive', 'Altered LOR', 'Unknown LOR']}
                    onChange={e => active_calls_store.set_call_field(selected_call_index, 'level_of_responsiveness', e.value)} placeholder="Choose one..."
                />
            </div>
        </div>

        <div className="p-fluid p-formgrid p-grid p-align-top">
            <div className="p-field p-col-12 p-lg-6 p-md-12">

                <label htmlFor="in">Chief Complaint</label>
                <span className="p-float-label">
                    <Dropdown
                        style={{ width: '200px', }}
                        className='full-width'
                        // optionLabel="chief_complaint"
                        value={chief_complaint}
                        options={[].map(el => ({ label: el }))}
                        onChange={e => active_calls_store.set_call_field(selected_call_index, 'chief_complaint', e.value)}
                        placeholder={'Select Chief Complaint'}
                        filter={true} />
                </span>
            </div>


            <div className="p-field p-col-12 p-lg-6 p-md-12">
                <label htmlFor="notes">Notes</label>
                <InputTextarea value={notes} onChange={(e) => active_calls_store.set_call_field(selected_call_index, 'notes', e.target.value)}
                    id="notes" type="text" rows="3"
                    autoComplete="pass" style={{ resize: 'none' }} />
            </div>
        </div>




    </Card >

})