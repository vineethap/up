/* tslint:disable */

declare var Object: any;
export interface NotificationInterface {
  "type"?: string;
  "message"?: string;
  "sender"?: string;
  "receiver"?: string;
  "read_status"?: boolean;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
}

export class Notification implements NotificationInterface {
  "type": string;
  "message": string;
  "sender": string;
  "receiver": string;
  "read_status": boolean;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: NotificationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Notification`.
   */
  public static getModelName() {
    return "Notification";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Notification for dynamic purposes.
  **/
  public static factory(data: NotificationInterface): Notification{
    return new Notification(data);
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
      name: 'Notification',
      plural: 'Notifications',
      path: 'Notifications',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "message": {
          name: 'message',
          type: 'string'
        },
        "sender": {
          name: 'sender',
          type: 'string'
        },
        "receiver": {
          name: 'receiver',
          type: 'string'
        },
        "read_status": {
          name: 'read_status',
          type: 'boolean'
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
