/* tslint:disable */

declare var Object: any;
export interface MemberProfileInterface {
  "member_id"?: string;
  "first_name"?: string;
  "middle_name"?: string;
  "last_name"?: string;
  "dob"?: string;
  "gender"?: string;
  "phone"?: number;
  "notes"?: string;
  "location"?: string;
  "hire_date"?: Date;
  "term_date"?: Date;
  "lengthin_current_position"?: string;
  "education_level"?: string;
  "degree"?: string;
  "labour_force_exp"?: number;
  "modified_by"?: string;
  "id"?: any;
}

export class MemberProfile implements MemberProfileInterface {
  "member_id": string;
  "first_name": string;
  "middle_name": string;
  "last_name": string;
  "dob": string;
  "gender": string;
  "phone": number;
  "notes": string;
  "location": string;
  "hire_date": Date;
  "term_date": Date;
  "lengthin_current_position": string;
  "education_level": string;
  "degree": string;
  "labour_force_exp": number;
  "modified_by": string;
  "id": any;
  constructor(data?: MemberProfileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MemberProfile`.
   */
  public static getModelName() {
    return "MemberProfile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MemberProfile for dynamic purposes.
  **/
  public static factory(data: MemberProfileInterface): MemberProfile{
    return new MemberProfile(data);
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
      name: 'MemberProfile',
      plural: 'MemberProfiles',
      path: 'MemberProfiles',
      properties: {
        "member_id": {
          name: 'member_id',
          type: 'string'
        },
        "first_name": {
          name: 'first_name',
          type: 'string'
        },
        "middle_name": {
          name: 'middle_name',
          type: 'string'
        },
        "last_name": {
          name: 'last_name',
          type: 'string'
        },
        "dob": {
          name: 'dob',
          type: 'string'
        },
        "gender": {
          name: 'gender',
          type: 'string'
        },
        "phone": {
          name: 'phone',
          type: 'number'
        },
        "notes": {
          name: 'notes',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'string'
        },
        "hire_date": {
          name: 'hire_date',
          type: 'Date'
        },
        "term_date": {
          name: 'term_date',
          type: 'Date'
        },
        "lengthin_current_position": {
          name: 'lengthin_current_position',
          type: 'string'
        },
        "education_level": {
          name: 'education_level',
          type: 'string'
        },
        "degree": {
          name: 'degree',
          type: 'string'
        },
        "labour_force_exp": {
          name: 'labour_force_exp',
          type: 'number'
        },
        "modified_by": {
          name: 'modified_by',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
