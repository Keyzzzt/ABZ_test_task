import s from './container.module.scss'
import  {FC, ReactNode} from 'react'

interface Props {
    children: ReactNode
}

export const Container: FC<Props> = ({children}) => {
    return (
        <main className={s.container}>
            {children}
        </main>
    )
}
