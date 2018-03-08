/* tslint:disable */

declare var Object: any;
export interface IndustryInterface {
  "Industry"?: string;
  "id"?: any;
}

export class Industry implements IndustryInterface {
  "Industry": string;
  "id": any;
  constructor(data?: IndustryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Industry`.
   */
  public static getModelName() {
    return "Industry";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Industry for dynamic purposes.
  **/
  public static factory(data: IndustryInterface): Industry{
    return new Industry(data);
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
      name: 'Industry',
      plural: 'Industries',
      path: 'Industries',
      properties: {
        "Industry": {
          name: 'Industry',
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
