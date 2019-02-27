/* hashFile() takes in a file blob and waits for the file to be read.
Upon successful reading, onloadend is called and he crypto.subtle.digest function is called,
which lets us apply a named hash function to an ArrayBuffer, yielding another ArrayBuffer, which is then converted
to an array of unsigned 8 bit integer values and then the hex value is returned as the hash
For more info - https://jameshfisher.com/2017/10/30/web-cryptography-api-hello-world.html
*/

const hashDocument = file =>
  new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onloadend = async e => {
      const data = await window.crypto.subtle.digest(
        'SHA-256',
        e.target.result,
      );
      const fileHash = Array.prototype.map
        .call(new Uint8Array(data), x => `00${x.toString(16)}`.slice(-2))
        .join('');
      resolve(fileHash);
    };
    fileReader.readAsArrayBuffer(file);
  });

export default hashDocument;
