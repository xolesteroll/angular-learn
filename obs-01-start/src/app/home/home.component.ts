import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription, Observable} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private obsSubscription: Subscription

  constructor() { }

  ngOnInit() {
    // this.obsSubscription = interval(1000).subscribe(count => {
    //   console.log(count)
    // })

    const customObservable = new Observable((observer) => {
      let count = 0
      setInterval(() => {
        observer.next(count)
        if (count === 2) {
          observer.complete()
        }
        if(count > 3) {
          observer.error(new Error('COUNT IS GREATER THAN 3!! IMPOSSIBLEEEEE'))
        }
        count++
      }, 1000)
    })



    this.obsSubscription = customObservable.pipe(filter((data) => {
      return data > 0
    }), map((data: number) => {
      return `Round: ${data + 1}`;
    })).subscribe((count) => {
      console.log(count)
    }, error => {
      console.log(error)
      alert(error)
    }, () => {
      console.log('completed')
    })
  }

  ngOnDestroy() {
    this.obsSubscription.unsubscribe()
  }

}
