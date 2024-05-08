import {Component, NgModule, OnInit} from '@angular/core';
import {BackgroundColorService} from "../../services/background-color.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {GalleryService} from "../../services/gallery.service";
import {HttpClientModule} from "@angular/common/http";
import {Image} from "../../shared/model/Image";
@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  imports: [
    NgForOf,
    NgOptimizedImage,
    HttpClientModule,
    NgIf
  ]
})
export class GalleryComponent implements OnInit{

  galleryObject?: Array<Image>;
  constructor(
    private backgroundService: BackgroundColorService,
    private galleryService: GalleryService
  ) {
    this.backgroundService.setBackgroundColor('lightgray');
  }

  ngOnInit(): void {
    this.galleryService.loadImageMeta().subscribe(images => {
      this.galleryObject = images;
      console.log(this.galleryObject);
      this.galleryObject.forEach(image => {
        this.galleryService.loadImage(image.image_url).subscribe(url => {
          image.image_url = url;
        });
      });
    });
  }

}

