import 'package:flutter/material.dart';

class Signup extends StatefulWidget {
  Signup({Key? key}) : super(key: key);

  @override
  _SignupState createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  final nameCont = TextEditingController();
  final passCont = TextEditingController();
  final mailCont = TextEditingController();
  final confirmPassCont = TextEditingController();
  bool _passwordVisible = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Spacer(flex: 2),
            const Text(
              "Join\nus now.",
              style: TextStyle(fontSize: 40),
            ),
            const Spacer(flex: 2),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: nameCont,
                decoration: const InputDecoration(
                  labelText: 'Full name',
                  hintText: 'Enter your full name',
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: mailCont,
                decoration: const InputDecoration(
                  labelText: 'E-mail',
                  hintText: 'Enter your e-mail',
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: passCont,
                obscureText: !_passwordVisible,
                enableSuggestions: false,
                autocorrect: false,
                obscuringCharacter: "*",
                decoration: InputDecoration(
                  suffixIcon: IconButton(
                    onPressed: () {
                      // Update the state i.e. toogle the state of passwordVisible variable
                      setState(() {
                        _passwordVisible = !_passwordVisible;
                      });
                    },
                    icon: Icon(
                      // Based on passwordVisible state choose the icon
                      _passwordVisible
                          ? Icons.visibility
                          : Icons.visibility_off,
                      color: Theme.of(context).primaryColorDark,
                    ),
                  ),
                  labelText: 'Password',
                  hintText: 'Enter your password',
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                controller: confirmPassCont,
                obscureText: !_passwordVisible,
                enableSuggestions: false,
                autocorrect: false,
                obscuringCharacter: "*",
                decoration: InputDecoration(
                  suffixIcon: IconButton(
                    onPressed: () {
                      // Update the state i.e. toogle the state of passwordVisible variable
                      setState(() {
                        _passwordVisible = !_passwordVisible;
                      });
                    },
                    icon: Icon(
                      // Based on passwordVisible state choose the icon
                      _passwordVisible
                          ? Icons.visibility
                          : Icons.visibility_off,
                      color: Theme.of(context).primaryColorDark,
                    ),
                  ),
                  labelText: 'Confirm Password',
                  hintText: 'Confirm your password',
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                  onPressed: () {
                    Navigator.pushReplacementNamed(
                      context,
                      "/home",
                    );
                    // Navigator.pop(context);
                  },
                  child: const Text("SignUp")),
            ),
            const Spacer(flex: 2)
          ],
        ),
      ),
    );
  }
}
