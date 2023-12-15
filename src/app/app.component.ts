import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { delay, map, Observable, startWith, takeWhile, timer } from 'rxjs';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loginName = new FormControl('');

  user$?: Observable<User | null>;

  countdown$?: Observable<number>;
  countdownSeconds: number = 60;

  showError$?: Observable<boolean>;
  showErrorSeconds: number = 5;
  
  constructor(private usersService: UsersService) {}

  send(): void {
    if (!this.loginName.value) return;

    this.usersService.getUser(this.loginName.value);

    this.user$ = this.usersService.user$;
    this.countdown$ = this.createCountdown$(this.countdownSeconds);
    this.showError$ = this.user$.pipe(
      delay(this.showErrorSeconds * 1000),
      map(() => false),
      startWith(true)
    );
  }

  private createCountdown$(seconds: number): Observable<number> {
    return timer(0, 1000).pipe(
      map(number => (seconds - number) * 1000),
      takeWhile(number => number >= 0)
    );
  }
}
