import s from "./mainPage.module.scss"
import { FC, useState, useEffect, FormEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "../../Chunks/Container/Container"
import { Heading } from "../../Chunks/Heading/Heading"
import { Hero } from "../../Chunks/Hero/Hero"
import { Users } from "../../Chunks/Users/Users"
import { Input } from "../../Chunks/Input/Input"
import { Positions } from "../../Chunks/Positions/Positions"
import { getPositions } from "../../../999_Store/Reducers/positionsReducer/positionsReducer"
import {
  selectPositions,
  selectSignup,
  selectUsers,
} from "../../../999_Store/selectors"
import { ImagePicker } from "../../Chunks/ImagePicker/ImagePicker"
import { Button } from "../../Chunks/Button/Button"
import { getUsers } from "../../../999_Store/Reducers/usersReducer/usersReducer"
import { Preloader } from "../../Chunks/Preloader/Preloader"
import {
  validateEmail,
  validateName,
  validatePhone,
} from "../../../04_Utils/validation"
import { signup } from "../../../999_Store/Reducers/signupReducer/signupReducer"
import succesImage from "./../../../assets/success-image.svg"

type PropsType = {}
export type SignupPayload = {
  name: string
  email: string
  phone: string
  photo: File
  position_id: number
}

export const MainPage: FC<PropsType> = () => {
  const [positionError, setPositionError] = useState(false)
  const [imageError, setImageError] = useState("")
  const [inputError, setInputError] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [photo, setPhoto] = useState<File>()
  const [selectedPosition, setSelectedPosition] = useState<number>()
  const {
    positions,
    loading: positionsLoading,
    message: positionsMessage,
    success: positionSuccess,
  } = useSelector(selectPositions)
  const {
    user_id,
    loading: signUpLoading,
    message: signupMessage,
    fails: validationFails,
    success: signupSuccess,
  } = useSelector(selectSignup)
  const {
    users,
    loading: usersLoading,
    message: usersErrorMessage,
    links,
    total_pages,
    page,
  } = useSelector(selectUsers)
  const dispatch = useDispatch()
  const showMoreDisabled = total_pages === page || usersLoading

  const handlePosition = (value: number) => {
    setPositionError(false)
    setSelectedPosition(value)
  }

  const handleShowMore = () => {
    if (links && links.next_url) {
      dispatch(getUsers(links.next_url))
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPosition) {
      setPositionError(true)
    }
    if (!photo) {
      setImageError("Please add image")
    }
    if (!validatePhone(phone) || !validateEmail(email) || !validateName(name)) {
      setInputError(true)
    }
    if (positionError || imageError || inputError) return

    if (name && email && phone && selectedPosition && photo) {
      const data: SignupPayload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        position_id: selectedPosition,
        photo: photo,
      }
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        // @ts-ignore
        formData.append(key, data[key])
      })
      dispatch(signup(formData))
    }
  }

  useEffect(() => {
    if (!positions) {
      dispatch(getPositions())
    }
  }, [positions, dispatch])
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers(""))
    }
  }, [users, dispatch])

  return (
    <>
      <Hero />
      <Container>
        <Heading tagType="h1" marginTop="140px" marginBottom="50px">
          Working with GET request
        </Heading>
        {!users ? (
          <Preloader />
        ) : (
          <Users users={users} error={usersErrorMessage} />
        )}

        <Button
          onClick={handleShowMore}
          value="Show more"
          type="button"
          disabled={showMoreDisabled}
          marginTop="50px"
        />
        <Heading tagType="h1" marginTop="140px">
          Working with POST request
        </Heading>
        {signUpLoading && <Preloader />}
        {user_id ? (
          <img className={s.succesImage} src={succesImage} alt="" />
        ) : (
          <form onSubmit={handleSubmit} className={s.signupForm}>
            {!signupSuccess && <span className={s.phoneEmailExistsError}>{signupMessage}</span>}
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              returnValue={setName}
              name="name"
              inputError={inputError}
              setInputError={setInputError}
            />
            <Input
              type="text"
              placeholder="Email"
              value={email}
              returnValue={setEmail}
              name="email"
              inputError={inputError}
              setInputError={setInputError}
            />
            <Input
              type="text"
              placeholder="Phone"
              value={phone}
              returnValue={setPhone}
              name="phone"
              inputError={inputError}
              setInputError={setInputError}
              helperText="+380 XXX XX XX XX"
            />
            <div className={s.position}>
              {positionsLoading && <Preloader />}
              <Positions
                positions={positions}
                setPosition={handlePosition}
                error={positionError}
              />
            </div>
            <ImagePicker
              setPhoto={setPhoto}
              error={imageError}
              setImageError={setImageError}
            />
            <Button
              value="Sign up"
              type="submit"
              disabled={false}
              marginTop="50px"
            />
          </form>
        )}
      </Container>
    </>
  )
}
