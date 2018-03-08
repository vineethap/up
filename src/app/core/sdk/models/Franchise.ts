/* tslint:disable */
import {
  Store,
  Checkin,
  Recap,
  PaymentDetails,
  UserCards,
  Roles
} from '../index';

declare var Object: any;
export interface FranchiseInterface {
  "role_id": any;
  "store_id"?: any;
  "company_name": string;
  "company_domain"?: string;
  "email": string;
  "location"?: string;
  "payment_status"?: boolean;
  "subscription_id"?: string;
  "industry"?: string;
  "logo"?: string;
  "stripe_cusId"?: string;
  "last_login"?: string;
  "is_delete"?: number;
  "is_blocked"?: number;
  "addon"?: any;
  "years_operating"?: number;
  "payment_details"?: any;
  "created_by"?: number;
  "created_by_role_id"?: number;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "id"?: any;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "userId"?: any;
  "password"?: string;
  accessTokens?: any[];
  Store?: Store;
  FranchiseStore?: Store[];
  CreaterStore?: Store[];
  CreaterCheckIn?: Checkin[];
  Checkin?: Checkin[];
  CreateRecap?: Recap[];
  Billing?: PaymentDetails[];
  cards?: UserCards[];
  Role?: Roles;
}

export class Franchise implements FranchiseInterface {
  "role_id": any;
  "store_id": any;
  "company_name": string;
  "company_domain": string;
  "email": string;
  "location": string;
  "payment_status": boolean;
  "subscription_id": string;
  "industry": string;
  "logo": string;
  "stripe_cusId": string;
  "last_login": string;
  "is_delete": number;
  "is_blocked": number;
  "addon": any;
  "years_operating": number;
  "payment_details": any;
  "created_by": number;
  "created_by_role_id": number;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  "userId": any;
  "password": string;
  accessTokens: any[];
  Store: Store;
  FranchiseStore: Store[];
  CreaterStore: Store[];
  CreaterCheckIn: Checkin[];
  Checkin: Checkin[];
  CreateRecap: Recap[];
  Billing: PaymentDetails[];
  cards: UserCards[];
  Role: Roles;
  constructor(data?: FranchiseInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Franchise`.
   */
  public static getModelName() {
    return "Franchise";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Franchise for dynamic purposes.
  **/
  public static factory(data: FranchiseInterface): Franchise{
    return new Franchise(data);
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
      name: 'Franchise',
      plural: 'Franchises',
      path: 'Franchises',
      properties: {
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
        "company_name": {
          name: 'company_name',
          type: 'string',
          default: ''
        },
        "company_domain": {
          name: 'company_domain',
          type: 'string',
          default: ''
        },
        "email": {
          name: 'email',
          type: 'string',
          default: ''
        },
        "location": {
          name: 'location',
          type: 'string',
          default: ''
        },
        "payment_status": {
          name: 'payment_status',
          type: 'boolean',
          default: false
        },
        "subscription_id": {
          name: 'subscription_id',
          type: 'string',
          default: ''
        },
        "industry": {
          name: 'industry',
          type: 'string',
          default: ''
        },
        "logo": {
          name: 'logo',
          type: 'string',
          default: ''
        },
        "stripe_cusId": {
          name: 'stripe_cusId',
          type: 'string',
          default: ''
        },
        "last_login": {
          name: 'last_login',
          type: 'string',
          default: ''
        },
        "is_delete": {
          name: 'is_delete',
          type: 'number',
          default: 0
        },
        "is_blocked": {
          name: 'is_blocked',
          type: 'number',
          default: 0
        },
        "addon": {
          name: 'addon',
          type: 'any'
        },
        "years_operating": {
          name: 'years_operating',
          type: 'number'
        },
        "payment_details": {
          name: 'payment_details',
          type: 'any'
        },
        "created_by": {
          name: 'created_by',
          type: 'number',
          default: 0
        },
        "created_by_role_id": {
          name: 'created_by_role_id',
          type: 'number',
          default: 0
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
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
        "userId": {
          name: 'userId',
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
        Store: {
          name: 'Store',
          type: 'Store',
          model: 'Store'
        },
        FranchiseStore: {
          name: 'FranchiseStore',
          type: 'Store[]',
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
        Checkin: {
          name: 'Checkin',
          type: 'Checkin[]',
          model: 'Checkin'
        },
        CreateRecap: {
          name: 'CreateRecap',
          type: 'Recap[]',
          model: 'Recap'
        },
        Billing: {
          name: 'Billing',
          type: 'PaymentDetails[]',
          model: 'PaymentDetails'
        },
        cards: {
          name: 'cards',
          type: 'UserCards[]',
          model: 'UserCards'
        },
        Role: {
          name: 'Role',
          type: 'Roles',
          model: 'Roles'
        },
      }
    }
  }
}
