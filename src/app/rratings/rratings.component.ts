import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Rating {
  userName: string;
  stars: number;
  menuItem: string;
  comment?: string; // Optional comment field
}

@Component({
  selector: 'app-rratings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rratings.component.html',
  styleUrls: ['./rratings.component.css'] // Corrected from styleUrl to styleUrls
})
export class RratingsComponent implements OnInit {
  ratings: Rating[] = [];
  aggregateRating: number = 0;

  ngOnInit(): void {
    // Mock ratings data - replace this with API call to get the real data
    this.ratings = [
      { userName: 'John Doe', stars: 5, menuItem: 'Pizza', comment: 'Absolutely delicious! Will order again.' },
      { userName: 'Jane Smith', stars: 4, menuItem: 'Pasta', comment: 'Tasty and filling.' },
      { userName: 'Michael Lee', stars: 3, menuItem: 'Burger', comment: 'It was okay.' },
      { userName: 'Sarah Connor', stars: 4, menuItem: 'Sushi', comment: 'Very fresh!' },
      { userName: 'Bruce Wayne', stars: 5, menuItem: 'Steak', comment: 'Best steak in town!' },
      { userName: 'Clark Kent', stars: 2, menuItem: 'Salad', comment: 'Not what I expected.' },
    ];

    // Calculate the aggregate rating for all ratings
    this.aggregateRating = this.calculateAggregateRating();
  }

  // Calculate the average (aggregate) rating for all the ratings
  calculateAggregateRating(): number {
    if (this.ratings.length === 0) return 0;
    const totalStars = this.ratings.reduce((acc, rating) => acc + rating.stars, 0);
    return parseFloat((totalStars / this.ratings.length).toFixed(1)); // Round to 1 decimal place
  }
}
