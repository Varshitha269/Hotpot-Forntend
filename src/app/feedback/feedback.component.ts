import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PayloadService } from '../service/payload.service'; // Adjust the import path as needed
import { FeedbackService } from '../service/feedback.service'; // Adjust the import path as needed
import { CommonModule } from '@angular/common';

interface FeedbackRating {
  feedbackRatingID: number;
  userID: number;
  restaurantID: number;
  message: string;
  rating: number;
  createdDate: string;
} // Adjust the import path as needed

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  restaurantID: number | null = null;
  userID: number | null = null;
  rating: number = 0; // Track the selected rating

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private payloadService: PayloadService,
    private router: Router,
    private feedbackService: FeedbackService // Use the FeedbackService here
  ) {
    this.feedbackForm = this.fb.group({
      feedbackRatingID: [0],
      userID: [0, Validators.required],
      restaurantID: [0, Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      createdDate: [new Date().toISOString()],
    });
  }

  ngOnInit() {
    if (!this.userID) {
      this.router.navigate(['/app-login']); // Navigate to the login page
      return; // Exit the function early
    }
    this.route.params.subscribe((params) => {
      this.restaurantID = +params['id']; // Assuming 'id' is the route parameter for restaurant ID
      // Check if userID is valid, if not navigate to login
      this.userID = Number(this.payloadService.getUserId());
      
      

      this.feedbackForm.patchValue({
        restaurantID: this.restaurantID,
        userID: this.userID,
      });
    });
  }

  setRating(value: number) {
    this.rating = value; // Update the selected rating
    this.feedbackForm.patchValue({ rating: value }); // Update the form control value
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      console.log('Feedback submitted:', this.feedbackForm.value);
      // Use the FeedbackService to submit feedback
      this.submitFeedback(this.feedbackForm.value);
      alert("tanks for your feedback");
      this.router.navigate(['/']); // Navigate to home after feedback submission
    } else {
      console.log('Form is invalid');
    }
  }

  private submitFeedback(feedbackData: any) {
    // Create a FeedbackRating object
    const feedbackRating: FeedbackRating = {
      feedbackRatingID: feedbackData.feedbackRatingID,
      userID: feedbackData.userID,
      restaurantID: feedbackData.restaurantID,
      message: feedbackData.message,
      rating: feedbackData.rating,
      createdDate: feedbackData.createdDate,
    };

    // Call the createFeedbackRating method from FeedbackService
    this.feedbackService.createFeedbackRating(feedbackRating).subscribe(
      (response) => {
        console.log('Feedback submitted successfully:', response);
        // Optionally, reset the form or show a success message
        this.feedbackForm.reset();
        this.rating = 0; // Reset the rating after submission
      },
      (error) => {
        console.error('Error submitting feedback:', error);
      }
    );
  }
}
