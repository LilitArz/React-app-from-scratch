import React, { useCallback, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'

/**
 * @param {import('./types').InputProps} props
 * @returns {React.ComponentElement}
 */
const Input = (props) => {
    const {
        style,
        value,
        label,
        type = 'text',
        onChange,
        onBlur,
        disabled,
        variant = 'outlined',
        maxLength,
        minValue,
        maxValue,
        multiline = false,
        className,
    } = props
    const [_value, setValue] = useState(value || '')

    const onChangeHandler = (e) => {
        const inputedValue = e.target.value

        onChange && onChange(inputedValue)
        setValue(inputedValue)
    }

    const onBlurHandler = (e) => {
        onBlur && onBlur(e.target.value)
    }

    const handleKeyPress = useCallback(
        (e) => {
            if (minValue >= 0 && e.key === '-') {
                e.preventDefault()
            }
        },
        [minValue]
    )

    useEffect(() => {
        if (value !== _value) {
            setValue(value || '')
        }
    }, [value])

    return (
        <TextField
            className={className}
            tabIndex={0}
            label={label}
            multiline={multiline}
            margin="none"
            type={type}
            style={style}
            variant={variant}
            value={_value || ''}
            InputProps={{ inputProps: { min: minValue, max: maxValue } }}
            disabled={disabled}
            onBlur={onBlurHandler}
            onChange={onChangeHandler}
            helperText={
                maxLength ? `${_value.toString().length}/${maxLength}` : ''
            }
            onKeyPress={handleKeyPress}
            inputProps={{
                style: {
                    height: 40,
                    width: '100%',
                    boxSizing: 'border-box',
                    tabIndex: 0,
                },
            }}
            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}

export default Input
