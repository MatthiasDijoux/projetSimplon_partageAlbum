import 'package:flutter/material.dart';

import 'login/login_page.dart';
import 'gallery/galleries.dart';
import './photo_screen.dart';

class HomeScreen extends StatelessWidget {

  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Column(
          children: [
            ElevatedButton(
              child: Text('Page connexion'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) {
                    return LoginPage();
                  }),
                );
              },
            ),
            ElevatedButton(
              child: Text('Gallerie'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) {
                    return GalleriesScreen();
                  }),
                );
              },
            ),
            ElevatedButton(
              child: Text('Page photo'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) {
                    return PhotoScreen();
                  }),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
