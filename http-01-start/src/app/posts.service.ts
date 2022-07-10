import {Injectable} from "@angular/core";
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {PostModel} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  public createAndStorePost(title: string, content: string) {
    const postData: PostModel = {
      title,
      content
    }
    return this.http.post<{ name: string }>(
      'https://angular-http-ea14b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData,
      {
        // Getting a full response from server (body is default)
        observe: 'response'
      }
    )
  }

  public fetchPosts() {
    // Adding multiple query params to request
    let searchParams = new HttpParams()
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('custom', 'key')

    return this.http
      .get<{ [key: string]: PostModel }>('https://angular-http-ea14b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          // Setting headers
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          params: searchParams
        })
      // Transforming data with pipe and map rxjs operators
      .pipe(map((response) => {
        const postArray: PostModel[] = []
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postArray.push({...response[key], id: key})
          }
        }
        return postArray
      }), catchError(error => {
        return throwError(error)
      }))

  }

  public clearPosts() {
    return this.http.delete(
      'https://angular-http-ea14b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events',
        // Changing the response body type (json by default)
        responseType: 'text'
      }
    ).pipe(
      // Using tap operator to get data while not disturbing the observable data flow
      tap(event => {
        console.log(event)
        // Checking the type of the response
        if (event.type === HttpEventType.Sent) {
          // do something
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body)
        }
      }))
  }
}
