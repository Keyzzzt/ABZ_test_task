import s from './header.module.scss'
import logo from './../../../assets/Logo.svg'
import {FC} from 'react'
import {Container} from '../Container/Container'
import {Button} from '../Button/Button'

type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
    return (
        <Container>
            <header className={s.header}>
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
                <nav>
                    <Button value="Users" disabled={false} type="button"/>
                    <Button value="Sign up" disabled={false} type="button"/>
                </nav>
            </header>
        </Container>
    )
}
