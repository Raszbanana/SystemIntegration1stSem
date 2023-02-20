console.log(new Date());

// get date as a unix timestamp
const timestamp = new Date().getTime();

console.log('====== Region specific ======');

/* region specific */
console.log(new Intl.DateTimeFormat('en-US').format(new Date()));
console.log(new Intl.DateTimeFormat('da-DK').format(new Date()));
