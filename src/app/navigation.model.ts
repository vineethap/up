/* import { MemberApi } from './core/sdk/services/custom/Member';
import { Member } from './core/sdk/models/Member'; */


export class NavigationModel {
  public model: {};


  /* {'title': 'Company',
  'type': 'group',
  'icon': 'business',
  'url': '/admin/dashboard',

  'children': [

      {

      },
  ]} 
  */

  constructor() {

    this.model = {

      franchise: [{
          'title': 'Dashboard',
          'type': 'group',
          'icon': 'dashboard',
          'url': 'dashboards',
          'children': [
            
                  {
            
                  },
              ]

        },
            {

          'title': 'Subscription Plan',
          'type': 'group',
          'icon': 'description',
          'url': 'billing',
          'children': [
            
                  {
            
                  },
              ] 
        },
          {

          'title': 'Store Management',
          'type': 'group',
          'icon': 'add_location',
          'url': 'store-management',
          'children': [
            
                  {
            
                  },
              ]
        },
        {

          'title': 'User Management',
          'type': 'group',
          'icon': 'people',
          'url': 'user-management',
          'children': [
            
                  {
            
                  },
              ] 
        },
      
    
        // { 
        //   'title': 'Topic',
        //   'type': 'group',
        //   'icon': 'content_paste',
        //   'url': 'topic',
        //   'children': [
            
        //           {
            
        //           },
        //       ] 
        // },
        // { 
        //   'title': 'Check In',
        //   'type': 'group',
        //   'icon': 'dashboard',
        //   'url': 'check-in',
        //   'children': [
            
        //           {
            
        //           },
        //       ] 
        // },
        // { 
        //   'title': 'Recap',
        //   'type': 'group',
        //   'icon': 'rate_review',
        //   'url': 'recap',
        //   'children': [
            
        //           {
            
        //           },
        //       ] 
        // },
        { 
          'title': 'Recap list',
          'type': 'group',
          'icon': 'rate_review',
          'url': 'recap-list',
          'children': [
            
                  {
            
                  },
              ] 
        }
      ],

      director: [
      {
          'title': 'Dashboard',
          'type': 'group',
          'icon': 'dashboard',
          'url': 'director-dashboards',
          'children': [
            
                  {
            
                  },
              ] 

        },
        {

          'title': 'Store Management',
          'type': 'group',
          'icon': 'add_location',
          'url': 'store-management',
          'children': [
            
                  {
            
                  },
              ]
        },
        {

          'title': 'User Management',
          'type': 'group',
          'icon': 'people',
          'url': 'user-management',
          'children': [
            
                  {
            
                  },
              ] 
        },
        { 
          'title': 'Recap list',
          'type': 'group',
          'icon': 'rate_review',
          'url': 'recap-list',
          'children': [
            
                  {
            
                  },
              ] 
        }
       /* {

          'title': 'Check In',
          'type': 'group',
          'icon': 'people',
          'url': 'check-in',
          'children': [
            
                  {
            
                  },
              ] 
        },*/
        
        // { 
        //   'title': 'Topic',
        //   'type': 'group',
        //   'icon': 'dashboard',
        //   'url': 'topic',
        //   'children': [
            
        //           {
            
        //           },
        //       ] 
        // }
      ],

      manager: [{
          'title': 'Dashboard',
          'type': 'group',
          'icon': 'dashboard',
          'url': 'manager-dashboards',
          'children': [
            
                  {
            
                  },
              ] 

        },
        {

          'title': 'User Management',
          'type': 'group',
          'icon': 'people',
          'url': 'user-management',
          'children': [
            
                  {
            
                  },
              ] 
        },
        { 
          'title': 'Recap list',
          'type': 'group',
          'icon': 'rate_review',
          'url': 'recap-list',
          'children': [
            
                  {
            
                  },
              ] 
        }
       /* {

          'title': 'Check In',
          'type': 'group',
          'icon': 'people',
          'url': 'check-in',
          'children': [
            
                  {
            
                  },
              ] 
        },
        */
        // { 
        //   'title': 'Topic',
        //   'type': 'group',
        //   'icon': 'dashboard',
        //   'url': 'topic',
        //   'children': [
            
        //           {
            
        //           },
        //       ] 
        // }
      ],


      supervisor: [{
          'title': 'Dashboard',
          'type': 'group',
          'icon': 'dashboard',
          'url': 'supervisor-dashboards',
          'children': [
            
                  {
            
                  },
              ] 

        }
        // {

        //   'title': 'User Management',
        //   'type': 'group',
        //   'icon': 'people',
        //   'url': 'user-management',
        //   'children': [
            
        //           {
            
        //           },
        //       ] 
        // },
        // {

        //   'title': 'Check In',
        //   'type': 'group',
        //   'icon': 'people',
        //   'url': 'check-in',
        //   'children': [
            
        //           {
            
        //           },
        //       ] 
        // },
        
        // { 
        //   'title': 'Topic',
        //   'type': 'group',
        //   'icon': 'dashboard',
        //   'url': 'topic',
        //   'children': [
            
        //           {
            
        //           },
        //       ] 
        // }
      ],

      /* 'title': 'Employee Dashboard',
      'type': 'group',
      'icon': 'business',
      'url': 'employee-dashboards',
      
      'children': [{},
      ],  */
      
      employee: [{

        'title': 'Dashboard',
        'type': 'group',
        'icon': 'dashboard',
        'url': 'employee-dashboards',
        'children': [
          
                {
          
                },
            ]
      },{

        'title': 'Checkin Record',
        'type': 'group',
        'icon': 'dashboard',
        'url': 'check-record',
        'children': [
          
                {
          
                },
            ]
      },{

        'title': 'Recap Record',
        'type': 'group',
        'icon': 'dashboard',
        'url': 'recap-record',
        'children': [
          
                {
          
                },
            ]
      }
      ]
    };


    /* this.memberApi.find({where: {
        userTypeId: {
          inq: [2, 3, 4]
        }
      }}).subscribe((res) => {
            console.log("navigation_res: ", res);
    }); */

    /* this.model = [
        
                {
                    'title': 'Dashboard',
                    'type' : 'item',
                    'icon' : 'dashboard',
                    'url'  : 'dashboards'
                    
                },
                {

                'title': 'User Management',
                'type': 'item',
                'icon': 'people',
                'url':  'user-management'
                },
                {
                    
                'title': 'Store Management',
                'type': 'item',
                'icon': 'people',
                'url':  'store-management'
                },
                {
                    
                'title': 'Subscription History',
                'type': 'item',
                'icon': 'people',
                'url':  'billing'
                }
    ]; */
  }
}
