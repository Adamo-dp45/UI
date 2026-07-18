export function Select({
    options = [],
    value,
    onChange,
    placeholder = 'Sélectionner une option',
    name,
    multiple = false
}) {

    const handleChange = (e) => {
        if (multiple) {
            const selected = Array.from(e.target.selectedOptions).map(option => option.value)
            onChange?.(selected)
        } else {
            onChange?.(e.target.value)
        }
    }

    return <>
        <select
            name={name}
            value={value}
            onChange={(e) => handleChange(e)}
            multiple={multiple}
            className="select"
        >
            {!multiple && placeholder && <option value="">{placeholder}</option>}
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </>
}