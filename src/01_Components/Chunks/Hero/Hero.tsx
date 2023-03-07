import s from './hero.module.scss'
import  {FC} from 'react'
import {Heading} from '../Heading/Heading'
import {Text} from '../Text/Text'
import {Button} from '../Button/Button'

type HeaderProps = {}

export const Hero: FC<HeaderProps> = () => {
    return (
        <section className={s.hero}>
            <div className={s.heroContent}>
                <Heading tagType="h2">Test assignment for front-end developer</Heading>
                <Text>
                    What defines a good front-end developer is one that has skilled
                    knowledge of HTML, CSS, JS with a vast understanding of User design
                    thinking as they'll be building web interfaces with accessibility in
                    mind. They should also be excited to learn, as the world of Front-End
                    Development keeps evolving.
                </Text>
                <Button value="Sign up" disabled={false} type="button"/>
            </div>
        </section>
    )
}
