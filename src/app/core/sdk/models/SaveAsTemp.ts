/* tslint:disable */

declare var Object: any;
export interface SaveAsTempInterface {
  "id"?: any;
}

export class SaveAsTemp implements SaveAsTempInterface {
  "id": any;
  constructor(data?: SaveAsTempInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SaveAsTemp`.
   */
  public static getModelName() {
    return "SaveAsTemp";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SaveAsTemp for dynamic purposes.
  **/
  public static factory(data: SaveAsTempInterface): SaveAsTemp{
    return new SaveAsTemp(data);
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
      name: 'SaveAsTemp',
      plural: 'SaveAsTemps',
      path: 'SaveAsTemps',
      properties: {
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
