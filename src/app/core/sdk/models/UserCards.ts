/* tslint:disable */
import {
  Franchise
} from '../index';

declare var Object: any;
export interface UserCardsInterface {
  "userId"?: any;
  "franchiseId"?: string;
  "cardNum"?: string;
  "stripeToken"?: string;
  "type"?: string;
  "cardId"?: string;
  "sourceId"?: string;
  "stripe_cusId"?: string;
  "exp_month"?: number;
  "exp_year"?: number;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  User?: Franchise;
}

export class UserCards implements UserCardsInterface {
  "userId": any;
  "franchiseId": string;
  "cardNum": string;
  "stripeToken": string;
  "type": string;
  "cardId": string;
  "sourceId": string;
  "stripe_cusId": string;
  "exp_month": number;
  "exp_year": number;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  User: Franchise;
  constructor(data?: UserCardsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserCards`.
   */
  public static getModelName() {
    return "UserCards";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserCards for dynamic purposes.
  **/
  public static factory(data: UserCardsInterface): UserCards{
    return new UserCards(data);
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
      name: 'UserCards',
      plural: 'UserCards',
      path: 'UserCards',
      properties: {
        "userId": {
          name: 'userId',
          type: 'any'
        },
        "franchiseId": {
          name: 'franchiseId',
          type: 'string'
        },
        "cardNum": {
          name: 'cardNum',
          type: 'string'
        },
        "stripeToken": {
          name: 'stripeToken',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "cardId": {
          name: 'cardId',
          type: 'string'
        },
        "sourceId": {
          name: 'sourceId',
          type: 'string'
        },
        "stripe_cusId": {
          name: 'stripe_cusId',
          type: 'string'
        },
        "exp_month": {
          name: 'exp_month',
          type: 'number'
        },
        "exp_year": {
          name: 'exp_year',
          type: 'number'
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
        User: {
          name: 'User',
          type: 'Franchise',
          model: 'Franchise'
        },
      }
    }
  }
}
