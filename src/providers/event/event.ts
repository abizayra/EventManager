//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

@Injectable()
export class EventProvider {
  public eventListRef: Reference;

  constructor() {
    //console.log('Hello EventProvider Provider');
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.eventListRef = firebase
                .database()
                .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventPrice: number,
    eventCost: number
  ): ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1
    });
  }

  getEventList(): Reference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }

}
