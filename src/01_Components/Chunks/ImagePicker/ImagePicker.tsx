import s from "./imagePicker.module.scss"
import { FC, useState, ChangeEvent, useRef, useEffect } from "react"
import {
  validateImageDimensions,
  validateImageSize,
} from "../../../04_Utils/validation"
import { Preloader } from "../Preloader/Preloader"

type TextAreaProps = {
  setImageError: (value: string) => void
  setPhoto: (file: File) => void
  error: string
}

export const ImagePicker: FC<TextAreaProps> = ({
  setPhoto,
  setImageError,
  error,
}) => {
  console.log("IMAGE PICKER")
  const [imageName, setImageName] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [imagePreloader, setImagePreloader] = useState(false)
  const filePick = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handlePick = () => {
    filePick?.current?.click()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageError("")

      setImagePath(window.URL.createObjectURL(e.target.files[0]))

      if (validateImageSize(e.target.files[0])) {
        setPhoto(e.target.files[0])
        setImageName(e.target.files[0].name)
        return
      } else {
        setImageError("Image bigger than 5mb")
      }
    }
  }
  const buttonClass = error ? s.uploadButton + " " + s.error : s.uploadButton
  const inputClass = error ? s.uploadInput + " " + s.error : s.uploadInput

  useEffect(() => {
    if (imagePath) {
      setImagePreloader(true)
      setTimeout(() => {
        if (imageRef && imageRef.current) {
          const height = imageRef.current.clientHeight
          const width = imageRef.current.clientWidth
          if (height && width) {
            const isValid = validateImageDimensions(height, width)
            if (!isValid) {
              setImageError("Image smaller than 75x75 pixels")
            }
          }
          setImagePreloader((prev) => false)
        }
      }, 1000)
    }
  }, [imagePath, setImageError])

  return (
    <>
      <div className={s.imagePicker}>
        {imagePreloader && <Preloader />}
        <input
          onClick={handlePick}
          className={buttonClass}
          type="button"
          value="Upload"
          disabled={imagePreloader}
        />
        {error && <div className={s.errorText}>{error}</div>}

        <input
          className={inputClass}
          type="text"
          value={imageName}
          placeholder="Upload your photo"
        />
        {error && <span className={s.errorText}>{error}</span>}
        <input
          className={s.hiddenFileInput}
          ref={filePick}
          onChange={handleChange}
          type="file"
          accept=".jpg, .jpeg"
          // multiple
          id="image-file"
        />
      </div>
      <img className={s.hiddenImage} ref={imageRef} src={imagePath} alt="" />
    </>
  )
}
