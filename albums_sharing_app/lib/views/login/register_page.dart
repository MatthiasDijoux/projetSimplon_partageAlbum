import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:albums_sharing_app/main.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  bool _isLoading = false;
  var errorMsg;
  final TextEditingController emailController = new TextEditingController();
  final TextEditingController passwordController = new TextEditingController();
  final TextEditingController confirmPasswordController =
      new TextEditingController();
  final TextEditingController firstNameController = new TextEditingController();
  final TextEditingController lastNameController = new TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: EdgeInsets.all(16.0),
        child: _isLoading
            ? Center(child: CircularProgressIndicator())
            : ListView(
                children: <Widget>[
                  Container(
                     margin: EdgeInsets.only(left: 30, top:10, right: 20, bottom:40) ,
                    child:  Text("S'inscrire", style: TextStyle(color: Colors.black, fontSize: 30)),
                  ),
                  TextFormField(
                    controller: firstNameController,
                    decoration: InputDecoration(
                      hintText: "Prénom",
                    ),
                  ),
                  SizedBox(height: 30.0),
                  TextFormField(
                    controller: lastNameController,
                    decoration: InputDecoration(
                      hintText: "Nom",
                    ),
                  ),
                  SizedBox(height: 30.0),
                  TextFormField(
                    controller: emailController,
                    decoration: InputDecoration(
                      hintText: "Email",
                    ),
                  ),
                  SizedBox(height: 30.0),
                  TextFormField(
                    controller: passwordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      hintText: "Mot de passe",
                    ),
                  ),
                  SizedBox(height: 30.0),
                  TextFormField(
                    controller: confirmPasswordController,
                    obscureText: true,
                    decoration: InputDecoration(
                      hintText: "Confirmer votre mot de passe",
                    ),
                  ),
                  RaisedButton(
                    onPressed: () {
                      if (confirmPasswordController.text ==
                          passwordController.text) {
                        setState(() {
                          _isLoading = true;
                        });

                        Register(emailController.text, passwordController.text,
                            firstNameController.text, lastNameController.text);
                      }
                       setState(() {
                            errorMsg = "Les mots de passe ne correspondent pas !";
                       });
                    },
                    color: Colors.blue,
                    child: Text("S'enregistrer",
                        style: TextStyle(color: Colors.white24)),
                  ),
                  errorMsg == null
                      ? Container()
                      : Text(
                          "${errorMsg}",
                        ),
                ],
              ),
      ),
    );
  }

  Register(String email, pass, firstName, lastName) async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    Map data = {
      'email': email,
      'password': pass,
      'nom': lastName,
      'prenom': firstName
    };
    var jsonResponse = null;
    var response =
        await http.post("http://10.0.2.2:3000/api/register", body: data);
    if (response.statusCode == 200) {
      jsonResponse = json.decode(response.body);
      print(jsonResponse);
      if (jsonResponse != null) {
        setState(() {
          _isLoading = false;
        });
        sharedPreferences.setString("accessToken", jsonResponse['accessToken']);
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (BuildContext context) => MainPage()),
            (Route<dynamic> route) => false);
      }
    } else {
      setState(() {
        _isLoading = false;
      });
      errorMsg = response.body;
      print("The error message is: ${response.body}");
    }
  }
}
