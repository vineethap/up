/* tslint:disable */
import {
  Topic,
  CheckInType
} from '../index';

declare var Object: any;
export interface TopicTypeInterface {
  "type_name"?: string;
  "is_delete"?: number;
  "categoryId"?: any;
  "check_in_type"?: any;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  Topic?: Topic;
  CheckInType?: CheckInType;
}

export class TopicType implements TopicTypeInterface {
  "type_name": string;
  "is_delete": number;
  "categoryId": any;
  "check_in_type": any;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  Topic: Topic;
  CheckInType: CheckInType;
  constructor(data?: TopicTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TopicType`.
   */
  public static getModelName() {
    return "TopicType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TopicType for dynamic purposes.
  **/
  public static factory(data: TopicTypeInterface): TopicType{
    return new TopicType(data);
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
      name: 'TopicType',
      plural: 'TopicTypes',
      path: 'TopicTypes',
      properties: {
        "type_name": {
          name: 'type_name',
          type: 'string'
        },
        "is_delete": {
          name: 'is_delete',
          type: 'number',
          default: 0
        },
        "categoryId": {
          name: 'categoryId',
          type: 'any'
        },
        "check_in_type": {
          name: 'check_in_type',
          type: 'any'
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
        Topic: {
          name: 'Topic',
          type: 'Topic',
          model: 'Topic'
        },
        CheckInType: {
          name: 'CheckInType',
          type: 'CheckInType',
          model: 'CheckInType'
        },
      }
    }
  }
}
