import s from './button.module.scss'
import {FC} from 'react'

type ButtonProps = {
    value: string
    type: 'submit' | 'button'
    disabled: boolean
    marginTop?: string
    onClick?: any
}

export const Button: FC<ButtonProps> = ({value, type, disabled, marginTop, onClick}) => {
    return (
        <input onClick={onClick} style={{marginTop}} className={s.button} type={type} disabled={disabled}
               value={value}/>
    )
}
