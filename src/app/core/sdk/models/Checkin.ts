/* tslint:disable */
import {
  Member,
  Franchise,
  Recap,
  Roles,
  MemberCheckinType,
  MemberCheckin
} from '../index';

declare var Object: any;
export interface CheckinInterface {
  "franchise_id"?: any;
  "checkin_date"?: Date;
  "save_status"?: number;
  "created_by"?: any;
  "created_by_role_id"?: any;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  CreaterMember?: Member;
  CreaterFranchise?: Franchise;
  Franchise?: Franchise;
  Recap?: Recap[];
  Roles?: Roles;
  MemberCheckinType?: MemberCheckinType[];
  MemberCheckin?: MemberCheckin[];
}

export class Checkin implements CheckinInterface {
  "franchise_id": any;
  "checkin_date": Date;
  "save_status": number;
  "created_by": any;
  "created_by_role_id": any;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  CreaterMember: Member;
  CreaterFranchise: Franchise;
  Franchise: Franchise;
  Recap: Recap[];
  Roles: Roles;
  MemberCheckinType: MemberCheckinType[];
  MemberCheckin: MemberCheckin[];
  constructor(data?: CheckinInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Checkin`.
   */
  public static getModelName() {
    return "Checkin";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Checkin for dynamic purposes.
  **/
  public static factory(data: CheckinInterface): Checkin{
    return new Checkin(data);
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
      name: 'Checkin',
      plural: 'Checkins',
      path: 'Checkins',
      properties: {
        "franchise_id": {
          name: 'franchise_id',
          type: 'any'
        },
        "checkin_date": {
          name: 'checkin_date',
          type: 'Date'
        },
        "save_status": {
          name: 'save_status',
          type: 'number',
          default: 0
        },
        "created_by": {
          name: 'created_by',
          type: 'any'
        },
        "created_by_role_id": {
          name: 'created_by_role_id',
          type: 'any'
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
        CreaterMember: {
          name: 'CreaterMember',
          type: 'Member',
          model: 'Member'
        },
        CreaterFranchise: {
          name: 'CreaterFranchise',
          type: 'Franchise',
          model: 'Franchise'
        },
        Franchise: {
          name: 'Franchise',
          type: 'Franchise',
          model: 'Franchise'
        },
        Recap: {
          name: 'Recap',
          type: 'Recap[]',
          model: 'Recap'
        },
        Roles: {
          name: 'Roles',
          type: 'Roles',
          model: 'Roles'
        },
        MemberCheckinType: {
          name: 'MemberCheckinType',
          type: 'MemberCheckinType[]',
          model: 'MemberCheckinType'
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
