/* tslint:disable */

declare var Object: any;
export interface SubscriptionInterface {
  "subscription_name"?: string;
  "subscription_type"?: string;
  "subscription_count"?: number;
  "subscription_amount"?: string;
  "is_delete"?: number;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
}

export class Subscription implements SubscriptionInterface {
  "subscription_name": string;
  "subscription_type": string;
  "subscription_count": number;
  "subscription_amount": string;
  "is_delete": number;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: SubscriptionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Subscription`.
   */
  public static getModelName() {
    return "Subscription";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Subscription for dynamic purposes.
  **/
  public static factory(data: SubscriptionInterface): Subscription{
    return new Subscription(data);
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
      name: 'Subscription',
      plural: 'Subscriptions',
      path: 'Subscriptions',
      properties: {
        "subscription_name": {
          name: 'subscription_name',
          type: 'string'
        },
        "subscription_type": {
          name: 'subscription_type',
          type: 'string'
        },
        "subscription_count": {
          name: 'subscription_count',
          type: 'number'
        },
        "subscription_amount": {
          name: 'subscription_amount',
          type: 'string'
        },
        "is_delete": {
          name: 'is_delete',
          type: 'number',
          default: 0
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
