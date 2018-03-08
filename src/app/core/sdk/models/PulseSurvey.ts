/* tslint:disable */
import {
  Member,
  MemberCheckin,
  Recap
} from '../index';

declare var Object: any;
export interface PulseSurveyInterface {
  "employee_id"?: any;
  "type"?: string;
  "type_id"?: any;
  "rating"?: number;
  "id"?: any;
  Member?: Member;
  Checkin?: MemberCheckin;
  Recap?: Recap;
}

export class PulseSurvey implements PulseSurveyInterface {
  "employee_id": any;
  "type": string;
  "type_id": any;
  "rating": number;
  "id": any;
  Member: Member;
  Checkin: MemberCheckin;
  Recap: Recap;
  constructor(data?: PulseSurveyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PulseSurvey`.
   */
  public static getModelName() {
    return "PulseSurvey";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PulseSurvey for dynamic purposes.
  **/
  public static factory(data: PulseSurveyInterface): PulseSurvey{
    return new PulseSurvey(data);
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
      name: 'PulseSurvey',
      plural: 'PulseSurveys',
      path: 'PulseSurveys',
      properties: {
        "employee_id": {
          name: 'employee_id',
          type: 'any'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "type_id": {
          name: 'type_id',
          type: 'any'
        },
        "rating": {
          name: 'rating',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        Member: {
          name: 'Member',
          type: 'Member',
          model: 'Member'
        },
        Checkin: {
          name: 'Checkin',
          type: 'MemberCheckin',
          model: 'MemberCheckin'
        },
        Recap: {
          name: 'Recap',
          type: 'Recap',
          model: 'Recap'
        },
      }
    }
  }
}
