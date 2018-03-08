/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Member } from '../../models/Member';
import { Subscription } from '../../models/Subscription';
import { Franchise } from '../../models/Franchise';
import { Email } from '../../models/Email';
import { Container } from '../../models/Container';
import { Store } from '../../models/Store';
import { Scale } from '../../models/Scale';
import { PIP } from '../../models/PIP';
import { Topic } from '../../models/Topic';
import { StoreHistory } from '../../models/StoreHistory';
import { FollowUp } from '../../models/FollowUp';
import { Checkin } from '../../models/Checkin';
import { Recap } from '../../models/Recap';
import { MemberProfile } from '../../models/MemberProfile';
import { Industry } from '../../models/Industry';
import { MultipleUsersTemp } from '../../models/MultipleUsersTemp';
import { LocationTemp } from '../../models/LocationTemp';
import { PaymentDetails } from '../../models/PaymentDetails';
import { UserCards } from '../../models/UserCards';
import { TopicType } from '../../models/TopicType';
import { RatingSetup } from '../../models/RatingSetup';
import { Notification } from '../../models/Notification';
import { CheckInType } from '../../models/CheckInType';
import { Roles } from '../../models/Roles';
import { Permission } from '../../models/Permission';
import { Module } from '../../models/Module';
import { Rolemapping } from '../../models/Rolemapping';
import { SaveAsTemp } from '../../models/SaveAsTemp';
import { MemberCheckinType } from '../../models/MemberCheckinType';
import { MemberCheckin } from '../../models/MemberCheckin';
import { MemberCheckinTopic } from '../../models/MemberCheckinTopic';
import { RecapStrenthOpportunity } from '../../models/RecapStrenthOpportunity';
import { RecapTopicCompletion } from '../../models/RecapTopicCompletion';
import { TrainingVideos } from '../../models/TrainingVideos';
import { PulseSurvey } from '../../models/PulseSurvey';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Member: Member,
    Subscription: Subscription,
    Franchise: Franchise,
    Email: Email,
    Container: Container,
    Store: Store,
    Scale: Scale,
    PIP: PIP,
    Topic: Topic,
    StoreHistory: StoreHistory,
    FollowUp: FollowUp,
    Checkin: Checkin,
    Recap: Recap,
    MemberProfile: MemberProfile,
    Industry: Industry,
    MultipleUsersTemp: MultipleUsersTemp,
    LocationTemp: LocationTemp,
    PaymentDetails: PaymentDetails,
    UserCards: UserCards,
    TopicType: TopicType,
    RatingSetup: RatingSetup,
    Notification: Notification,
    CheckInType: CheckInType,
    Roles: Roles,
    Permission: Permission,
    Module: Module,
    Rolemapping: Rolemapping,
    SaveAsTemp: SaveAsTemp,
    MemberCheckinType: MemberCheckinType,
    MemberCheckin: MemberCheckin,
    MemberCheckinTopic: MemberCheckinTopic,
    RecapStrenthOpportunity: RecapStrenthOpportunity,
    RecapTopicCompletion: RecapTopicCompletion,
    TrainingVideos: TrainingVideos,
    PulseSurvey: PulseSurvey,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
