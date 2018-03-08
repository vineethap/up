/* tslint:disable */

declare var Object: any;
export interface MultipleUsersTempInterface {
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
}

export class MultipleUsersTemp implements MultipleUsersTempInterface {
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "password": string;
  accessTokens: any[];
  constructor(data?: MultipleUsersTempInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MultipleUsersTemp`.
   */
  public static getModelName() {
    return "MultipleUsersTemp";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MultipleUsersTemp for dynamic purposes.
  **/
  public static factory(data: MultipleUsersTempInterface): MultipleUsersTemp{
    return new MultipleUsersTemp(data);
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
      name: 'MultipleUsersTemp',
      plural: 'MultipleUsersTemps',
      path: 'MultipleUsersTemps',
      properties: {
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: ''
        },
      }
    }
  }
}
