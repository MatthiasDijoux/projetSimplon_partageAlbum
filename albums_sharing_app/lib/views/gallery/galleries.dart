import 'package:flutter/material.dart';

import './gallery.dart';

class GalleriesScreen extends StatelessWidget {
  final List galleries = const [];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
          child: (Column(
        children: [_buildCard(context)],
      ))),
    );
  }
}

Widget _buildCard(context) => GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) {
            return GalleryScreen();
          }),
        );
      },
      child: Card(
        elevation: 5,
        clipBehavior: Clip.antiAlias,
        child: Column(
          children: [
            Row(
              children: [
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text(
                    'Titre Album',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
                Spacer(), // I just added one line
                IconButton(
                  onPressed: () {},
                  icon: Icon(Icons.share_rounded),
                ),
                IconButton(
                  onPressed: () {},
                  icon: Icon(Icons.more_vert),
                ),
              ],
            ),
            Image.network(
                'https://images5.alphacoders.com/344/thumb-1920-344761.jpg'),
          ],
        ),
      ),
    );
