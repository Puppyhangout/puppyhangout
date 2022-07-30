import { toJS } from 'mobx'
import { diff_mutation } from 'orma/build/mutate/diff/diff_mutation'
import { clone, isEmpty } from 'ramda'
import { orma_mutate } from './api_helpers'
import { show_toast } from './helpers'

const get_type = (something: any) => {
    if (something === null) {
        return 'Null'
    }
    if (something === undefined) {
        return 'Undefined'
    }

    return Object.prototype.toString.call(something).slice(8, -1)
}

// calls fn on every object in input array. Also moves into any arrays it finds and calls
// walk recursively on those.
// fn is a function of (object, path_to_object) -> null
export const walk_object = (fn: any, obj: any, current_path: any = []) => {
    const obj_type: any = get_type(obj)

    if (obj_type === 'Object') {
        fn(obj, current_path)
        for (const prop in obj) {
            walk_object(fn, obj[prop], [...current_path, prop])
        }
    }

    if (obj_type === 'Array') {
        fn(obj, current_path)
        obj.forEach((el: any, i: any) => {
            walk_object(fn, el, [...current_path, i])
        })
    }
}

export type DeepPartialProps<T> = T extends any[]
    ? DeepPartialProps<T[number]>[]
    : T extends object
    ? { [P in keyof T]?: DeepPartialProps<T[P]> }
    : T

// Implemented separately from DeepPartial for typescript performance reasons
export type FormObject<T> = T extends any[]
    ? FormObject<T[number]>[]
    : T extends object
    ? { [P in keyof T]?: FormObject<T[P]> } & {
          _tombstoned?: boolean
      }
    : T

export type OrmaForm<T extends Record<string, any>> = {
    modified: FormObject<T>
    original: FormObject<T>
}

export const empty_form = <T>(): OrmaForm<T> => ({
    modified: {} as FormObject<T>,
    original: {} as FormObject<T>
})

export const reset_form = <T>(form: OrmaForm<T>, original_mutation: FormObject<T>) => {
    form.original = original_mutation
    form.modified = clone(original_mutation)
}

export const get_form_type = <T extends Record<string, any>>(form: OrmaForm<T>) => {
    return Object.keys(form.original).length === 0 ? 'create' : 'update'
}

export const diff_form = <T>(form: OrmaForm<T>) => {
    const cloned_form = clone(form)
    delete_tombstoned_records(cloned_form)
    strip_local_values(cloned_form)
    const output = diff_mutation(cloned_form.original, cloned_form.modified)

    return output
}

/**
 * Strips any props that start with an _
 */
export const strip_local_values = (obj: any) => {
    walk_object((val: any) => {
        if (typeof val === 'object') {
            Object.keys(val).forEach(key => {
                if (key[0] === '_') {
                    delete val[key]
                }
            })
        }
    }, obj)
}

/**
 * Strips any props that start with an _
 */
export const delete_tombstoned_records = (obj: any) => {
    walk_object((val: any) => {
        if (Array.isArray(val)) {
            // filter out all the records that are tombstoned
            let indices_to_splice: number[] = []
            val.forEach((record, i) => {
                if (record?._tombstoned) {
                    indices_to_splice.push(i)
                }
            })
            indices_to_splice.reverse().forEach(i => val.splice(i, 1))
        }
    }, obj)
}

export const save_form = async <T>(form: OrmaForm<T>, refresh: Function) => {
    const mutation = toJS(diff_form(form))
    if (mutation === undefined || Object.keys(mutation).length === 0) {
        return show_toast('info', 'No changes to save')
    }

    await orma_mutate(mutation)

    await refresh()

    show_toast('success', 'Saved changes')
}

// TODO: make errors work

export const can_save_form = <T>(form: OrmaForm<T>) => {
    return !isEmpty(diff_form(form))
}

/**
 * splices given index or tombstones if it is already created in the database
 */
export const form_splice = (
    array: DeepPartialProps<{ id?: number; _tombstoned?: boolean }[]> | undefined,
    index: number
) => {
    if (array === undefined) {
        return
    }

    const is_created = array[index]?.id !== undefined

    if (is_created) {
        array[index]._tombstoned = true
    } else {
        array.splice(index, 1)
    }
}
