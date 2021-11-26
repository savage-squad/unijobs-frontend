import { UrlLogin} from "../../protocols/protocols-http";

describe('Protocols Http and Querys', () => {
    test('Ulr login', () => {
        const parsedUrl = UrlLogin.parseUrl('http://localhost/3000/login')

        expect(parsedUrl.href).toBe('http://localhost/3000/login')
        expect(parsedUrl.port).toBe('3000')

    })

    test('Response Query' , () => {
        const pasedUrl = UrlLogin.parseUrl('http://localhost/3000/login?user=user&password=password')
        const expectAuth = {
            user: 'user',
            password: 'password'
        }

        expect(pasedUrl.query).toBe(expectAuth)
    })
})