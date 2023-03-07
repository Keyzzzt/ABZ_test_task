import { FC } from "react"
import s from "./notFound.module.scss"
import { Container } from "../../Chunks/Container/Container"
import { Text } from "../../Chunks/Text/Text"

export const Page404: FC = () => {
  return (
    <Container>
      <div className={s.pageNotFound}>404</div>
    </Container>
  )
}
