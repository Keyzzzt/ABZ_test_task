import {FC, ReactNode} from 'react'
import s from './heading.module.scss'

type HeadingProps = {
    tagType: 'h1' | 'h2'
    children: ReactNode
    marginTop?: string
    marginBottom?: string

}

export const Heading: FC<HeadingProps> = ({tagType, children, marginTop, marginBottom}) => {
    return tagType === 'h1'
        ? <h1 style={{marginTop, marginBottom}} className={s.heading}>{children}</h1>
        : <h2 style={{marginTop, marginBottom}} className={s.heading}>{children}</h2>
}
