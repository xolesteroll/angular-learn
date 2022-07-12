import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<UserModel | null>(null)
  private logoutTimer: ReturnType<typeof setTimeout> | null = null

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public signUp(email: string, password: string) {
    const apiKey = environment.webApi
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => {
        return this.handleError(errorResponse)
      }),
      tap(responseData => {
        this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
      }))
  }

  public login(email: string, password: string) {
    const apiKey = environment.webApi
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => {
        return this.handleError(errorResponse)
      }),
      tap(responseData => {
        this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn)
      }))
  }

  public autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(<string>localStorage.getItem('userData'))

    if (!userData) {
      return
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )

    if (loadedUser.token) {
      this.user.next(loadedUser)
      const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expiresIn)
    }
  }

  public logout() {
    this.user.next(null)
    localStorage.removeItem('userData')
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer)
    }
    this.logoutTimer = null
    this.router.navigate(['/auth'])
  }

  public autoLogout(expirationDuration: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred'
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage)
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'User with this email is already registered'
        break
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect email or password!'
        break
      default:
        break
    }
    return throwError(errorMessage)
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new UserModel(
      email,
      userId,
      token,
      expirationDate
    )
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }
}
