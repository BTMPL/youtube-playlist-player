const axios = {
  get: jest.genMockFunction()
}

axios.get.mockImplementation((p) => {
  return Promise.resolve({})
});

module.exports = axios;