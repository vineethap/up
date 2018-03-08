/* tslint:disable */

declare var Object: any;
export interface ScaleInterface {
  "scale_name"?: string;
  "store_id"?: string;
  "id"?: any;
}

export class Scale implements ScaleInterface {
  "scale_name": string;
  "store_id": string;
  "id": any;
  constructor(data?: ScaleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Scale`.
   */
  public static getModelName() {
    return "Scale";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Scale for dynamic purposes.
  **/
  public static factory(data: ScaleInterface): Scale{
    return new Scale(data);
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
      name: 'Scale',
      plural: 'Scales',
      path: 'Scales',
      properties: {
        "scale_name": {
          name: 'scale_name',
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
