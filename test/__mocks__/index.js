let _cookies = {
	token: undefined,
	_package_: undefined,
};

const createCookies = ()=>({
    set: jest.fn().mockImplementation((key, value, options = {}) => {
        const _object = new Object();
        _object[key] = value;
        return _cookies = { ..._cookies, ..._object };
    }),
    get: jest.fn().mockImplementation(key => _cookies[key]),
    remove:jest.fn(),
    removeAll:jest.fn()
});

const createRouter = ()=>({
    replace: jest.fn(),
    back: jest.fn(),
    push: jest.fn()
});

const createSwal = ()=> jest.fn()

export { createCookies, createRouter, createSwal };