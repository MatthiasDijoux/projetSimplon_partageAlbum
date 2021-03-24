import 'package:flutter/material.dart';

import 'commentary_screen.dart';

class CommentaryFormScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return CommentaryFormScreenState();
  }
}

class CommentaryFormScreenState extends State<CommentaryFormScreen> {
  List<String> _commentary = [];

  final GlobalKey<FormState> _commentaryKey = GlobalKey<FormState>();

  Widget _buildCommentary() {
    return TextFormField(
      decoration: InputDecoration(
        labelText: "Ajouter un commentaire..."
      ),
      // ignore: missing_return
      validator: (String value) {
        if(value.isEmpty) {
          return 'Votre commentaire ne peut pas être vide.';
        }
      },
      onFieldSubmitted: (String value) {
        _commentary.add(value);
        if(!_commentaryKey.currentState.validate()) {
          return;
        }
        _commentaryKey.currentState.save();
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.all(10),
        child: Form(
          key: _commentaryKey,
          child: Column(
            children: <Widget>[
              CommentariesScreen(_commentary),
              _buildCommentary()
            ],
          ),
        ),
      );
  }
}