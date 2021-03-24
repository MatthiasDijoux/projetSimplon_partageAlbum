import 'package:albums_sharing_app/views/commentary/commentary_form.dart';
import 'package:albums_sharing_app/views/photo/photo_fullscreen.dart';
import 'package:flutter/material.dart';

import '../home.dart';

class PhotoPaginationScreen extends StatelessWidget{
  Widget _buildPhotoScreen(BuildContext context, int index, Color color) {
    return Column(
      children: [
        Stack(
          children: [
            Container(
              height: 300,
              width: 500,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage("assets/test-$index.jpg"),
                  fit: BoxFit.cover,
                ),
              ),
              child: null,
            ),
            Positioned(
              top: 25,
              right: 0,
              child: IconButton(
                  color: Colors.white,
                  icon: Icon(Icons.fullscreen),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) {
                        return PhotoFullScreen(index);
                      }),
                    );
                  }
              ),
            ),
            Positioned(
              top: 25,
              left: 0,
              child: IconButton(
                  color: Colors.white,
                  icon: Icon(Icons.arrow_back),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) {
                        return HomeScreen();
                      }),
                    );
                  }
              ),
            ),
          ],
        ),
        Container(
          padding: EdgeInsets.all(8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                children: [
                  Text(
                    'Titre photo $index',
                    style: TextStyle(fontSize: 20.0),
                  ),
                  Text(
                    'Titre album',
                    style: TextStyle(fontSize: 12.0, color: Colors.black38),
                  ),
                ],
              ),
              Container(
                child: Row(
                  children: [
                    Container(
                      margin: EdgeInsets.all(4),
                      child: IconButton(
                          highlightColor: color,
                          icon: Icon(Icons.share),
                          onPressed: () {}
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.all(4),
                      child: IconButton(
                          highlightColor: color,
                          icon: Icon(Icons.menu),
                          onPressed: () {}
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
        Container(
          padding: EdgeInsets.all(8),
          child: Column(
            children: [
              Container(
                child: Row(
                  children: [
                    Text(
                      "Commentaries :",
                      style: TextStyle(fontSize: 16.0),
                    ),
                  ],
                ),
              ),
              Container(
                child: CommentaryFormScreen(),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPhotoScreenView(BuildContext context) {
    return PageView(
      children: [
        _buildPhotoScreen(context, 1, Colors.blue),
        _buildPhotoScreen(context, 2, Colors.red),
        _buildPhotoScreen(context, 3, Colors.green),
        _buildPhotoScreen(context, 4, Colors.yellow),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _buildPhotoScreenView(context)
    );
  }
}