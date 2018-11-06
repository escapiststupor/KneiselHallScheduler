import coaches from '../coaches';

describe('coaches reducer', () => {
  it('should add coach', () => {
    let state = {
      people: {},
      listIDs: [],
    };

    state = coaches(
      { people: {}, listIDs: [] },
      {
        type: 'ADD_COACH',
        payload: {
          id: 'Laurie',
          name: 'Laurie',
          coachingDays: 'MW',
          room: 'fishbowl',
        },
      }
    );
    expect(state).toEqual({
      people: {
        Laurie: {
          id: 'Laurie',
          name: 'Laurie',
          coachingDays: 'MW',
          room: 'fishbowl',
        },
      },
      listIDs: ['Laurie'],
    });
  });
});
