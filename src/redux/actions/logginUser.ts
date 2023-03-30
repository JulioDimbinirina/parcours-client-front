import { UserInformation } from "../reducers/loggerUserReducer"


export const loggingUser = (userInformation: UserInformation)  => {
    return {
        type: "LOGGING_USER",
        payload: userInformation
    }
}

export const loggoutUser = () => {
    return {
        type: "LOGGOUT_USER"
    }
}