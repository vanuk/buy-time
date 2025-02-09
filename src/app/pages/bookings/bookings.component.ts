import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../services/bookings.service';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../pages/user-page/user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; // Для здійснення HTTP запитів

interface UserData {
  Id: string; // Ensure the Id property is included
  FirstName: string;
  LastName: string;
  Role: string;
  Email: string;
  Description: string;
  Tags: string;
  message?: string;
}
interface BookingSlot {
  id: string;
  status: string;
  message: string;
  createdAt: boolean;
  TeacherId: string; // Ensure the TeacherId property is included
}
@Component({
  selector: 'app-bookings',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingsService]
})
export class BookingsComponent implements OnInit {
  bookings: BookingSlot[] = [];
  userData: UserData | null = null;

  constructor(
    private bookingsService: BookingsService,
    private userDataService: UserDataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    /*this.bookingsService.getAllBookings().subscribe(
      data => {
        this.bookings = data;
        console.log('Fetched bookings:', data);
      },
      error => console.error('Error fetching bookings:', error)
    );*/

    this.fetchUserData();
  }

  fetchUserData(): void {
    this.http.get<UserData>('http://localhost:3000/api/getCurrentUserData').subscribe(
      (data) => {
        console.log('Fetched user data:', data); // Log the fetched data
        if (data && !data.message) {
          this.userData = data; // Зберігаємо отримані дані користувача
          console.log('User Data:', data); // Log the entire user data
          if (data.Id) {
            console.log('User ID:', data.Id); // Log the user ID
            this.fetchBookSlotsById(data.Id); // Викликати метод тут з потрібним userId
          } else {
            console.error('User ID is undefined');
          }
        } else {
          console.log('No user data available');
        }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  fetchBookSlotsById(userId: string): void {
    this.bookingsService.getAllBookings().subscribe(
      (data) => {
        console.log('Fetched all time slots:', data); // Log all fetched data
        console.log(userId); // Log the user ID
        for (let slot of data) {
          console.log('Teacher ID:', slot.teacherId); // Log the TeacherId of each time slot
          if (slot.teacherId.toLowerCase() === userId.toLowerCase()) {
            console.log('Matching time slot row:', slot.id);
            console.log('good'); // Log the entire row if there is a match
            this.bookings.push(slot); // Зберегти відповідні таймслоти
          }
          else{
            //console.log('bad');
            }
          
        }
      },
      (error) => {
        console.error('Error fetching time slots', error);
      }
    );
  }

}
