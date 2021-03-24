import 'package:flutter/material.dart';
import 'login/login.dart';
import 'gallery/galleries.dart';
import 'photo/photo_pagination.dart';

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
                    return LoginScreen();
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
              child: Text('Page test'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) {
                    return PhotoPaginationScreen();
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
