import 'package:flutter/material.dart';

class CommentariesScreen extends StatelessWidget {
  final List<String> commentary;

  CommentariesScreen([this.commentary = const []]);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: commentary
          .map(
              (element) => Card(
            child: Column(
              children: <Widget>[
                Text(element)
              ],
            ),
          )
      ).toList(),
    );
  }
}