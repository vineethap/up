/* tslint:disable */
import {
  MemberCheckinType,
  Topic
} from '../index';

declare var Object: any;
export interface MemberCheckinTopicInterface {
  "member_checkin_id"?: any;
  "checkin_topic_id"?: any;
  "above_beyond"?: number;
  "misconduct"?: number;
  "comments"?: string;
  "start_date"?: Date;
  "end_date"?: Date;
  "expectation"?: Date;
  "follow_up_date"?: Date;
  "id"?: any;
  MemberCheckinType?: MemberCheckinType;
  Topic?: Topic;
}

export class MemberCheckinTopic implements MemberCheckinTopicInterface {
  "member_checkin_id": any;
  "checkin_topic_id": any;
  "above_beyond": number;
  "misconduct": number;
  "comments": string;
  "start_date": Date;
  "end_date": Date;
  "expectation": Date;
  "follow_up_date": Date;
  "id": any;
  MemberCheckinType: MemberCheckinType;
  Topic: Topic;
  constructor(data?: MemberCheckinTopicInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MemberCheckinTopic`.
   */
  public static getModelName() {
    return "MemberCheckinTopic";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MemberCheckinTopic for dynamic purposes.
  **/
  public static factory(data: MemberCheckinTopicInterface): MemberCheckinTopic{
    return new MemberCheckinTopic(data);
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
      name: 'MemberCheckinTopic',
      plural: 'MemberCheckinTopics',
      path: 'MemberCheckinTopics',
      properties: {
        "member_checkin_id": {
          name: 'member_checkin_id',
          type: 'any'
        },
        "checkin_topic_id": {
          name: 'checkin_topic_id',
          type: 'any'
        },
        "above_beyond": {
          name: 'above_beyond',
          type: 'number',
          default: 0
        },
        "misconduct": {
          name: 'misconduct',
          type: 'number',
          default: 0
        },
        "comments": {
          name: 'comments',
          type: 'string'
        },
        "start_date": {
          name: 'start_date',
          type: 'Date'
        },
        "end_date": {
          name: 'end_date',
          type: 'Date'
        },
        "expectation": {
          name: 'expectation',
          type: 'Date'
        },
        "follow_up_date": {
          name: 'follow_up_date',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        MemberCheckinType: {
          name: 'MemberCheckinType',
          type: 'MemberCheckinType',
          model: 'MemberCheckinType'
        },
        Topic: {
          name: 'Topic',
          type: 'Topic',
          model: 'Topic'
        },
      }
    }
  }
}
