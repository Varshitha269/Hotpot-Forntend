import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  teamMembers = [
    {
      name: 'K. Sunil Ganesh',
      position: ' Graduate Engineer Trainee',
      image: 'images/ganesh.jpg',
      description: 'He is the Admin of Hotpot Food Delivery App, He manages the whole app and develops  new features.',


      socials: {
        instagram: 'https://instagram.com/johndoe',
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe'
      }
    },
    {
      name: 'G. Varshitha',
      position: 'Graduate Engineer Trainee',
      image: 'images/varshithaa.jpg',
      description: 'She is the Admin of Hotpot Food Delivery App, She manages to develop user-freindly environment',
      socials: {
        instagram: 'https://www.instagram.com/freakyangel?igsh=OWFqNW43MHR6Y2gw',
        github: 'https://github.com/Varshitha269/',
        linkedin: 'https://linkedin.com/in/varshitha-varshi-24a460213/'
      }
    },
    {
      name: 'Sourav Maitra',
      position: 'Head of Development',
      image: 'images/sourav.png',
      description: 'Sourav leads the technical development team, ensuring the HOTPOT platform is fast, reliable, and scalable.',
      socials: {
        instagram: 'https://instagram.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com/in'
      }
      
    },
    {
      name: 'Hexaware Team',
      position: 'Team of Hexaware',
      image: 'images/hexaware.png',
      description: 'Hexaware leads the technical development team, ensuring the HOTPOT platform is fast, reliable, and scalable.',
      socials: {
        instagram: 'https://instagram.com',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com/in'
      }
      
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
