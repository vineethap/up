/* tslint:disable */

declare var Object: any;
export interface RatingSetupInterface {
  "name": string;
  "value": number;
  "id"?: any;
}

export class RatingSetup implements RatingSetupInterface {
  "name": string;
  "value": number;
  "id": any;
  constructor(data?: RatingSetupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RatingSetup`.
   */
  public static getModelName() {
    return "RatingSetup";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RatingSetup for dynamic purposes.
  **/
  public static factory(data: RatingSetupInterface): RatingSetup{
    return new RatingSetup(data);
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
      name: 'RatingSetup',
      plural: 'RatingSetups',
      path: 'RatingSetups',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "value": {
          name: 'value',
          type: 'number'
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
