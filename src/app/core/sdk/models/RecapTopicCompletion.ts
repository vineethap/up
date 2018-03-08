/* tslint:disable */
import {
  Recap,
  Topic
} from '../index';

declare var Object: any;
export interface RecapTopicCompletionInterface {
  "recap_id": any;
  "topic_id": any;
  "type": string;
  "task_complete": string;
  "id"?: any;
  Recap?: Recap;
  Topic?: Topic;
}

export class RecapTopicCompletion implements RecapTopicCompletionInterface {
  "recap_id": any;
  "topic_id": any;
  "type": string;
  "task_complete": string;
  "id": any;
  Recap: Recap;
  Topic: Topic;
  constructor(data?: RecapTopicCompletionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RecapTopicCompletion`.
   */
  public static getModelName() {
    return "RecapTopicCompletion";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RecapTopicCompletion for dynamic purposes.
  **/
  public static factory(data: RecapTopicCompletionInterface): RecapTopicCompletion{
    return new RecapTopicCompletion(data);
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
      name: 'RecapTopicCompletion',
      plural: 'RecapTopicCompletions',
      path: 'RecapTopicCompletions',
      properties: {
        "recap_id": {
          name: 'recap_id',
          type: 'any',
          default: <any>null
        },
        "topic_id": {
          name: 'topic_id',
          type: 'any',
          default: <any>null
        },
        "type": {
          name: 'type',
          type: 'string',
          default: ''
        },
        "task_complete": {
          name: 'task_complete',
          type: 'string',
          default: '0'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        Recap: {
          name: 'Recap',
          type: 'Recap',
          model: 'Recap'
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
