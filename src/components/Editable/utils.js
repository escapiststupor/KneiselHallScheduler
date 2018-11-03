export const fakeAPICall = content =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (content.toLowerCase().trim() === 'error') {
        reject(`Content "${content}" not allowed`);
      } else {
        resolve(content);
      }
    }, 1000);
  });
