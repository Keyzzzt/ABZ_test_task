export const validateName = (name: string) => {
    const MIN = 2
    const MAX = 60
    const length = name.length
    return length >= MIN && length <= MAX
}

export const validateImageSize = (file: File) => {
    const MAX_SIZE_IN_MB = 5
    return file.size <= MAX_SIZE_IN_MB * 1024 * 1024
}


export const validateImageDimensions = (height: number, width: number) => {
    const MIN_HEIGHT = 75
    const MIN_WEIGHT = 75
    return height >= MIN_HEIGHT && width >= MIN_WEIGHT
}

export const validateEmail = (email: string) => {
    if (email) {
        let matchEmail =
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
        return !!email.toLocaleLowerCase().match(matchEmail)
    }
}
export const validatePhone = (phone: string) => {
    if (phone) {
        let matchEmail = /^[\+]{0,1}380([0-9]{9})$/
        return !!phone.toLocaleLowerCase().match(matchEmail)
    }
}
