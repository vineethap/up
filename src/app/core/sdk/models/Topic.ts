/* tslint:disable */
import {
  MemberCheckinTopic,
  RecapStrenthOpportunity,
  RecapTopicCompletion
} from '../index';

declare var Object: any;
export interface TopicInterface {
  "topic_name"?: string;
  "is_hide"?: boolean;
  "created_by"?: string;
  "created_by_role_id"?: string;
  "id"?: any;
  "createdAt": Date;
  "updatedAt": Date;
  MemberCheckinTopic?: MemberCheckinTopic[];
  StrenthOppurtunity?: RecapStrenthOpportunity[];
  TopicCompletion?: RecapTopicCompletion[];
}

export class Topic implements TopicInterface {
  "topic_name": string;
  "is_hide": boolean;
  "created_by": string;
  "created_by_role_id": string;
  "id": any;
  "createdAt": Date;
  "updatedAt": Date;
  MemberCheckinTopic: MemberCheckinTopic[];
  StrenthOppurtunity: RecapStrenthOpportunity[];
  TopicCompletion: RecapTopicCompletion[];
  constructor(data?: TopicInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Topic`.
   */
  public static getModelName() {
    return "Topic";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Topic for dynamic purposes.
  **/
  public static factory(data: TopicInterface): Topic{
    return new Topic(data);
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
      name: 'Topic',
      plural: 'Topics',
      path: 'Topics',
      properties: {
        "topic_name": {
          name: 'topic_name',
          type: 'string'
        },
        "is_hide": {
          name: 'is_hide',
          type: 'boolean',
          default: false
        },
        "created_by": {
          name: 'created_by',
          type: 'string'
        },
        "created_by_role_id": {
          name: 'created_by_role_id',
          type: 'string'
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
        MemberCheckinTopic: {
          name: 'MemberCheckinTopic',
          type: 'MemberCheckinTopic[]',
          model: 'MemberCheckinTopic'
        },
        StrenthOppurtunity: {
          name: 'StrenthOppurtunity',
          type: 'RecapStrenthOpportunity[]',
          model: 'RecapStrenthOpportunity'
        },
        TopicCompletion: {
          name: 'TopicCompletion',
          type: 'RecapTopicCompletion[]',
          model: 'RecapTopicCompletion'
        },
      }
    }
  }
}
