import index from '../index.js';

describe('testing user reducer', () => {
    test('the state should be what I expect', () => {
        let action = {}
        let returnedState = index(undefined, action)
        console.log(returnedState);
        
        expect(returnedState).toEqual(
            { user: { id: null, userName: null, isLoading: false },
        login: { isLoading: false, message: '' },
        serviceList: [],
        newCustomer:
         { firstName: '',
           lastName: '',
           phone: '',
           orderNumber: '',
           orderDetails: [],
           totalCost: '',
           dropDate: '',
           pickUp: '',
           paid: false,
           complete: false },
        customerList: [] }
        )
    })
})