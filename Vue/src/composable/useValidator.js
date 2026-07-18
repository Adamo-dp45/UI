import { ref } from "vue"

/**
 * 
 * @param {object} fields 
 */
export function useValidator(fields) {
    const errors = ref({})
    const validate = () => {
        let valid = true
        for (const key in fields) {
            if (!fields[key]) {
                errors[key] = 'Ce champ est requis'
                valid = false
            } else {
                errors[key] = ''
            }
        }
        return valid
    }

    return {
        errors,
        validate
    }
}