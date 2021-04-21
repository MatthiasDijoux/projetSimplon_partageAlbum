import 'package:albums_sharing_app/models/albums_models.dart';
import 'package:flutter/material.dart';
import 'api.dart';


class Gallery extends StatefulWidget {
  Gallery(this.album);

  final Album album;

  @override
  _GalleryScreen createState() => _GalleryScreen();
}


class _GalleryScreen extends State<Gallery> {
  _GalleryScreen();
  final ApiService api = ApiService();

  @override
  Widget build(BuildContext context) {
    // final Future album = ModalRoute.of(context).settings.arguments;
    return Scaffold(
      appBar: AppBar(),
      body: Center(child: Text("")),
    );
  }
}
