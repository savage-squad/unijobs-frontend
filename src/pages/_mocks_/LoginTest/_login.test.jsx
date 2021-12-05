import {} from '../../Login/index';
import * as ReactDOM from 'react-dom';

describe('Login components test'), () =>{
    
    

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Login />, container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it('Renders correctly document', () => {
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].name).toBe('email');
        expect(inputs[0].name).toBe('passsword');
        expect(inputs[0].name).toBe('email');

        const label = container.querySelector('label');
        expect(label).not.toBeInTheDocument();
    })
