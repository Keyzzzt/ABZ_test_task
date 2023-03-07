import {FC} from 'react'
import s from './tooltip.module.scss'

interface Props {
    tooltipText: string
    showTip: boolean
}

export const Tooltip: FC<Props> = ({tooltipText, showTip}) => {
    const tipClass = showTip ? s.tooltip : s.hide
    return <p className={tipClass}>{tooltipText}</p>
}
