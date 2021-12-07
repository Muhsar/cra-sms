/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { intersection } from 'lodash';
import jwt_decode from 'jwt-decode';

const easysch_token : {groups: any[]} = localStorage?.easysch_token && jwt_decode(localStorage?.easysch_token)
const {groups} = easysch_token
export function isArrayWithLength(arr) {
 return (Array.isArray(arr) && arr.length)
}

export function getAllowedRoutes(routes) {
 return routes.filter(({ permission }) => {
  if(!permission) return true;
  else if(!isArrayWithLength(permission)) return true;
  else return intersection(permission, groups).length;
 });
}