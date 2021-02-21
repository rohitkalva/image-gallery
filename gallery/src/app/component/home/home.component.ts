import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit {

  items: GalleryItem[];
  folderList: any;
  ImageData: any;
  path: any;

  constructor(public gallery: Gallery, private api: HomeService) {}

  ngOnInit(): void {

    this.folderListFunc();
    this.ImageFilePath('default');

  }

   folderListFunc(): void {
    // tslint:disable-next-line: deprecation
    this.api.folderList().subscribe(res => {
      this.folderList = res.folderPath;
      console.log(this.folderList);
      this.path = this.splitPath(this.folderList[0]);
      console.log(this.path);
    });
  }

  ImageFilePath(folder): void {

    // tslint:disable-next-line: deprecation
    this.api.ImagesPath(folder).subscribe(res => {
      this.ImageData = res.response;
      this.items = this.ImageData.map(item =>
        new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
      );
      this.GalleryConfig();

    });
  }

  folderNavigate(folder): void {
    const folderPath = this.splitPath(folder);
    this.path = folderPath;
    this.ImageFilePath(folderPath);
  }

  splitPath(path): void {
    const temp = path.split('\\');
    return temp[1];
  }

  GalleryConfig(): void {

    const lightboxGalleryRef = this.gallery.ref('anotherLightbox');

    lightboxGalleryRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Bottom
    });

    lightboxGalleryRef.load(this.items);
  }
}
