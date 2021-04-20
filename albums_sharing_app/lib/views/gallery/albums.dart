import 'package:albums_sharing_app/views/gallery/galleries.dart';
import 'package:flutter/material.dart';
import 'dart:async';
import './galleries.dart';
import '../../models/albums_models.dart';
import 'api.dart';

class Albums extends StatefulWidget{
  Albums({Key key, this.name}) : super(key: key);

  final String name;
   @override
  _ListAlbum createState() => _ListAlbum();
  
}

class _ListAlbum extends State<Albums> {
  final ApiService api = ApiService();
  List<Album> albumList;
  bool requestDatas = true;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SingleChildScrollView(
          child: new Center(
            child: new FutureBuilder(
              future: loadList(),
              initialData: [],
              builder: (context, snapshot){
                 if (snapshot.hasData) {
                     return  new GalleriesScreen( albums: this.albumList);
                 }else{
                  return  Center(child:
                Text('Pas encore d\'album? Vous pouvez vous en créer un !', style: Theme.of(context).textTheme.title));
                 }
            
              },
            ),
    )
    )
    );
  }
           

     
 Future loadList() {
    Future<List<Album>> datas = api.getAlbums();
    datas.then((albumList) {
      if (requestDatas){
        setState(() {
            this.albumList = albumList;
          });
           requestDatas = false;
      }

    });
    return datas;
  }
}


