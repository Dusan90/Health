import { CLIENT } from '../constants/userRoles';


export function clientID(client) {
    return {
        type: CLIENT,
        client
    };
}
