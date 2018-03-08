/* tslint:disable */
import {
  Member,
  Franchise,
  Checkin,
  RecapStrenthOpportunity,
  RecapTopicCompletion
} from '../index';

declare var Object: any;
export interface RecapInterface {
  "member_id": any;
  "checkin_id"?: any;
  "created_by": any;
  "recap_date"?: Date;
  "is_goal": number;
  "is_task": number;
  "is_assessment"?: number;
  "goal_achieved"?: number;
  "individual_standards"?: number;
  "member_performance"?: string;
  "additional_responsibility"?: number;
  "complete_growth_plan"?: string;
  "creator_note"?: string;
  "member_note"?: string;
  "save_status"?: number;
  "ack_send"?: number;
  "ack_receive"?: number;
  "pulse_survey"?: number;
  "id"?: any;
  CreaterMember?: Member;
  CreaterFranchise?: Franchise;
  Member?: Member;
  Checkin?: Checkin;
  StrenthOppurtunity?: RecapStrenthOpportunity[];
  TopicCompletion?: RecapTopicCompletion[];
}

export class Recap implements RecapInterface {
  "member_id": any;
  "checkin_id": any;
  "created_by": any;
  "recap_date": Date;
  "is_goal": number;
  "is_task": number;
  "is_assessment": number;
  "goal_achieved": number;
  "individual_standards": number;
  "member_performance": string;
  "additional_responsibility": number;
  "complete_growth_plan": string;
  "creator_note": string;
  "member_note": string;
  "save_status": number;
  "ack_send": number;
  "ack_receive": number;
  "pulse_survey": number;
  "id": any;
  CreaterMember: Member;
  CreaterFranchise: Franchise;
  Member: Member;
  Checkin: Checkin;
  StrenthOppurtunity: RecapStrenthOpportunity[];
  TopicCompletion: RecapTopicCompletion[];
  constructor(data?: RecapInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Recap`.
   */
  public static getModelName() {
    return "Recap";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Recap for dynamic purposes.
  **/
  public static factory(data: RecapInterface): Recap{
    return new Recap(data);
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
      name: 'Recap',
      plural: 'Recaps',
      path: 'Recaps',
      properties: {
        "member_id": {
          name: 'member_id',
          type: 'any',
          default: <any>null
        },
        "checkin_id": {
          name: 'checkin_id',
          type: 'any',
          default: <any>null
        },
        "created_by": {
          name: 'created_by',
          type: 'any',
          default: <any>null
        },
        "recap_date": {
          name: 'recap_date',
          type: 'Date'
        },
        "is_goal": {
          name: 'is_goal',
          type: 'number',
          default: 0
        },
        "is_task": {
          name: 'is_task',
          type: 'number',
          default: 0
        },
        "is_assessment": {
          name: 'is_assessment',
          type: 'number',
          default: 0
        },
        "goal_achieved": {
          name: 'goal_achieved',
          type: 'number',
          default: 0
        },
        "individual_standards": {
          name: 'individual_standards',
          type: 'number',
          default: 0
        },
        "member_performance": {
          name: 'member_performance',
          type: 'string',
          default: ''
        },
        "additional_responsibility": {
          name: 'additional_responsibility',
          type: 'number',
          default: 0
        },
        "complete_growth_plan": {
          name: 'complete_growth_plan',
          type: 'string',
          default: ''
        },
        "creator_note": {
          name: 'creator_note',
          type: 'string',
          default: ''
        },
        "member_note": {
          name: 'member_note',
          type: 'string',
          default: ''
        },
        "save_status": {
          name: 'save_status',
          type: 'number',
          default: 0
        },
        "ack_send": {
          name: 'ack_send',
          type: 'number',
          default: 0
        },
        "ack_receive": {
          name: 'ack_receive',
          type: 'number',
          default: 0
        },
        "pulse_survey": {
          name: 'pulse_survey',
          type: 'number',
          default: 0
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        CreaterMember: {
          name: 'CreaterMember',
          type: 'Member',
          model: 'Member'
        },
        CreaterFranchise: {
          name: 'CreaterFranchise',
          type: 'Franchise',
          model: 'Franchise'
        },
        Member: {
          name: 'Member',
          type: 'Member',
          model: 'Member'
        },
        Checkin: {
          name: 'Checkin',
          type: 'Checkin',
          model: 'Checkin'
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
