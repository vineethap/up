/* tslint:disable */

declare var Object: any;
export interface TrainingVideosInterface {
  "title"?: string;
  "url"?: string;
  "id"?: any;
}

export class TrainingVideos implements TrainingVideosInterface {
  "title": string;
  "url": string;
  "id": any;
  constructor(data?: TrainingVideosInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TrainingVideos`.
   */
  public static getModelName() {
    return "TrainingVideos";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TrainingVideos for dynamic purposes.
  **/
  public static factory(data: TrainingVideosInterface): TrainingVideos{
    return new TrainingVideos(data);
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
      name: 'TrainingVideos',
      plural: 'TrainingVideos',
      path: 'TrainingVideos',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "url": {
          name: 'url',
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
