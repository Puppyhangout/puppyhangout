// @ts-nocheck
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { observer } from 'mobx-react-lite'
import { Card } from 'primereact/card'
import { InputTextarea } from 'primereact/inputtextarea'
import React from 'react'
import { color_palette } from '../../App'
import { active_calls_store } from '../../stores/active_calls_store'
import { Closable } from '../reusables/closeable'
import { LoadingButton } from '../reusables/loading_button'
import './assigned_units.css'
import * as moment from 'moment'

const AssignUnits = observer(() => {
    const { units = [] } = active_calls_store.get_active_call()
    const selected_call_index = active_calls_store.selected_call_index

    return (
        <div className='assigned-units-container'>
            {units.map((unit, i) => {
                return (
                    <Closable
                        key={i}
                        onClose={() => active_calls_store.remove_unit(selected_call_index, i)}
                    >
                        <div className='assigned-units-card'>
                            <Autocomplete
                                id={unit.unit_number}
                                size='small'
                                options={[]}
                                getOptionLabel={unit => unit.unit_number}
                                style={{ marginTop: '10px', width: '130px', top: '5px' }}
                                onChange={(event, unit) => {
                                    if (unit === null) {
                                        unit = {}
                                    }
                                    if (!unit.local_meta) {
                                        unit.local_meta = {}
                                    }
                                    const new_unit = unit
                                    new_unit.local_meta.input_unit_number = unit.unit_number
                                    active_calls_store.update_unit(selected_call_index, i, new_unit)
                                }}
                                // value={unit.unit_number}

                                inputValue={unit?.local_meta?.input_unit_number || ''}
                                onInputChange={(event, input_string) => {
                                    if (event === null) return
                                    const new_unit = { ...unit }
                                    new_unit.local_meta.input_unit_number = input_string
                                    active_calls_store.update_unit(selected_call_index, i, new_unit)
                                }}
                                renderInput={params => (
                                    <TextField {...params} label='Select unit' variant='outlined' />
                                )}
                            />

                            <br />
                            <span
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    columnGap: '5px'
                                }}
                            >
                                <LoadingButton
                                    // onClick={() => active_calls_store.handle_send_message(unit)}
                                    onClick={() =>
                                        active_calls_store.handle_send_message(
                                            selected_call_index,
                                            i,
                                            unit
                                        )
                                    }
                                    style={{
                                        backgroundColor: unit.sent_at
                                            ? '#60b760'
                                            : color_palette.blue,
                                        color: unit.sent_at ? 'black' : 'lightgray'
                                    }}
                                    loading={active_calls_store.get_loading(
                                        active_calls_store.handle_send_message,
                                        selected_call_index,
                                        i,
                                        unit
                                    )}
                                >
                                    Send
                                </LoadingButton>

                                <Button
                                    className='p-button-rounded p-button-secondary'
                                    style={{
                                        backgroundColor: unit.arrived_at ? '#60b760' : '#b7b4b4'
                                    }} //green : gray
                                    onClick={() => {
                                        var today = new Date()
                                        var time =
                                            today.getHours() +
                                            ':' +
                                            today.getMinutes() +
                                            ':' +
                                            today.getSeconds()

                                        active_calls_store.update_unit(selected_call_index, i, {
                                            ...unit,
                                            arrived_at: time
                                        })
                                    }}
                                >
                                    10-3
                                </Button>
                            </span>
                        </div>
                    </Closable>
                )
            })}

            <Button
                style={{
                    color: 'lightgray',
                    backgroundColor: color_palette.blue,
                    borderRadius: '15px',
                    height: '80px',
                    margin: '5px',
                    width: '100px'
                }}
                onClick={() => {
                    active_calls_store.add_unit(selected_call_index)
                }}
            >
                Add Units
            </Button>
        </div>
    )
})

const EmergencyVehicles = observer(() => {
    const { emergency_vehicles = [] } = active_calls_store.get_active_call()
    const selected_call_index = active_calls_store.selected_call_index

    return (
        <div className='assigned-units-container'>
            {emergency_vehicles.map((emergency_vehicle, i) => {
                return (
                    <Closable
                        key={i}
                        onClose={() =>
                            active_calls_store.remove_emergency_vehicle(selected_call_index, i)
                        }
                    >
                        <div className='assigned-units-card'>
                            <FormControl variant='outlined'>
                                <InputLabel id='demo-simple-select-outlined-label'>
                                    Vehicle Type
                                </InputLabel>

                                <Select
                                    labelId='demo-simple-select-outlined-label'
                                    id='demo-simple-select-outlined'
                                    value={emergency_vehicle.vehicle_type}
                                    style={{
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        width: '130px',
                                        height: '40px'
                                    }}
                                    onChange={e => {
                                        active_calls_store.update_emergency_vehicle(
                                            selected_call_index,
                                            i,
                                            { ...emergency_vehicle, vehicle_type: e.target.value }
                                        )
                                    }}
                                    variant='outlined'
                                    label='Vehicle Type'
                                >
                                    <MenuItem value={'10-9'}>10-9</MenuItem>
                                    <MenuItem value={'PD'}>PD</MenuItem>
                                    <MenuItem value={'FD'}>FD</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                size='small'
                                autoComplete='new-password'
                                id='outlined-basic'
                                label='Vehicle #'
                                variant='outlined'
                                style={{ width: '130px' }}
                                onChange={e =>
                                    active_calls_store.update_emergency_vehicle(
                                        selected_call_index,
                                        i,
                                        { ...emergency_vehicle, vehicle_number: e.target.value }
                                    )
                                }
                            />

                            <br />
                            <span
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    columnGap: '5px'
                                }}
                            >
                                <Button
                                    className='p-button-rounded p-button-secondary'
                                    style={{
                                        backgroundColor: emergency_vehicle.arrived_at
                                            ? '#60b760'
                                            : '#b7b4b4'
                                    }} //green : gray
                                    onClick={() => {
                                        var time = new Date().toISOString()

                                        active_calls_store.update_emergency_vehicle(
                                            selected_call_index,
                                            i,
                                            { ...emergency_vehicle, arrived_at: time }
                                        )
                                    }}
                                >
                                    10-3
                                </Button>

                                {emergency_vehicle.arrived_at && (
                                    <h5>
                                        {moment
                                            .utc(emergency_vehicle.arrived_at)
                                            .local()
                                            .format('HH:mm')}
                                    </h5>
                                )}
                            </span>
                        </div>
                    </Closable>
                )
            })}

            <Button
                style={{
                    color: 'lightgray',
                    backgroundColor: color_palette.blue,
                    borderRadius: '15px',
                    height: '80px',
                    margin: '5px',
                    width: '100px'
                }}
                onClick={() => {
                    active_calls_store.add_emergency_vehicle(selected_call_index)
                }}
            >
                Add 911
            </Button>
        </div>
    )
})

export const PostCallReport = observer(() => {
    const selected_call_index = active_calls_store.selected_call_index
    const { call_summary, time_cpr_started, time_epi_given } = active_calls_store.get_active_call()

    return (
        <Card title='Assigned Units' style={{ backgroundColor: 'darkgray', borderRadius: '20px' }}>
            <div className='p-fluid p-formgrid p-grid p-align-center'>
                <Card
                    className='p-field p-col-12 p-md-12'
                    style={{ backgroundColor: '#757575', borderRadius: '20px' }}
                >
                    <div className='p-fluid p-formgrid p-grid p-align-center'>
                        <AssignUnits />
                    </div>
                </Card>
            </div>

            <h2>Post Call Report</h2>

            <Card
                className='p-field p-col-12 p-md-12'
                style={{ backgroundColor: '#757575', borderRadius: '20px' }}
            >
                <div className='p-fluid p-formgrid p-grid p-align-center'>
                    <EmergencyVehicles />
                </div>
            </Card>

            <br />
            <div className='p-fluid p-formgrid p-grid p-align-center'>
                <div className='p-field p-col-12 p-md-4'>
                    <Button
                        style={{
                            width: '150px',
                            backgroundColor: time_cpr_started ? '#60b760' : 'white' //green : white
                        }}
                        onClick={() => {
                            var today = new Date()
                            var time =
                                today.getHours() +
                                ':' +
                                today.getMinutes() +
                                ':' +
                                today.getSeconds()
                            active_calls_store.set_call_field(
                                selected_call_index,
                                'time_cpr_started',
                                time
                            )
                        }}
                    >
                        CPR Started
                    </Button>
                </div>

                <div className='p-field p-col-12 p-md-4'>
                    <Button
                        style={{
                            width: '150px',
                            backgroundColor: time_epi_given ? '#60b760' : 'white' //green : white
                        }}
                        onClick={() => {
                            var today = new Date()
                            var time =
                                today.getHours() +
                                ':' +
                                today.getMinutes() +
                                ':' +
                                today.getSeconds()
                            active_calls_store.set_call_field(
                                selected_call_index,
                                'time_epi_given',
                                time
                            )
                        }}
                    >
                        Epi Given
                    </Button>
                </div>
            </div>

            <div className='p-fluid p-formgrid p-grid p-align-center'>
                <div className='p-field p-col-12 p-md-4'>
                    <h4 style={{ marginLeft: '50px' }}>{time_cpr_started}</h4>
                </div>

                <div className='p-field p-col-12 p-md-4'>
                    <h4 style={{ marginLeft: '50px' }}>{time_epi_given}</h4>
                </div>

                <div className='p-field p-col-12'>
                    <label htmlFor='cs'>Call summary</label>
                    <InputTextarea
                        value={call_summary}
                        onChange={e =>
                            active_calls_store.set_call_field(
                                selected_call_index,
                                'call_summary',
                                e.target.value
                            )
                        }
                        id='cs'
                        type='text'
                        rows='3'
                        autoComplete='pass'
                        style={{ resize: 'none' }}
                    />
                </div>
            </div>
            <br />

            <Button
                style={{
                    color: 'lightgray',
                    width: '120px',
                    float: 'right',
                    marginRight: '10px',
                    backgroundColor: color_palette.green
                }}
                onClick={() => {
                    if (window.confirm('Would you like to finish the call?')) {
                        active_calls_store.remove_call(active_calls_store.selected_call_index)
                    }
                }}
            >
                Finish call
            </Button>

            <br />
            <br />
        </Card>
    )
})
