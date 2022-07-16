import { makeAutoObservable } from 'mobx';
import { get_loader_for_class_instance, setup_async_loaders } from '../helpers/async_loaders';
import { unique_id } from '../helpers/nanoid';
import { global_store } from './global_store';
import { remove } from 'ramda';
import { login_store } from '../components/login/login_store';


class ActiveCallStore {
    constructor() {
        setup_async_loaders(this)
        makeAutoObservable(this)
    }
    get_loading = (class_function, ...args) => get_loader_for_class_instance(this, class_function, ...args)


    active_calls = []
    selected_call_index = -1
    map_open = false

    set_map_open = (bool) => {
        this.map_open = bool
    }

    handle_send_message = async (call_index, unit_index, unit) => {
        const {
            age,
            level_of_responsiveness,
            chief_complaint,
            address,
            aptnum,
            gate_code,
            gender,
            notes,
            covid,
            patient_name
        } = this.get_active_call()
        const message = 
`Address: ${address}${aptnum ? `
Apt #: ${aptnum}` : ''}${gate_code ? `
Gate Code: ${gate_code}` : ''}${covid ? `
COVID-19: ${covid}` : ''}

${patient_name ? `Patient's Name: ${patient_name}` : ''}${gender ? `
Gender: ${gender}` : ''} ${age ? `
Age: ${age}` : ''}${level_of_responsiveness ? `
Patient is ${level_of_responsiveness}` : ''}${chief_complaint.label ? `
Chief Complaint: ${chief_complaint.label}` : ''}${notes ? `
Notes: ${notes}` : ''}
    
Dispatcher ${login_store.username}
https://www.google.com/maps/search/${address.replace(/\s/g, '+')}`
        await global_store.send_message(unit.unit_phone_number, message)

        this.update_unit(call_index, unit_index, { ...unit, sent_at: new Date().toISOString() })
    }

    add_unit = (call_index) => {

        this.set_call_field(call_index, 'units', [
            ...this.active_calls[call_index].units,
            this.blank_unit()
        ])
    }
    update_unit = (call_index, unit_index, unit) => {
        this.active_calls[call_index].units[unit_index] = {
            ...this.active_calls[call_index].units[unit_index],
            ...unit
        }
    }
    remove_unit = (call_index, unit_index) => {
        this.active_calls[call_index] = {
            ...this.active_calls[call_index],
            units: remove(unit_index, 1, this.active_calls[call_index].units)
        }
    }
    add_emergency_vehicle = (call_index) => {

        this.set_call_field(call_index, 'emergency_vehicles', [
            ...this.active_calls[call_index].emergency_vehicles,
            this.blank_emergency_vehicle()
        ])
    }
    update_emergency_vehicle = (call_index, emergency_vehicle_index, emergency_vehicle) => {
        this.active_calls[call_index].emergency_vehicles[emergency_vehicle_index] = {
            ...this.active_calls[call_index].emergency_vehicles[emergency_vehicle_index],
            ...emergency_vehicle
        }
    }
    remove_emergency_vehicle = (call_index, emergency_vehicle_index) => {
        this.active_calls[call_index] = {
            ...this.active_calls[call_index],
            emergency_vehicles: remove(emergency_vehicle_index, 1, this.active_calls[call_index].emergency_vehicles)
        }
    }

    update_selected_index = (index) => {
        this.selected_call_index = index
    }

    get_active_call = () => {
        return this.active_calls[this.selected_call_index] || {}
    }

    set_call_field = (index, key, value) => {
        (this.active_calls[index] || {})[key] = value
    }

    remove_call = (index) => {
        this.active_calls = remove(index, 1, this.active_calls)
        if (index === this.selected_call_index) {
            this.selected_call_index = -1
        }
    }


    create_blank_call = () => {
        const new_call = this.blank_call()
        this.active_calls.push(new_call)
        this.selected_call_index = this.active_calls.length - 1
    }

    blank_unit = () => {
        return {
            local_meta: {
                input_unit_number: ''
            },
            name: '',
            unit_number: '',
            unit_phone_number: '',
            sent_at: '',
            arrived_at: '',
        }
    }
    blank_emergency_vehicle = () => {
        return {
            vehicle_type: '',
            vehicle_number: '',
            arrived_at: '',
        }
    }

    blank_call = () => {
        return {
            id: unique_id(),
            first: '',
            last: '',
            callback_number: '',
            age: '',
            level_of_responsiveness: '',
            chief_complaint: '',
            address: '',
            aptnum: '',
            gate_code: '',
            gender: '',
            emergency_vehicles: [],
            call_summary: '',
            units: [],
            call_location: '',
            time_cpr_started: '',
            time_epi_given: '',
            notes: '',
            covid: '',
            patient_name: ''
        }
    }

}

export const active_calls_store = new ActiveCallStore()
window.active_calls_store = active_calls_store