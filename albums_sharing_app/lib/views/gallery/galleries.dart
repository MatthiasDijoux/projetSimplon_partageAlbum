import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart';

import './gallery.dart';
import '../../models/albums_models.dart';

class GalleriesScreen extends StatelessWidget {
  final List galleries = const [];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
          child: (Column(
        children: [BuildCard()],
      ))),
    );
  }
}

class BuildCard extends StatefulWidget {
  @override
  BuildCardState createState() {
    return new BuildCardState();
  }
}

class BuildCardState extends State<BuildCard> {
  List _serverResponse;
  void initState() {
    super.initState();
    _serverResponse = _makeGetRequest();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _makeGetRequest().forEach((data) {
          print(data);
        });
        // Navigator.push(
        //   context,
        //   MaterialPageRoute(builder: (context) {
        //     return GalleryScreen();
        //   }),
        // );
      },
      child: Text('salut'),
    );
  }

  _makeGetRequest() async {
    Response response = await get(_localhost());
    setState(() {
      return jsonDecode(response.body);
    });
  }

  Uri _localhost() {
    return Uri.http('10.0.2.2:3000', '/api/albums');
  }
}

//  Card(
//           elevation: 5,
//           clipBehavior: Clip.antiAlias,
//           child: Column(
//             children: [
//               Row(
//                 children: [
//                   Padding(
//                     padding: EdgeInsets.all(16.0),
//                     child: Text(
//                       'serverResponse',
//                       style:
//                           TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
//                     ),
//                   ),
//                   Spacer(),
//                   IconButton(
//                     onPressed: () {},
//                     icon: Icon(Icons.share_rounded),
//                   ),
//                   IconButton(
//                     onPressed: () {},
//                     icon: Icon(Icons.more_vert),
//                   ),
//                 ],
//               ),
//               Image.network(
//                   'https://images5.alphacoders.com/344/thumb-1920-344761.jpg'),
//             ],
//           )),
