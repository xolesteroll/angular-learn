import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostModel} from './post.model';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching = false;
  error = null

  constructor(private http: HttpClient,
              private postService: PostsService) {
  }

  ngOnInit() {
    this.fetchPostsHandler()
  }

  private fetchPostsHandler() {
    this.isFetching = true
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    }, error => {
      this.isFetching = false
      this.error = error.error.error ? error.error.error : 'Oops, something went wrong'
    })
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content)
      .subscribe(res => {
        console.log(res)
        this.fetchPostsHandler()
      })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPostsHandler()
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts()
      .subscribe(response => {
        this.loadedPosts = []
      }, error => {
        this.error = 'Unable to clear posts'
      })
  }

  onHandleError() {
    this.error = null
  }
}
