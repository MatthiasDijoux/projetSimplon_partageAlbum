import 'package:albums_sharing_app/views/home.dart';
import 'package:albums_sharing_app/views/photo_fullscreen.dart';
import 'package:flutter/material.dart';

class PhotoScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text('Photo'),
      // ),
      body: Column(
        children: [
          Stack(
            children: [
              Container(
                height: 300,
                width: 500,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage("assets/test.jpg"),
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
                          return PhotoFullScreen();
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
                    Title(
                      child: Text('Titre photo'),
                      color: Colors.black,
                    ),
                  ],
                ),
                Container(
                  child: Row(
                    children: [
                      Container(
                        margin: EdgeInsets.all(4),
                        child: IconButton(
                            highlightColor: Colors.lightBlue,
                            icon: Icon(Icons.share),
                            onPressed: () {}
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.all(4),
                        child: IconButton(
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
                      Text("Commentaires :"),
                    ],
                  ),
                ),

                Row(
                  children: [
                    Text("Commentaire")
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}