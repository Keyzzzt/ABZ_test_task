import s from './input.module.scss'
import React, {FC, ChangeEvent, useState, useEffect} from 'react'
import {validateEmail, validatePhone} from '../../../04_Utils/validation'

type InputProps = {
    helperText?: string
    type: string
    placeholder: string
    id?: string
    label?: string
    name: string
    inputError: boolean
    value: string
    resetIsDirty?: boolean
    returnValue(value: string): void
    setInputError(value: boolean): void
}

export const Input: FC<InputProps> = React.memo(({
                                                     helperText,
                                                     resetIsDirty,
                                                     type,
                                                     placeholder,
                                                     name,
                                                     inputError,
                                                     returnValue,
                                                     setInputError,
                                                     label,
                                                     value,
                                                     id = ''
                                                 }) => {
    console.log('CUSTOM INPUT')

    const [errorMessage, setErrorMessage] = useState('Empty field')
    const [isDirty, setIsDirty] = useState(false)
    const showError = errorMessage && isDirty

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputError(false)
        returnValue(e.target.value)
    }

    useEffect(() => {
        if (resetIsDirty) {
            setIsDirty(false)
        }
    }, [resetIsDirty])
    useEffect(() => {
        if (inputError) {
            setIsDirty(true)
        }
    }, [inputError])

    useEffect(() => {
        switch (name) {
            case 'email':
                if (validateEmail(value)) {
                    setErrorMessage('')
                    break
                } else {
                    setErrorMessage('Enter a valid email')
                    break
                }
            case 'name':
                if (value?.length >= 2 && value?.length <= 60) {
                    setErrorMessage('')
                    break
                } else {
                    setErrorMessage('Name between 2 and 60 characters')
                    break
                }
            case 'phone':
                if (validatePhone(value)) {
                    setErrorMessage('')
                    break
                } else {
                    setErrorMessage('Valid format is +380 XXX XX XX XX')
                    break
                }
        }
    }, [value])

    const inputClass = showError ? s.errorInput : s.input

    return (
        <div className={s.inputContainer}>
            <div className={s.inputContainer}>
                {id && <label htmlFor={id}>{label}</label>}
                <input
                    id={id}
                    onBlur={() => setIsDirty(true)}
                    className={inputClass}
                    onChange={onChangeHandler}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                />
            </div>
            {showError && <div className={s.errorText}>{errorMessage}</div>}
            {!showError && <div className={s.text}>{helperText}</div>}
        </div>
    )
})
