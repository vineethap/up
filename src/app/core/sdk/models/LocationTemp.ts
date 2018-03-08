/* tslint:disable */

declare var Object: any;
export interface LocationTempInterface {
  "Name"?: string;
  "Location"?: string;
  "Designation"?: string;
  "Email"?: string;
  "id"?: any;
}

export class LocationTemp implements LocationTempInterface {
  "Name": string;
  "Location": string;
  "Designation": string;
  "Email": string;
  "id": any;
  constructor(data?: LocationTempInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `LocationTemp`.
   */
  public static getModelName() {
    return "LocationTemp";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of LocationTemp for dynamic purposes.
  **/
  public static factory(data: LocationTempInterface): LocationTemp{
    return new LocationTemp(data);
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
      name: 'LocationTemp',
      plural: 'LocationTemps',
      path: 'LocationTemps',
      properties: {
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Location": {
          name: 'Location',
          type: 'string'
        },
        "Designation": {
          name: 'Designation',
          type: 'string'
        },
        "Email": {
          name: 'Email',
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
