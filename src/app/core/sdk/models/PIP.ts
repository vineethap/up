/* tslint:disable */

declare var Object: any;
export interface PIPInterface {
  "pip_name"?: string;
  "store_id"?: string;
  "id"?: any;
}

export class PIP implements PIPInterface {
  "pip_name": string;
  "store_id": string;
  "id": any;
  constructor(data?: PIPInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PIP`.
   */
  public static getModelName() {
    return "PIP";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PIP for dynamic purposes.
  **/
  public static factory(data: PIPInterface): PIP{
    return new PIP(data);
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
      name: 'PIP',
      plural: 'PIPs',
      path: 'PIPs',
      properties: {
        "pip_name": {
          name: 'pip_name',
          type: 'string'
        },
        "store_id": {
          name: 'store_id',
          type: 'string'
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
