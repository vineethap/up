/* tslint:disable */
import {
  Checkin,
  CheckInType,
  MemberCheckinTopic
} from '../index';

declare var Object: any;
export interface MemberCheckinTypeInterface {
  "checkin_id"?: any;
  "checkin_type_id"?: any;
  "id"?: any;
  Checkin?: Checkin;
  CheckInType?: CheckInType;
  MemberCheckinTopic?: MemberCheckinTopic[];
}

export class MemberCheckinType implements MemberCheckinTypeInterface {
  "checkin_id": any;
  "checkin_type_id": any;
  "id": any;
  Checkin: Checkin;
  CheckInType: CheckInType;
  MemberCheckinTopic: MemberCheckinTopic[];
  constructor(data?: MemberCheckinTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MemberCheckinType`.
   */
  public static getModelName() {
    return "MemberCheckinType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MemberCheckinType for dynamic purposes.
  **/
  public static factory(data: MemberCheckinTypeInterface): MemberCheckinType{
    return new MemberCheckinType(data);
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
      name: 'MemberCheckinType',
      plural: 'MemberCheckinTypes',
      path: 'MemberCheckinTypes',
      properties: {
        "checkin_id": {
          name: 'checkin_id',
          type: 'any'
        },
        "checkin_type_id": {
          name: 'checkin_type_id',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        Checkin: {
          name: 'Checkin',
          type: 'Checkin',
          model: 'Checkin'
        },
        CheckInType: {
          name: 'CheckInType',
          type: 'CheckInType',
          model: 'CheckInType'
        },
        MemberCheckinTopic: {
          name: 'MemberCheckinTopic',
          type: 'MemberCheckinTopic[]',
          model: 'MemberCheckinTopic'
        },
      }
    }
  }
}
