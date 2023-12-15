import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of, take } from "rxjs";

export interface User {
    loginName?: string;
    name?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    get user$(): Observable<User | null> {
        return this.userSubject.asObservable();
    }

    getUsers$(): Observable<User[]> {
        const users: User[] = [
            { loginName: 'loginInna', name: 'Inna' },
            { loginName: 'loginIvan', name: 'Ivan' },
            { loginName: 'loginIrina', name: 'Irina' }
        ];

        return of(users);
    }

    getUser(name: string): void {
        this.userSubject.next(null);
        this.getUsers$().pipe(
          map(users => users.find(user => user.loginName === name) || {}),
          take(1)
        ).subscribe(user => this.userSubject.next(user));
    }
}
