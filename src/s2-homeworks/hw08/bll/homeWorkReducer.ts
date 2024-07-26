import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state:  UserType[], action: ActionType): UserType[] => { // need to fix any //done
    switch (action.type) {
        case 'sort': { // by name

            return action.payload === 'down' ? [...state].sort((a, b) => b.name.localeCompare(a.name))
                    :  [...state].sort((a, b) => a.name.localeCompare(b.name)) // need to fix
        }
        case 'check': {

            return state.filter(person => person.age > 18); // need to fix
        }
        default:
            return state
    }
}
