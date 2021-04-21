import 'dart:convert';

import '../../models/albums_models.dart';
import 'package:http/http.dart';

class ApiService {
  final String apiUrl = "http://10.0.2.2:3000/api/albums";

  Future<List<Album>> getAlbums() async {
    final res = await get(apiUrl);

    if (res.statusCode == 200) {
      List<dynamic> body = jsonDecode(res.body);
      print(body);
      List<Album> albums = body.map((dynamic item) => Album.fromJson(item)).toList();
      return albums;
    } else {
      throw "Failed to load cases list";
    }
  }
}