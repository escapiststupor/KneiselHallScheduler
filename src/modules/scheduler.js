import intersection from 'lodash/intersection';

export const makeCoachingGraph = ({
  groupList,
  coachList,
  groupIDs,
  acceptedDays,
}) => {
  const acceptedDaysList = {};
  Object.values(groupList).forEach(group => {
    if (coachList[group.coachID].coachingDays === acceptedDays) {
      acceptedDaysList[group.id] = { ...group };
    }
  });
  return makeRehearsalGraph({
    groupList: acceptedDaysList,
    groupIDs: Object.keys(acceptedDaysList),
  });
};

const existSameMember = (groupAIDs, groupBIDs) =>
  intersection(groupAIDs, groupBIDs);

export const makeRehearsalGraph = ({ groupList, groupIDs }) => {
  const numOfGroups = groupIDs.length;
  // initialize 2D array
  let G = new Array(numOfGroups)
    .fill(0)
    .map(() => new Array(numOfGroups).fill(0));
  // fill the upper half
  for (let i = 0; i < numOfGroups; i++) {
    for (let j = i; j < numOfGroups; j++) {
      if (j >= i) {
        G[i][j] =
          existSameMember(
            groupList[groupIDs[i]].members,
            groupList[groupIDs[j]].members
          ).length === 0
            ? 0
            : 1;
      }
    }
  }
  // fill in the other half
  for (let i = 0; i < numOfGroups; i++) {
    for (let j = i - 1; j >= 0; j--) {
      G[i][j] = G[j][i];
    }
  }

  return { G, groupIDs };
};

// G is adjacency matrix
export const tryScheduling = G => {
  const numOfColor = 3; // start trial from 3 colors
  let answer = GColoring(G, numOfColor);
  // 若三種顏色不能塗
  while (!answer) {
    answer = GColoring(G, numOfColor + 1);
  }
  return answer;
};

/* A utility function to check if the current color assignment is safe for vertex v */
const isSafe = (v, G, color, c) => {
  console.log('color vertex no.', v + 1, ' with color no.' + c);
  for (let i = 0; i < G.length; i++) {
    if (G[v][i] && c === color[i]) {
      console.log('CONFLICT! oops this color does not work, go back');
      return false;
    }
  }
  console.log('success! safe to color');
  return true;
};

/* A recursive utility function to solve m coloring  problem */
const GColoringUtil = (G, numOfColor, color, v) => {
  /* base case: If all vertices are assigned a color then return true */
  if (v === G.length) {
    console.log('ALL COLORED');
    return true;
  }

  /* Consider this vertex v and try different colors */
  for (let c = 1; c <= numOfColor; c++) {
    /* Check if assignment of color c to v is fine*/
    console.log('trying to color the ', v + 1, 'th vertex....');
    if (isSafe(v, G, color, c)) {
      color[v] = c;
      /* recur to assign colors to rest of the vertices */
      if (GColoringUtil(G, numOfColor, color, v + 1)) {
        return true;
      }
      /* If assigning color c doesn't lead to a solution then remove it */
      color.pop();
    } //end isSafe
    console.log('tried all the colors, cannot!');
  } //end trying the colors for loop
  /* If no color can be assigned to this vertex then return false */
  return false;
};

/* This function solves the m Coloring problem using Backtracking. It mainly uses GColoringUtil() to solve the problem. It returns false if the m colors cannot be assigned, otherwise return true and  prints assignments of colors to all vertices. Please note that there  may be more than one solutions, this function prints one of the feasible solutions.*/
const GColoring = (G, numOfColor) => {
  const color = [];
  //returns the array color
  // Initialize all color values as 0. This
  // initialization is needed correct functioning
  // of isSafe()
  for (let i = 0; i < G.length; i++) {
    color[i] = 0;
  }
  // Call GColoringUtil() for vertex 0
  if (!GColoringUtil(G, numOfColor, color, 0)) {
    return false;
  }
  // if solution exists, return color!
  return color;
};
