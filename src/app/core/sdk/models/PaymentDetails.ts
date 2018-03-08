/* tslint:disable */
import {
  Franchise
} from '../index';

declare var Object: any;
export interface PaymentDetailsInterface {
  "id"?: any;
  "number": string;
  "type": string;
  "franchiseId": any;
  "token": string;
  "amount": string;
  "transactionId": string;
  "expired_on"?: Date;
  "createdAt": Date;
  "updatedAt": Date;
  franchise?: Franchise;
}

export class PaymentDetails implements PaymentDetailsInterface {
  "id": any;
  "number": string;
  "type": string;
  "franchiseId": any;
  "token": string;
  "amount": string;
  "transactionId": string;
  "expired_on": Date;
  "createdAt": Date;
  "updatedAt": Date;
  franchise: Franchise;
  constructor(data?: PaymentDetailsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PaymentDetails`.
   */
  public static getModelName() {
    return "PaymentDetails";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PaymentDetails for dynamic purposes.
  **/
  public static factory(data: PaymentDetailsInterface): PaymentDetails{
    return new PaymentDetails(data);
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
      name: 'PaymentDetails',
      plural: 'PaymentDetails',
      path: 'PaymentDetails',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "number": {
          name: 'number',
          type: 'string',
          default: ''
        },
        "type": {
          name: 'type',
          type: 'string',
          default: ''
        },
        "franchiseId": {
          name: 'franchiseId',
          type: 'any',
          default: <any>null
        },
        "token": {
          name: 'token',
          type: 'string',
          default: ''
        },
        "amount": {
          name: 'amount',
          type: 'string',
          default: ''
        },
        "transactionId": {
          name: 'transactionId',
          type: 'string',
          default: ''
        },
        "expired_on": {
          name: 'expired_on',
          type: 'Date'
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
        franchise: {
          name: 'franchise',
          type: 'Franchise',
          model: 'Franchise'
        },
      }
    }
  }
}
