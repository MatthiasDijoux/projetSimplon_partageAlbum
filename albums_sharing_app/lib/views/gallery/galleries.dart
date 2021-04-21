import 'package:albums_sharing_app/views/gallery/gallery.dart';
import 'package:flutter/material.dart';
import '../../models/albums_models.dart';

class GalleriesScreen extends StatelessWidget {
  final List<Album> albums;
  GalleriesScreen({Key key, this.albums}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: albums == null ? 0 : albums.length,
        shrinkWrap: true,
        itemBuilder: (BuildContext context, int index) {
          return Card(
              child: InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => Gallery(albums[index])),
                    );
                  },
                  key: Key(index.toString()),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Padding(
                            padding: EdgeInsets.all(16.0),
                            child: Text(albums[index].name ?? "", style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),),
                            
                          ),
                          Spacer(),
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
                  )));
        });
  }
}
