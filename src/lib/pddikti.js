import { useFetch } from "vue-composable";
const { exec, json } = useFetch()
async function getData({ act, filter = "", order = "", limit = 10, offset = 0 } = {}) {
    if (!act) return { status: false, message: 'Fungsi tidak dikenali' }
    // params['token'] = localStorage.getItem('token')
    try {
        await exec(import.meta.env.VITE_PDDIKTI_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                act: act,
                filter: filter,
                order: order,
                limit: limit,
                offset: offset,
                token: sessionStorage.getItem('token')
            })
        })
        const response = json.value
        if (response['error_code'] == "0") {
            return { status: true, data: response['data'] }
        } else {
            return { status: false, message: response['error_desc'] }
        }
    } catch (error) {
        return { status: false, message: error }
    }
}
async function postData({ act, record } = {}) {
    if (!act) return { status: false, message: 'Fungsi tidak dikenali' }
    if (!record || !Object.entries(record).length) return { status: false, message: 'Data tidak ada' }
    try {
        await exec(import.meta.env.VITE_PDDIKTI_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                act: act,
                record: record,
                token: sessionStorage.getItem('token')
            })
        })
        const response = json.value
        if (response['error_code'] == "0") {
            return { status: true, data: response['data'] }
        } else {
            return { status: false, message: response['error_desc'] }
        }
    } catch (error) {
        return { status: false, message: error }
    }
}
async function putData({ act, record, keys } = {}) {
    if (!act) return { status: false, message: 'Fungsi tidak dikenali' }
    if (!record || !Object.entries(record).length) return { status: false, message: 'Data tidak ada' }
    if (!keys || !Object.entries(keys).length) return { status: false, message: 'Keys tidak ditemukan' }
    try {
        await exec(import.meta.env.VITE_PDDIKTI_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                act: act,
                record: record,
                key: keys,
                token: sessionStorage.getItem('token')
            })
        })
        const response = json.value
        if (response['error_code'] == "0") {
            return { status: true, data: response['data'] }
        } else {
            return { status: false, message: response['error_desc'] }
        }
    } catch (error) {
        return { status: false, message: error }
    }
}
async function deleteData({ act, keys } = {}) {
    if (!act) return { status: false, message: 'Fungsi tidak dikenali' }
    if (!keys || !Object.entries(keys).length) return { status: false, message: 'Keys tidak ditemukan' }
    try {
        await exec(import.meta.env.VITE_PDDIKTI_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                act: act,
                key: keys,
                token: sessionStorage.getItem('token')
            })
        })
        const response = json.value
        if (response['error_code'] == "0") {
            return { status: true, data: response['data'] }
        } else {
            return { status: false, message: response['error_desc'] }
        }
    } catch (error) {
        return { status: false, message: error }
    }
}
async function getDictionary(fungsi) {
    if (!act) return { status: false, message: 'Fungsi tidak dikenali' }
    // params['token'] = localStorage.getItem('token')
    try {
        await exec(import.meta.env.VITE_PDDIKTI_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                act: 'GetDictionary',
                fungsi: fungsi,
                token: sessionStorage.getItem('token')
            })
        })
        const response = json.value
        if (response['error_code'] == "0") {
            return { status: true, data: response['data'] }
        } else {
            return { status: false, message: response['error_desc'] }
        }
    } catch (error) {
        return { status: false, message: error }
    }
}
async function parseSchemas(schema) {
    return schema
}

export {
    getData,
    postData,
    putData,
    deleteData,
    parseSchemas
}