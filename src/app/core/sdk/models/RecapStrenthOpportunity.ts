/* tslint:disable */
import {
  Recap,
  Topic
} from '../index';

declare var Object: any;
export interface RecapStrenthOpportunityInterface {
  "recap_id": any;
  "topic_id": any;
  "type": string;
  "period": string;
  "id"?: any;
  Recap?: Recap;
  Topic?: Topic;
}

export class RecapStrenthOpportunity implements RecapStrenthOpportunityInterface {
  "recap_id": any;
  "topic_id": any;
  "type": string;
  "period": string;
  "id": any;
  Recap: Recap;
  Topic: Topic;
  constructor(data?: RecapStrenthOpportunityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RecapStrenthOpportunity`.
   */
  public static getModelName() {
    return "RecapStrenthOpportunity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RecapStrenthOpportunity for dynamic purposes.
  **/
  public static factory(data: RecapStrenthOpportunityInterface): RecapStrenthOpportunity{
    return new RecapStrenthOpportunity(data);
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
      name: 'RecapStrenthOpportunity',
      plural: 'RecapStrenthOpportunities',
      path: 'RecapStrenthOpportunities',
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
        "period": {
          name: 'period',
          type: 'string',
          default: ''
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
