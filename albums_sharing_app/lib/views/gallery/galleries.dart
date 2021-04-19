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
  Future<dynamic> _serverResponse;
  void initState() {
    super.initState();
    _serverResponse = _makeGetRequest();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: FutureBuilder(
          future: _makeGetRequest(),
          builder: (BuildContext context, AsyncSnapshot res) {
            if (res.data == null) {
              return Container(
                child: Text(''),
              );
            }
            return Container(
                child: Column(children: prepareCardWidgets(res.data)));
          }),
      onTap: () {
        _makeGetRequest().then((response) {
          print(response);
          _serverResponse = response;
        });
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) {
            return GalleryScreen();
          }),
        );
      },
    );
  }

  List<Widget> prepareCardWidgets(List<dynamic> datas) {
    List<Widget> widgets = [];
    datas.forEach((item) {
      widgets.add(Card(
          elevation: 5,
          clipBehavior: Clip.antiAlias,
          child: Column(children: [
            Row(
              children: [
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text(
                    item['name'],
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
                Spacer(),
                IconButton(
                  onPressed: () {},
                  icon: Icon(Icons.share_rounded),
                ),
                IconButton(
                  onPressed: () {
                    print('salut');
                    simplePopup();
                  },
                  icon: Icon(Icons.more_vert),
                ),
              ],
            ),
            Image.network(
                'https://images5.alphacoders.com/344/thumb-1920-344761.jpg'),
          ])));
    });

    return widgets;
  }

  Widget simplePopup() => PopupMenuButton<String>(
        icon: Icon(
          Icons.more_vert,
          color: Colors.white,
        ),
        itemBuilder: (context) => [
          PopupMenuItem(
            value: "edit",
            child: Text("Edit"),
          ),
          PopupMenuItem(
            value: "autres",
            child: Text("Autres"),
          ),
        ],
        onCanceled: () {
          print("You have canceled the menu.");
        },
        onSelected: (value) {},
      );
  _makeGetRequest() async {
    final response = await get(_localhost());
    return jsonDecode(response.body);
  }

  Uri _localhost() {
    return Uri.http('10.0.2.2:3000', '/api/albums');
  }
}
