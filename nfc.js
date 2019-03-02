
// without Babel in ES2015
const { NFC } = require('nfc-pcsc');
var ks = require('node-key-sender');
const nfc = new NFC(); // optionally you can pass logger
 
nfc.on('reader', reader => {
 
    console.log(`${reader.reader.name}  device attached`);
    // enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
    // when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
    // the response is available as card.data in the card event
    // see examples/basic.js line 17 for more info
    // reader.aid = 'F222222222';
    reader.on('card', card => {
        console.log(card.uid);
        ks.sendKeys(card.uid.toString())
    });
});
 
nfc.on('error', err => {
    console.log('an error occurred', err);
});