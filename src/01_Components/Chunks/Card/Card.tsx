import {FC} from 'react'
import {Text} from '../Text/Text'
import s from './card.module.scss'
import {Image} from '../Image/Image'

interface Props {
    imageSrc: string
    name: string
    position: string
    email: string
    phone: string
}

export const Card: FC<Props> = ({imageSrc, name, position, email, phone}) => {
    return (
        <div className={s.card}>
            <Image imageSrc={imageSrc}/>
            <Text>{name}.</Text>
            <Text>{position}</Text>
            <Text withTip>{email}</Text>
            <Text>{phone}</Text>
        </div>
    )
}
