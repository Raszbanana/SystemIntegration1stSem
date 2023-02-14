const decodedString = 'pleaseEncodeMe';

const encodedString = btoa(decodedString);

console.log('encoded', encodedString);

console.log(atob('decoded', encodedString));

