import 'package:flutter/material.dart';

class Album {
  final int userId;
  final int id;
  final String name;

  Album({@required this.userId, @required this.id, @required this.name});

  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      userId: json['userId'],
      id: json['id'],
      name: json['name'],
    );
  }

    @override
  String toString() {
    return 'Albums{id: $id, name: $name}';
  }
}
