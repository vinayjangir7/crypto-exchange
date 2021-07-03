import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/shared/models/image.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  images: Image[] = [
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 1,
    },
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 2,
    },
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 3,
    },
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 4,
    },
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 5,
    },
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 6,
    },
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 7,
    },
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 8,
    },
    {
      name: '',
      src: ' ',
      downloadLink: '',
      likes: 0,
      shares: 0,
      index: 9,
    },
  ];
  isLoading = true;
  savedImages: Image[] | undefined;
  key = 'image-storage';

  constructor() {}

  ngOnInit(): void {
    this.savedImages = JSON.parse(localStorage.getItem(this.key) || '');
    if (this.savedImages) {
      this.images = this.savedImages;
    } else {
      localStorage.setItem(this.key, JSON.stringify(this.images));
    }
  }

  updateLocalStorage(data: Image[]) {
    localStorage.removeItem(this.key);
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
