import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding, ReaddirResult, FileInfo } from '@capacitor/filesystem';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {

  public photosToDisplay: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  async showPhotos(folderName: string) {
    const folder: ReaddirResult = await this.getPhoto(folderName);

    // Convert the file to be usable in an img tag
    this.photosToDisplay = folder.files.map((photo: FileInfo) => {
      return Capacitor.convertFileSrc(photo.uri);
    });
  }

  // Get the photos from the folder
  async getPhoto(folder: string) {
    return await Filesystem.readdir({
      path: `/${folder}`,
      directory: Directory.Data,
    })
  }

}
