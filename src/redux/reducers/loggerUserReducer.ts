export interface UserInformation {
    id: number;
    username: string;
    token: string;
    name: string;
    role: string;
}

export const loggerUserReducer = (state = null, action): UserInformation | null => {
    switch (action.type) {
        case 'LOGGING_USER':
            return { id: action.payload.id, username: action.payload.username, token: action.payload.token, name: action.payload.name, role: action.payload.role };
        case 'LOGGOUT_USER':
            return null;
        default:
            return state;
    }
}