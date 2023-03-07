import {FC} from 'react'
import s from './loader.module.scss'

type PreloaderProps = {

}

export const Preloader: FC<PreloaderProps> = () => {
    return (
        // There is two loader with class loader_1 and loader_2
        <div className={s.loader_1}/>
    )
}
