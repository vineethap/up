/* tslint:disable */
import {
  Member,
  Franchise,
  Roles
} from '../index';

declare var Object: any;
export interface StoreInterface {
  "store_name": string;
  "franchise_id": any;
  "store_loc": string;
  "brand": string;
  "created_by": any;
  "created_by_role_id": any;
  "is_delete"?: number;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  Member?: Member[];
  Franchise?: Franchise[];
  FranchiseLocation?: Franchise;
  MemberCreator?: Member;
  FranchiseCreator?: Franchise;
  RoleCreator?: Roles;
}

export class Store implements StoreInterface {
  "store_name": string;
  "franchise_id": any;
  "store_loc": string;
  "brand": string;
  "created_by": any;
  "created_by_role_id": any;
  "is_delete": number;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  Member: Member[];
  Franchise: Franchise[];
  FranchiseLocation: Franchise;
  MemberCreator: Member;
  FranchiseCreator: Franchise;
  RoleCreator: Roles;
  constructor(data?: StoreInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Store`.
   */
  public static getModelName() {
    return "Store";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Store for dynamic purposes.
  **/
  public static factory(data: StoreInterface): Store{
    return new Store(data);
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
      name: 'Store',
      plural: 'Stores',
      path: 'Stores',
      properties: {
        "store_name": {
          name: 'store_name',
          type: 'string',
          default: ''
        },
        "franchise_id": {
          name: 'franchise_id',
          type: 'any',
          default: <any>null
        },
        "store_loc": {
          name: 'store_loc',
          type: 'string',
          default: ''
        },
        "brand": {
          name: 'brand',
          type: 'string',
          default: ''
        },
        "created_by": {
          name: 'created_by',
          type: 'any',
          default: <any>null
        },
        "created_by_role_id": {
          name: 'created_by_role_id',
          type: 'any',
          default: <any>null
        },
        "is_delete": {
          name: 'is_delete',
          type: 'number',
          default: 0
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
      },
      relations: {
        Member: {
          name: 'Member',
          type: 'Member[]',
          model: 'Member'
        },
        Franchise: {
          name: 'Franchise',
          type: 'Franchise[]',
          model: 'Franchise'
        },
        FranchiseLocation: {
          name: 'FranchiseLocation',
          type: 'Franchise',
          model: 'Franchise'
        },
        MemberCreator: {
          name: 'MemberCreator',
          type: 'Member',
          model: 'Member'
        },
        FranchiseCreator: {
          name: 'FranchiseCreator',
          type: 'Franchise',
          model: 'Franchise'
        },
        RoleCreator: {
          name: 'RoleCreator',
          type: 'Roles',
          model: 'Roles'
        },
      }
    }
  }
}
