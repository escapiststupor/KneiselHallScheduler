import uuidv4 from 'uuid';

export const getHashID = () => {
  return uuidv4();
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('KH_DB');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('KH_DB', serializedState);
  } catch (err) {
    console.error('cannot write to localStorage!');
  }
};
