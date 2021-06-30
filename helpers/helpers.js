import randomstring from 'randomstring';

const helpers = {
    createTokenValue: async () => {
      let token = randomstring.generate(20);
      return token
    }
}

export default helpers;