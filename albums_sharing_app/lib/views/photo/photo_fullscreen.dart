import 'file:///C:/src/projet-flutter/projetSimplon_partageAlbum/albums_sharing_app/lib/views/Photo/photo_screen.dart';
import 'package:flutter/material.dart';

class PhotoFullScreen extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          color: Colors.black,
        ),
        child: Stack(
          children: [
            Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage("assets/test.jpg"),
                  fit: BoxFit.fitWidth,
                ),
              ),
              child: null,
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
                        return PhotoScreen();
                      }),
                    );
                  }
              ),
            ),
          ],
        ),
      ),
    );
  }
}