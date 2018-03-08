/* tslint:disable */
import {
  Franchise,
  Store,
  Checkin,
  Recap,
  Roles,
  MemberCheckin
} from '../index';

declare var Object: any;
export interface MemberInterface {
  "franchise_id"?: any;
  "role_id"?: any;
  "store_id"?: any;
  "designation"?: string;
  "created_by"?: string;
  "created_by_role_id"?: string;
  "is_delete"?: number;
  "last_login"?: Date;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  "member_id"?: any;
  "password"?: string;
  accessTokens?: any[];
  Franchise?: Franchise;
  Store?: Store;
  CreaterStore?: Store[];
  CreaterCheckIn?: Checkin[];
  MemberTopic?: Checkin;
  CreateRecap?: Recap[];
  Recap?: Recap[];
  Role?: Roles;
  MemberCheckin?: MemberCheckin[];
}

export class Member implements MemberInterface {
  "franchise_id": any;
  "role_id": any;
  "store_id": any;
  "designation": string;
  "created_by": string;
  "created_by_role_id": string;
  "is_delete": number;
  "last_login": Date;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  "member_id": any;
  "password": string;
  accessTokens: any[];
  Franchise: Franchise;
  Store: Store;
  CreaterStore: Store[];
  CreaterCheckIn: Checkin[];
  MemberTopic: Checkin;
  CreateRecap: Recap[];
  Recap: Recap[];
  Role: Roles;
  MemberCheckin: MemberCheckin[];
  constructor(data?: MemberInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Member`.
   */
  public static getModelName() {
    return "Member";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Member for dynamic purposes.
  **/
  public static factory(data: MemberInterface): Member{
    return new Member(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Member',
      plural: 'Members',
      path: 'Members',
      properties: {
        "franchise_id": {
          name: 'franchise_id',
          type: 'any',
          default: <any>null
        },
        "role_id": {
          name: 'role_id',
          type: 'any',
          default: <any>null
        },
        "store_id": {
          name: 'store_id',
          type: 'any',
          default: <any>null
        },
        "designation": {
          name: 'designation',
          type: 'string',
          default: ''
        },
        "created_by": {
          name: 'created_by',
          type: 'string',
          default: ''
        },
        "created_by_role_id": {
          name: 'created_by_role_id',
          type: 'string',
          default: ''
        },
        "is_delete": {
          name: 'is_delete',
          type: 'number',
          default: 0
        },
        "last_login": {
          name: 'last_login',
          type: 'Date'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
        "member_id": {
          name: 'member_id',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
        Franchise: {
          name: 'Franchise',
          type: 'Franchise',
          model: 'Franchise'
        },
        Store: {
          name: 'Store',
          type: 'Store',
          model: 'Store'
        },
        CreaterStore: {
          name: 'CreaterStore',
          type: 'Store[]',
          model: 'Store'
        },
        CreaterCheckIn: {
          name: 'CreaterCheckIn',
          type: 'Checkin[]',
          model: 'Checkin'
        },
        MemberTopic: {
          name: 'MemberTopic',
          type: 'Checkin',
          model: 'Checkin'
        },
        CreateRecap: {
          name: 'CreateRecap',
          type: 'Recap[]',
          model: 'Recap'
        },
        Recap: {
          name: 'Recap',
          type: 'Recap[]',
          model: 'Recap'
        },
        Role: {
          name: 'Role',
          type: 'Roles',
          model: 'Roles'
        },
        MemberCheckin: {
          name: 'MemberCheckin',
          type: 'MemberCheckin[]',
          model: 'MemberCheckin'
        },
      }
    }
  }
}
