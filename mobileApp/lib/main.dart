import 'package:flutter/material.dart';
import 'package:insta_app/ui/Signup.dart';
import 'package:insta_app/ui/home.dart';
import 'package:insta_app/ui/login.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Minly - Task',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          brightness: Brightness.dark,
          seedColor: Colors.blueGrey,
        ),
        useMaterial3: true,
      ),
      initialRoute: "/login",
      routes: {
        "/login": (context) => Login(),
        "/signUp": (context) => Signup(),
        "/home": (context) => const MyHomePage(title: "Minly - Task")
      },
    );
  }
}
