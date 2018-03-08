/* tslint:disable */

declare var Object: any;
export interface PermissionInterface {
  "name"?: string;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
}

export class Permission implements PermissionInterface {
  "name": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: PermissionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Permission`.
   */
  public static getModelName() {
    return "Permission";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Permission for dynamic purposes.
  **/
  public static factory(data: PermissionInterface): Permission{
    return new Permission(data);
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
      name: 'Permission',
      plural: 'Permissions',
      path: 'Permissions',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
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
      }
    }
  }
}
