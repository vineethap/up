/* tslint:disable */

declare var Object: any;
export interface FollowUpInterface {
  "pip_topic_name"?: string;
  "pip_notes"?: string;
  "corrective_action_days"?: string;
  "id"?: any;
}

export class FollowUp implements FollowUpInterface {
  "pip_topic_name": string;
  "pip_notes": string;
  "corrective_action_days": string;
  "id": any;
  constructor(data?: FollowUpInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FollowUp`.
   */
  public static getModelName() {
    return "FollowUp";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FollowUp for dynamic purposes.
  **/
  public static factory(data: FollowUpInterface): FollowUp{
    return new FollowUp(data);
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
      name: 'FollowUp',
      plural: 'FollowUps',
      path: 'FollowUps',
      properties: {
        "pip_topic_name": {
          name: 'pip_topic_name',
          type: 'string'
        },
        "pip_notes": {
          name: 'pip_notes',
          type: 'string'
        },
        "corrective_action_days": {
          name: 'corrective_action_days',
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
