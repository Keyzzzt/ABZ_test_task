import s from './positions.module.scss'
import {FC} from 'react'
import {Preloader} from '../Preloader/Preloader'
import {Text} from '../Text/Text'
import { PositionType } from '../../../999_Store/Reducers/positionsReducer/positionsReducer'

type PositionProps = {
    positions: Array<PositionType> | null
    setPosition: (value: number) => void
    error: boolean
}

export const Positions: FC<PositionProps> = ({
                                                 positions,
                                                 setPosition,
                                                 error
                                             }) => {


    return (
        <div className={s.radio}>
            <Text error={error}>Select your position</Text>
            {!positions && <Preloader/>}
            {positions &&
                positions.map((pos) => {
                    const id = `${pos.name}-${pos.id}`
                    return (
                        <label className={s.radioItem} htmlFor={id} key={id}>
                            <input type="radio" value={pos.name} name="name" id={id}
                                   onChange={() => setPosition(pos.id)}/>
                            {pos.name}
                            <span/>
                        </label>
                    )
                })}
        </div>
    )
}
