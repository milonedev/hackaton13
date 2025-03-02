import bcrypt from 'bcrypt'

export const EncryptPassword = async(password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword;
}

export const ValidatePassword = async(password, hashPassword) => {
    const isValidatePass = await bcrypt.compare(password, hashPassword)
    return isValidatePass
}