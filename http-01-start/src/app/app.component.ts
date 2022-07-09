import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from "rxjs/operators";
import {PostModel} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts()
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.http.post<{name: string}>('https://angular-http-ea14b-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
      .subscribe(res => {
        console.log(res)
      })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true
    this.http
      .get<{[key: string]: PostModel}>('https://angular-http-ea14b-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(map((response) => {
        const postArray: PostModel[] = []
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postArray.push({...response[key], id: key})
          }
        }
        return postArray
      }))
      .subscribe(posts => {
        console.log(posts)
        this.loadedPosts = posts
        this.isFetching = false
      })
  }
}
