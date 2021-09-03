
const expectThrowsAsync = async (method, errorMessage) => {
    let error = null;

    try {
        await method();
    } catch (err) {
        error = err
    }

    expect(error).to.be.an('Error');

    if (errorMessage) {
        expect(error.message).to.equal(errorMessage)
    }
}

const expectNotThrowsAsync = async (method) => {
    let error = null;

    try {
        await method();
    } catch (err) {
        error = err
    }

    expect(error).to.be.null;
}

module.exports = {
    expectThrowsAsync,
    expectNotThrowsAsync,
};
