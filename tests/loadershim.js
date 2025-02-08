import jest from 'jest'

global.___loader = {
    enqueue: jest.fn(),
}
