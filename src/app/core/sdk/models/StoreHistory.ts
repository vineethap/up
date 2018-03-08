/* tslint:disable */

declare var Object: any;
export interface StoreHistoryInterface {
  "store_id"?: string;
  "manager_id"?: string;
  "is_current"?: boolean;
  "start_date"?: Date;
  "end_date"?: Date;
  "id"?: any;
}

export class StoreHistory implements StoreHistoryInterface {
  "store_id": string;
  "manager_id": string;
  "is_current": boolean;
  "start_date": Date;
  "end_date": Date;
  "id": any;
  constructor(data?: StoreHistoryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `StoreHistory`.
   */
  public static getModelName() {
    return "StoreHistory";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of StoreHistory for dynamic purposes.
  **/
  public static factory(data: StoreHistoryInterface): StoreHistory{
    return new StoreHistory(data);
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
      name: 'StoreHistory',
      plural: 'StoreHistories',
      path: 'StoreHistories',
      properties: {
        "store_id": {
          name: 'store_id',
          type: 'string'
        },
        "manager_id": {
          name: 'manager_id',
          type: 'string'
        },
        "is_current": {
          name: 'is_current',
          type: 'boolean'
        },
        "start_date": {
          name: 'start_date',
          type: 'Date'
        },
        "end_date": {
          name: 'end_date',
          type: 'Date'
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
