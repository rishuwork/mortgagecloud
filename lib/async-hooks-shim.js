const AsyncLocalStorage = class {
    disable() { }
    getStore() { }
    run() { }
    enterWith() { }
    exit() { }
};

const createHook = () => ({
    enable: () => { },
    disable: () => { },
});

const executionAsyncId = () => 0;
const triggerAsyncId = () => 0;

module.exports = {
    AsyncLocalStorage,
    createHook,
    executionAsyncId,
    triggerAsyncId,
};
