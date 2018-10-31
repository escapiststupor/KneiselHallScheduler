export const constructGraph = () => {};

export const schedule = () => {};

/* A utility function to check if the current color assignment 
is safe for vertex v i.e. checks whether the edge exists or not 
(i.e, graph[v][i]==1). If exist then checks whether the color to  
be filled in the new vertex(c is sent in the parameter) is already 
used by its adjacent vertices(i-->adj vertices) or not (i.e, color[i]==c) */
const isSafe = (v, G, color = [], c) => {
  for (let i = 0; i < v; i++) {
    if (G[v][i] && c === color[i]) return false;
  }
  return true;
};

  
/* A recursive utility function to solve m coloring problem */
const graphColoringUtil = (G, m, color = [], v) =>
{ 
    /* base case: If all vertices are assigned a color then 
       return true */
    if (v == V) 
        return true; 
  
    /* Consider this vertex v and try different colors */
    for (int c = 1; c <= m; c++) 
    { 
        /* Check if assignment of color c to v is fine*/
        if (isSafe(v, graph, color, c)) 
        { 
           color[v] = c; 
  
           /* recur to assign colors to rest of the vertices */
           if (graphColoringUtil (graph, m, color, v+1) == true) 
             return true; 
  
            /* If assigning color c doesn't lead to a solution 
               then remove it */
           color[v] = 0; 
        } 
    } 
  
    /* If no color can be assigned to this vertex then return false */
    return false; 
} 
