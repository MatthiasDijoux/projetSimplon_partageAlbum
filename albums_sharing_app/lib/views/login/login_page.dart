import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:albums_sharing_app/views/login/register_page.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../home.dart';
import '../../main.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool _isLoading = false;
  var errorMsg;
  final TextEditingController emailController = new TextEditingController();
  final TextEditingController passwordController = new TextEditingController();

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
                    child:
                     Text("Se connecter", style: TextStyle(color: Colors.black, fontSize: 30)),
                  ),
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
                  FlatButton(
                    onPressed: () {
                      print("Login pressed");
                      setState(() {
                        _isLoading = true;
                      });
                      signIn(emailController.text, passwordController.text);
                    },
                    child:
                        Text("Se connecter", style: TextStyle(color: Colors.black)),
                  ),
                  errorMsg == null
                      ? Container()
                      : Text(
                          "${errorMsg}",
                          style: TextStyle(
                            color: Colors.redAccent,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                  SizedBox(
                    height: 20,
                  ),
                  Text(
                    'Pas encore de compte ?',
                    style: TextStyle(
                      color: Colors.blueAccent,
                      fontSize: 15,
                    ),
                  ),
                  RaisedButton(
                    onPressed: () {
                      Navigator.of(context).pushAndRemoveUntil(
                          MaterialPageRoute(
                              builder: (BuildContext context) =>
                                  RegisterPage()),
                          (Route<dynamic> route) => false);
                    },
                    elevation: 0.0,
                    color: Colors.blue,
                    child: Text("S'inscrire",
                        style: TextStyle(color: Colors.white70)),
                  ),
                ],
              ),
      ),
    );
  }

  signIn(String mobile, pass) async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    Map data = {'email': mobile, 'password': pass};
    var jsonResponse = null;
    var response = await http.post("http://10.0.2.2:3000/api/login",
        body: data);
    if (response.statusCode == 200) {
      jsonResponse = json.decode(response.body);
      print(jsonResponse);
      if (jsonResponse != null) {
        setState(() {
          _isLoading = false;
        });
        sharedPreferences.setString("accessToken", jsonResponse['accessToken']);
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(builder: (BuildContext context) => HomeScreen()),
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
