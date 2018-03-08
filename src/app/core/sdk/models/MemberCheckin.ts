/* tslint:disable */
import {
  Member,
  Checkin
} from '../index';

declare var Object: any;
export interface MemberCheckinInterface {
  "checkin_id"?: any;
  "member_id"?: any;
  "ack_send"?: number;
  "ack_receive"?: number;
  "pulse_survey"?: number;
  "recap_complete"?: number;
  "id"?: any;
  Member?: Member;
  Checkin?: Checkin;
}

export class MemberCheckin implements MemberCheckinInterface {
  "checkin_id": any;
  "member_id": any;
  "ack_send": number;
  "ack_receive": number;
  "pulse_survey": number;
  "recap_complete": number;
  "id": any;
  Member: Member;
  Checkin: Checkin;
  constructor(data?: MemberCheckinInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MemberCheckin`.
   */
  public static getModelName() {
    return "MemberCheckin";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MemberCheckin for dynamic purposes.
  **/
  public static factory(data: MemberCheckinInterface): MemberCheckin{
    return new MemberCheckin(data);
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
      name: 'MemberCheckin',
      plural: 'MemberCheckins',
      path: 'MemberCheckins',
      properties: {
        "checkin_id": {
          name: 'checkin_id',
          type: 'any'
        },
        "member_id": {
          name: 'member_id',
          type: 'any'
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
        "recap_complete": {
          name: 'recap_complete',
          type: 'number',
          default: 0
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
          type: 'Checkin',
          model: 'Checkin'
        },
      }
    }
  }
}
