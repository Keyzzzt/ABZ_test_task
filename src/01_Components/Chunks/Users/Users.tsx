import s from './users.module.scss'
import {FC} from 'react'
import {Card} from '../Card/Card'
import {UserType} from '../../../999_Store/Reducers/usersReducer/usersReducer'
import {Text} from '../Text/Text'

type HeaderProps = {
    users: Array<UserType> | null
    error: string
}

export const Users: FC<HeaderProps> = ({users, error}) => {
    return (
        <section className={s.users}>
            <div className={s.row}>
                {users && users.length ? users.map(u => (
                        <Card key={u.id} imageSrc={u.photo} name={u.name} position={u.position} email={u.email}
                              phone={u.phone}/>
                    ))
                    : <Text>{error}</Text>}
            </div>
        </section>
    )
}
