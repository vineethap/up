/* tslint:disable */

declare var Object: any;
export interface ModuleInterface {
  "name"?: string;
  "role_type"?: any;
  "id"?: any;
}

export class Module implements ModuleInterface {
  "name": string;
  "role_type": any;
  "id": any;
  constructor(data?: ModuleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Module`.
   */
  public static getModelName() {
    return "Module";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Module for dynamic purposes.
  **/
  public static factory(data: ModuleInterface): Module{
    return new Module(data);
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
      name: 'Module',
      plural: 'Modules',
      path: 'Modules',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "role_type": {
          name: 'role_type',
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
