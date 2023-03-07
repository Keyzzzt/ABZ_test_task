import {FC, ReactNode, useState} from 'react'
import s from './text.module.scss'
import {Tooltip} from '../Tooltip/Tooltip'

interface Props {
    children: ReactNode
    error?: boolean
    withTip?: boolean
}

export const Text: FC<Props> = ({children, error, withTip}) => {
    const [showTip, setShowTip] = useState(false)
    const textClass = error ? s.textError : s.text
    const cursor = withTip ? {cursor: 'pointer'} : undefined
    return (
        <div className={s.textWrapper}>
            <p onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)} style={cursor}
               className={textClass}>{children}</p>
            {withTip && <Tooltip tooltipText={children as string} showTip={showTip}/>}
        </div>
    )
}
