import { clone } from 'ramda'

export const shared_store_prop = 'puppy_shared'

export const try_parse_json = (json_string: string, default_value: any = undefined) => {
    try {
        return JSON.parse(json_string)
    } catch (error) {
        return default_value
    }
}
export const save_to_local_storage = (local_storage_prop: string, state: any) => {
    localStorage.setItem(local_storage_prop, JSON.stringify(state))
}

/**
 * Loads date from local storage
 */
export const load_from_local_storage = <T>(local_storage_prop: string, existing_state: T) => {
    const local_storage_value = localStorage.getItem(local_storage_prop)
    if (!local_storage_value) {
        // short circuit to avoid JSON.parse errors
        return existing_state
    }

    const loaded_state = try_parse_json(local_storage_value, undefined)

    const new_state = clone(existing_state)
    if (loaded_state) {
        for (const prop in new_state) {
            const has_prop = Object.prototype.hasOwnProperty.call(loaded_state, prop)
            if (has_prop) {
                new_state[prop] = loaded_state[prop]
            }
        }
    }

    return new_state
}
