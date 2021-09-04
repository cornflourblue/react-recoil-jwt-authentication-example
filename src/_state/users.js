import { atom } from 'recoil';

const usersAtom = atom({
    key: 'users',
    default: null
});

export { usersAtom };