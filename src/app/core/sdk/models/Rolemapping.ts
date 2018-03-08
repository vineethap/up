/* tslint:disable */

declare var Object: any;
export interface RolemappingInterface {
  "roleid"?: string;
  "moduleid"?: string;
  "permissions"?: any;
  "id"?: any;
}

export class Rolemapping implements RolemappingInterface {
  "roleid": string;
  "moduleid": string;
  "permissions": any;
  "id": any;
  constructor(data?: RolemappingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Rolemapping`.
   */
  public static getModelName() {
    return "Rolemapping";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Rolemapping for dynamic purposes.
  **/
  public static factory(data: RolemappingInterface): Rolemapping{
    return new Rolemapping(data);
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
      name: 'Rolemapping',
      plural: 'n',
      path: 'n',
      properties: {
        "roleid": {
          name: 'roleid',
          type: 'string'
        },
        "moduleid": {
          name: 'moduleid',
          type: 'string'
        },
        "permissions": {
          name: 'permissions',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
