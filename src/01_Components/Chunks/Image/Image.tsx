import {FC} from 'react'
import s from './image.module.scss'
import noImage from './../../../assets/photo-cover.svg'

type ImageProps = {
    imageSrc: string
}

export const Image: FC<ImageProps> = ({imageSrc}) => {
    return <img className={s.image} src={imageSrc ? imageSrc : noImage} alt="photo"/>

}
