import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: ElevatedButton(
          child: Text('Retour page accueil'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}
