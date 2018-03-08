/* tslint:disable */
import {
  Member,
  Franchise,
  Checkin,
  Store
} from '../index';

declare var Object: any;
export interface RolesInterface {
  "role"?: string;
  "role_type"?: string;
  "id"?: any;
  Member?: Member[];
  Franchise?: Franchise[];
  Checkin?: Checkin[];
  Store?: Store[];
}

export class Roles implements RolesInterface {
  "role": string;
  "role_type": string;
  "id": any;
  Member: Member[];
  Franchise: Franchise[];
  Checkin: Checkin[];
  Store: Store[];
  constructor(data?: RolesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Roles`.
   */
  public static getModelName() {
    return "Roles";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Roles for dynamic purposes.
  **/
  public static factory(data: RolesInterface): Roles{
    return new Roles(data);
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
      name: 'Roles',
      plural: 'Roles',
      path: 'Roles',
      properties: {
        "role": {
          name: 'role',
          type: 'string'
        },
        "role_type": {
          name: 'role_type',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
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
        Checkin: {
          name: 'Checkin',
          type: 'Checkin[]',
          model: 'Checkin'
        },
        Store: {
          name: 'Store',
          type: 'Store[]',
          model: 'Store'
        },
      }
    }
  }
}
