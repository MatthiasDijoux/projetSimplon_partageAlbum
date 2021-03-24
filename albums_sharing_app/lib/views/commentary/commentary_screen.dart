import 'package:flutter/material.dart';

class CommentariesScreen extends StatelessWidget {
  final List<String> commentary;

  CommentariesScreen([this.commentary = const []]);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: commentary
        .map(
          (element) => Container(
            margin: EdgeInsets.all(8),
            child: Column(
              children: <Widget>[
                Row(
                  children: [
                    Text(
                      'Nom de l\'utilsateur',
                      style: TextStyle(fontSize: 14.0),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Text(
                      element,
                      style: TextStyle(fontSize: 12.0),
                    )
                  ],
                ),
              ],
            ),
          ),
      ).toList(),
    );
  }
}