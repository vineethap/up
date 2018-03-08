/* tslint:disable */
import {
  MemberCheckinType
} from '../index';

declare var Object: any;
export interface CheckInTypeInterface {
  "checkin_name"?: string;
  "logo"?: string;
  "id"?: any;
  MemberCheckinType?: MemberCheckinType[];
}

export class CheckInType implements CheckInTypeInterface {
  "checkin_name": string;
  "logo": string;
  "id": any;
  MemberCheckinType: MemberCheckinType[];
  constructor(data?: CheckInTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CheckInType`.
   */
  public static getModelName() {
    return "CheckInType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CheckInType for dynamic purposes.
  **/
  public static factory(data: CheckInTypeInterface): CheckInType{
    return new CheckInType(data);
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
      name: 'CheckInType',
      plural: 'CheckInTypes',
      path: 'CheckInTypes',
      properties: {
        "checkin_name": {
          name: 'checkin_name',
          type: 'string'
        },
        "logo": {
          name: 'logo',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
        MemberCheckinType: {
          name: 'MemberCheckinType',
          type: 'MemberCheckinType[]',
          model: 'MemberCheckinType'
        },
      }
    }
  }
}
