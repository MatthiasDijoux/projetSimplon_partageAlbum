import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';

void main() => runApp(EditGalleryScreen());

class EditGalleryScreen extends StatefulWidget {
  @override
  _GalleryState createState() => _GalleryState();
}

class _GalleryState extends State<EditGalleryScreen> {
  @override
  Widget build(BuildContext context) {
    final album = ModalRoute.of(context).settings.arguments;
    print(ModalRoute.of(context));
    return GestureDetector(
        child: Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
          child: new Card(
        child: new Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            new Container(
              padding: new EdgeInsets.only(
                  top: 16.0, left: 16, right: 16, bottom: 16),
              child: new Row(
                children: <Widget>[
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        new Text(
                          'Modification de l\'album',
                          style: TextStyle(
                              fontSize: 25, fontWeight: FontWeight.w500),
                        ),
                        Divider(
                          color: Colors.black,
                          thickness: 2,
                        ),
                        Divider(color: Colors.white),
                        TextField(
                          // controller: TextEditingController(text: album),
                          decoration: InputDecoration(
                            border: OutlineInputBorder(),
                            labelText: 'Titre de l\'album',
                            isDense: true, // Added this
                            contentPadding: EdgeInsets.all(8), // Added this
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          'La première photo s\'affichera comme photo de couverture de l\'album',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.w300),
                        ),
                        Stack(
                          children: [
                            FutureBuilder(
                                future: _makeGetRequest(),
                                builder:
                                    (BuildContext context, AsyncSnapshot res) {
                                  if (res.data == null) {
                                    return Container(
                                      child: Text(''),
                                    );
                                  }
                                  return Container(
                                      child: Column(
                                          children: [_buildGrid(res.data)]));
                                }),
                          ],
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      )),
    ));
  }

  _makeGetRequest() async {
    final response = await get(_localhost());
    return jsonDecode(response.body);
  }

  Uri _localhost() {
    return Uri.http('10.0.2.2:3000', '/api/photos');
  }

  bool selected = true;
  Widget _buildGrid(List<dynamic> images) => GridView.extent(
      maxCrossAxisExtent: 200,
      padding: const EdgeInsets.all(4),
      mainAxisSpacing: 4,
      crossAxisSpacing: 4,
      shrinkWrap: true,
      physics: ScrollPhysics(),
      children: _buildGridTileList(images));

  List<Widget> _buildGridTileList(List<dynamic> images) {
    List<Widget> widgets = [];
    images.forEach((image) {
      widgets.add(Stack(children: [
        Container(
            height: 300,
            width: 300,
            child: Image.network(
              image['source'],
              fit: BoxFit.cover,
            )),
        Positioned(
          top: 0,
          right: 0,
          child: IconButton(
              color: Colors.white,
              icon: Icon(selected
                  ? Icons.check_box_outline_blank_rounded
                  : Icons.check_box_rounded),
              onPressed: () {
                setState(() {
                  selected = !selected;
                });
              }),
        )
      ]));
    });
    return widgets;
  }
}
