import API from "./api";

export const getFriends = () => API.get("/users/friends");
export const getFollowers = () => API.get("/users/followers");
export const getFollowing = () => API.get("/users/following");
